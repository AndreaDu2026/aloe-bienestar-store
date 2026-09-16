import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customer = body?.customer;
    const items = body?.items;
    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.province || !customer?.city || !customer?.address || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Completa los datos obligatorios del checkout.' }, { status: 400 });
    }
    if (items.length > 50) return NextResponse.json({ error: 'Demasiados productos en el pedido.' }, { status: 400 });

    // El servidor reconstruye el importe desde el catálogo, nunca desde el navegador.
    const lines = items.map((item: { id: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.id);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) throw new Error('Producto o cantidad no válida.');
      return { product, quantity };
    });
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    const shipping = subtotal >= 50 ? 0 : 4.5;
    const total = subtotal + shipping;

    // Punto único para integrar el gateway real. No se aceptan ni almacenan datos de tarjeta aquí.
    if (!process.env.PAYMENT_PROVIDER || !process.env.PAYMENT_CREATE_URL) {
      return NextResponse.json({ error: `El checkout está listo, pero falta configurar el proveedor de pagos para Ecuador. Total validado: $${total.toFixed(2)}.` }, { status: 503 });
    }

    const paymentResponse = await fetch(process.env.PAYMENT_CREATE_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.PAYMENT_API_KEY || ''}` },
      body: JSON.stringify({ amount: total, currency: 'USD', customer, items: lines.map(({ product, quantity }) => ({ id: product.id, name: product.name, quantity, unitPrice: product.price })), idempotencyKey: crypto.randomUUID() }),
    });
    if (!paymentResponse.ok) return NextResponse.json({ error: 'El proveedor de pagos no pudo iniciar la transacción.' }, { status: 502 });
    const payment = await paymentResponse.json();
    if (!payment.redirectUrl) return NextResponse.json({ error: 'Respuesta de pago incompleta.' }, { status: 502 });
    return NextResponse.json({ redirectUrl: payment.redirectUrl });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No fue posible procesar el pedido.' }, { status: 400 });
  }
}
