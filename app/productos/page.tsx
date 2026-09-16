import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import { products } from '@/lib/products';

export default function ProductsPage() {
  return <main className="min-h-screen bg-[var(--cream)] py-12"><div className="container">
    <Link href="/" className="text-sm text-[var(--green)]">← Inicio</Link>
    <h1 className="mt-4 text-4xl font-bold text-[var(--deep)]">Todos los productos</h1>
    <p className="mt-2 text-slate-600">Nutrición, belleza y bienestar para tu rutina.</p>
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => <article key={p.id} className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <Link href={`/producto/${p.slug}`}><div className="flex h-60 items-center justify-center bg-[var(--pale)] text-8xl">{p.icon}</div></Link>
        <div className="p-6"><small className="font-bold uppercase tracking-wider text-[var(--green)]">{p.category}</small><Link href={`/producto/${p.slug}`}><h2 className="mt-2 text-xl font-bold text-[var(--deep)]">{p.name}</h2></Link><p className="mt-2 min-h-12 text-sm text-slate-600">{p.shortDescription}</p><div className="mt-5 flex items-center justify-between"><strong className="text-2xl text-[var(--deep)]">${p.price.toFixed(2)}</strong><AddToCartButton product={p} /></div></div>
      </article>)}
    </div>
  </div></main>;
}
