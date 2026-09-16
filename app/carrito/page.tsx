'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

export default function CartPage() {
  const { items, subtotal, update, remove } = useCart();
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.5;
  const total = subtotal + shipping;

  if (!items.length) return <main className="min-h-screen bg-[var(--cream)] py-20"><div className="container text-center"><div className="text-6xl">🛒</div><h1 className="mt-5 text-3xl font-bold text-[var(--deep)]">Tu carrito está vacío</h1><p className="mt-2 text-slate-600">Agrega productos para continuar.</p><Link href="/productos" className="mt-7 inline-block rounded-full bg-[var(--deep)] px-7 py-3 font-bold text-white">Ver productos</Link></div></main>;

  return <main className="min-h-screen bg-[var(--cream)] py-12"><div className="container"><Link href="/productos" className="text-sm text-[var(--green)]">← Seguir comprando</Link><h1 className="mt-4 text-4xl font-bold text-[var(--deep)]">Tu carrito</h1><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
    <section className="space-y-4">{items.map((item) => <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"><div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[var(--pale)] text-4xl">{item.icon}</div><div className="min-w-0 flex-1"><Link href={`/producto/${item.slug}`} className="font-bold text-[var(--deep)]">{item.name}</Link><p className="text-sm text-slate-500">${item.price.toFixed(2)} c/u</p><div className="mt-3 flex items-center gap-2"><button onClick={() => update(item.id, item.quantity - 1)} className="h-8 w-8 rounded-full border">−</button><span>{item.quantity}</span><button onClick={() => update(item.id, item.quantity + 1)} className="h-8 w-8 rounded-full border">+</button></div></div><div className="text-right"><strong>${(item.price * item.quantity).toFixed(2)}</strong><button onClick={() => remove(item.id)} className="mt-3 block text-sm text-red-600">Eliminar</button></div></div>)}</section>
    <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-[var(--deep)]">Resumen</h2><div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><div className="flex justify-between"><span>Envío</span><span>{shipping ? `$${shipping.toFixed(2)}` : 'Gratis'}</span></div><div className="flex justify-between border-t pt-4 text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div></div><Link href="/checkout" className="mt-6 block rounded-full bg-[var(--deep)] px-5 py-4 text-center font-bold text-white">Continuar al checkout</Link><p className="mt-3 text-center text-xs text-slate-500">🔒 Tus datos de tarjeta serán procesados por el proveedor de pagos.</p></aside>
  </div></div></main>;
}
