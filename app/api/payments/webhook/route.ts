import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-payment-signature');

  if (!process.env.PAYMENT_WEBHOOK_SECRET || !signature) {
    return NextResponse.json({ error: 'Webhook no configurado.' }, { status: 401 });
  }

  // Cada proveedor usa un esquema de firma distinto. Este endpoint es la frontera
  // segura para implementar la verificación oficial antes de marcar PAID.
  // Nunca confiar en un status enviado por el navegador.
  void rawBody;
  return NextResponse.json({ received: true, verified: false, message: 'Configura la verificación de firma del proveedor elegido.' }, { status: 501 });
}
