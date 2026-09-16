import Link from 'next/link';

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="min-h-screen bg-[var(--cream)] py-20"><div className="container max-w-2xl text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--pale)] text-4xl">✓</div><h1 className="mt-6 text-4xl font-bold text-[var(--deep)]">¡Pedido recibido!</h1><p className="mt-3 text-slate-600">Tu referencia de pedido es <strong>{id}</strong>. Cuando el pago sea confirmado recibirás la actualización correspondiente.</p><div className="mt-8 rounded-2xl bg-white p-6 text-left shadow-sm"><h2 className="font-bold text-[var(--deep)]">¿Qué sigue?</h2><ol className="mt-3 space-y-2 text-sm text-slate-600"><li>1. El proveedor procesa la transacción.</li><li>2. El pago se confirma mediante webhook seguro.</li><li>3. Preparamos tu pedido y coordinamos la entrega.</li></ol></div><Link href="/productos" className="mt-8 inline-block rounded-full bg-[var(--deep)] px-7 py-3 font-bold text-white">Seguir comprando</Link></div></main>;
}
