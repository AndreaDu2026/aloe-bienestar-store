'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useCart } from '@/components/CartProvider';

const provinces = ['Azuay','Bolívar','Cañar','Carchi','Chimborazo','Cotopaxi','El Oro','Esmeraldas','Galápagos','Guayas','Imbabura','Loja','Los Ríos','Manabí','Morona Santiago','Napo','Orellana','Pastaza','Pichincha','Santa Elena','Santo Domingo de los Tsáchilas','Sucumbíos','Tungurahua','Zamora Chinchipe'];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const shipping = subtotal >= 50 ? 0 : 4.5;
  const total = subtotal + shipping;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer: data, items: items.map(({ id, quantity }) => ({ id, quantity })) }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No fue posible iniciar el pago.');
      clear(); window.location.href = result.redirectUrl;
    } catch (e) { setError(e instanceof Error ? e.message : 'Ocurrió un error.'); setLoading(false); }
  }

  if (!items.length) return <main className="container py-20 text-center"><h1 className="text-3xl font-bold text-[var(--deep)]">No hay productos para pagar</h1><Link href="/productos" className="mt-6 inline-block text-[var(--green)]">Volver al catálogo</Link></main>;

  return <main className="min-h-screen bg-[var(--cream)] py-10"><div className="container"><Link href="/carrito" className="text-sm text-[var(--green)]">← Volver al carrito</Link><h1 className="mt-4 text-4xl font-bold text-[var(--deep)]">Checkout</h1><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
    <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-sm md:p-8"><h2 className="text-xl font-bold text-[var(--deep)]">Datos de entrega</h2><div className="mt-6 grid gap-4 md:grid-cols-2">
      <Field label="Nombre completo" name="name" required /><Field label="Correo electrónico" name="email" type="email" required /><Field label="Teléfono" name="phone" required /><Field label="Cédula / RUC (opcional)" name="taxId" /><Field label="Provincia" name="province" required><select name="province" required className="input"><option value="">Selecciona</option>{provinces.map((p) => <option key={p}>{p}</option>)}</select></Field><Field label="Ciudad" name="city" required /><Field label="Dirección" name="address" required /><Field label="Código postal (opcional)" name="postalCode" /><div className="md:col-span-2"><Field label="Referencia de entrega" name="reference" placeholder="Ej. frente al parque, casa blanca" /></div>
    </div><div className="mt-8 rounded-2xl bg-[var(--pale)] p-5"><strong>💳 Pago con tarjeta</strong><p className="mt-1 text-sm text-slate-600">Serás dirigido al proveedor de pagos configurado para Ecuador. Aloe & Bienestar no almacena el número completo de tu tarjeta.</p></div>{error && <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}<button disabled={loading} className="mt-6 w-full rounded-full bg-[var(--deep)] px-6 py-4 font-bold text-white disabled:opacity-50">{loading ? 'Preparando pago…' : `Continuar al pago · $${total.toFixed(2)}`}</button></form>
    <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-[var(--deep)]">Resumen del pedido</h2><div className="mt-5 space-y-3">{items.map(i => <div key={i.id} className="flex justify-between text-sm"><span>{i.name} × {i.quantity}</span><span>${(i.price*i.quantity).toFixed(2)}</span></div>)}<div className="border-t pt-4"><div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><div className="mt-2 flex justify-between"><span>Envío</span><span>{shipping ? `$${shipping.toFixed(2)}` : 'Gratis'}</span></div><div className="mt-4 flex justify-between text-xl font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div></div></div></aside>
  </div></div></main>;
}

function Field({ label, name, type='text', required=false, placeholder='', children }: { label:string; name:string; type?:string; required?:boolean; placeholder?:string; children?:React.ReactNode }) {
  return <label className="block text-sm font-semibold">{label}{children || <input className="input" name={name} type={type} required={required} placeholder={placeholder} />}</label>;
}
