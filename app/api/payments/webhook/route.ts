import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function validSignature(body: string, timestamp: string, received: string, secret: string) {
  const expected = createHmac('sha256', secret).update(body + timestamp).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(received, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-kushki-signature');
  const timestamp = request.headers.get('x-kushki-id');
  const merchantKey = request.headers.get('x-kushki-key');
  const secret = process.env.KUSHKI_WEBHOOK_SIGNATURE;

  if (!signature || !timestamp || !secret || (process.env.KUSHKI_PUBLIC_MERCHANT_ID && merchantKey !== process.env.KUSHKI_PUBLIC_MERCHANT_ID)) return NextResponse.json({ error: 'Webhook no autorizado.' }, { status: 401 });
  if (!validSignature(rawBody, timestamp, signature, secret)) return NextResponse.json({ error: 'Firma inválida.' }, { status: 401 });

  try {
    const event = JSON.parse(rawBody) as { transaction_status?: string; transactionStatus?: string; transaction_reference?: string; transactionReference?: string; ticket_number?: string; metadata?: Record<string, string> };
    const approved = (event.transaction_status || event.transactionStatus) === 'APPROVAL';
    const transactionReference = event.transaction_reference || event.transactionReference || event.ticket_number;
    const orderId = event.metadata?.orderId;
    if (!orderId || !transactionReference) return NextResponse.json({ received: true });

    const payment = await prisma.payment.findUnique({ where: { orderId } });
    if (!payment) return NextResponse.json({ received: true });
    if (payment.externalId === transactionReference && payment.status === 'PAID') return NextResponse.json({ received: true });

    await prisma.$transaction([
      prisma.payment.update({ where: { orderId }, data: { externalId: transactionReference, status: approved ? 'PAID' : 'FAILED' } }),
      prisma.order.update({ where: { id: orderId }, data: { status: approved ? 'PAID' : 'CANCELLED' } }),
    ]);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('webhook_error', error);
    return NextResponse.json({ error: 'No fue posible procesar el webhook.' }, { status: 500 });
  }
}
