import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { products } from '@/lib/products';

const paymentBaseUrl = process.env.KUSHKI_API_URL || 'https://api.kushkipagos.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customer = body?.customer;
    const items = body?.items;
    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.province || !customer?.city || !customer?.address || !Array.isArray(items) || items.length === 0) return NextResponse.json({ error: 'Completa los datos obligatorios del checkout.' }, { status: 400 });
    if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'La tienda necesita configurar PostgreSQL antes de recibir pedidos reales.' }, { status: 503 });
    if (!process.env.KUSHKI_PRIVATE_MERCHANT_ID) return NextResponse.json({ error: 'Falta configurar la credencial privada de Kushki.' }, { status: 503 });

    const lines = items.map((item: { id: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.id);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) throw new Error('Producto o cantidad no válida.');
      return { product, quantity };
    });
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    const shipping = subtotal >= 50 ? 0 : 4.5;
    const total = subtotal + shipping;

    const customerRecord = await prisma.customer.upsert({
      where: { id: customer.id || 'never-existing-id' },
      update: { name: customer.name, email: customer.email, phone: customer.phone, taxId: customer.taxId || null, province: customer.province, city: customer.city, address: customer.address, reference: customer.reference || null, postalCode: customer.postalCode || null },
      create: { name: customer.name, email: customer.email, phone: customer.phone, taxId: customer.taxId || null, province: customer.province, city: customer.city, address: customer.address, reference: customer.reference || null, postalCode: customer.postalCode || null },
    });

    const order = await prisma.order.create({ data: { customerId: customerRecord.id, subtotal, shipping, total, items: { create: lines.map(({ product, quantity }) => ({ productId: product.id, productName: product.name, quantity, unitPrice: product.price })) }, payment: { create: { provider: 'kushki', amount: total, currency: 'USD' } } }, include: { items: true } });

    const publicUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!publicUrl) return NextResponse.json({ error: 'Falta configurar NEXT_PUBLIC_SITE_URL.' }, { status: 503 });

    const response = await fetch(`${paymentBaseUrl}/smartlink/v1/webcheckout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Private-Merchant-Id': process.env.KUSHKI_PRIVATE_MERCHANT_ID },
      body: JSON.stringify({
        kind: 'webcheckout',
        redirectURL: `${publicUrl}/pedido/${order.id}`,
        contactDetail: { email: customer.email, name: customer.name },
        products: lines.map(({ product, quantity }) => ({ name: product.name, description: product.shortDescription, quantity, unitPrice: product.price })),
        paymentConfig: { amount: { subtotalIva: 0, subtotalIva0: total, iva: 0, currency: 'USD' }, paymentMethod: ['credit-card'] },
        additionalInformation: { orderId: order.id },
      }),
    });
    if (!response.ok) { await prisma.order.update({ where: { id: order.id }, data: { status: 'CANCELLED' } }); return NextResponse.json({ error: 'Kushki no pudo iniciar el checkout.' }, { status: 502 }); }
    const payment = await response.json();
    if (!payment.webcheckoutUrl) return NextResponse.json({ error: 'Respuesta incompleta del proveedor de pagos.' }, { status: 502 });
    if (payment.webcheckoutId) await prisma.payment.update({ where: { orderId: order.id }, data: { externalId: payment.webcheckoutId } });
    return NextResponse.json({ redirectUrl: payment.webcheckoutUrl });
  } catch (error) {
    console.error('checkout_error', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No fue posible procesar el pedido.' }, { status: 400 });
  }
}
