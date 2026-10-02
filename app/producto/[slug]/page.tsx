import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import ProductVisual from '@/components/ProductVisual';
import { getProduct, products } from '@/lib/products';

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <main className="min-h-screen bg-[var(--cream)] py-10"><div className="container">
    <div className="mb-6 text-sm"><Link href="/productos" className="text-[var(--green)]">Productos</Link> <span> / {product.name}</span></div>
    <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
      <ProductVisual src={product.image} name={product.name} className="min-h-96 rounded-3xl" />
      <div className="flex flex-col justify-center">
        {product.badge && <span className="mb-3 w-fit rounded-full bg-[var(--sage)] px-3 py-1 text-xs font-bold text-[var(--deep)]">{product.badge}</span>}
        <small className="font-bold uppercase tracking-widest text-[var(--green)]">{product.category}</small>
        <h1 className="mt-2 text-4xl font-bold text-[var(--deep)]">{product.name}</h1>
        <div className="mt-3 text-sm text-slate-500">SKU {product.sku || 'No indicado'} · {product.presentation}</div>
        <div className="mt-5"><strong className="text-3xl text-[var(--deep)]">${product.price.toFixed(2)}</strong></div>
        <p className="mt-5 leading-7 text-slate-600">{product.description}</p>
        <ul className="my-6 space-y-2 text-sm text-slate-700">{product.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
        <div className="flex flex-wrap gap-3"><AddToCartButton product={product} /><AddToCartButton product={product} buyNow /></div>
        <a href={'https://wa.me/' + (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5939999999999') + '?text=' + encodeURIComponent('Hola, quiero comprar ' + product.name + ' (SKU ' + (product.sku || 'sin SKU') + ')')} target="_blank" rel="noreferrer" className="mt-4 text-center font-semibold text-[var(--green)]">💬 Comprar por WhatsApp</a>
        <div className="mt-6 grid gap-3 border-t pt-6 text-sm text-slate-600 sm:grid-cols-3"><span>🔒 Pago seguro</span><span>🚚 Envíos Ecuador</span><span>💬 Asesoría</span></div>
      </div>
    </div>
  </div></main>;
}