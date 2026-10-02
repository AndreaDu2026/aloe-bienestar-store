'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import ProductVisual from '@/components/ProductVisual';
import type { Product } from '@/lib/products';

export default function CatalogGrid({ products, categories }: { products: Product[]; categories: string[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const filtered = useMemo(() => products.filter((p) => {
    const matchesCategory = category === 'Todas' || p.category === category;
    const text = (p.name + ' ' + (p.sku || '') + ' ' + p.presentation).toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase());
  }), [products, category, query]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  function changeQuery(value: string) { setQuery(value); setPage(1); }
  function changeCategory(value: string) { setCategory(value); setPage(1); }
  return <>
    <div className="mt-8 grid gap-3 rounded-3xl bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]">
      <input value={query} onChange={(e) => changeQuery(e.target.value)} className="input" placeholder="Buscar por producto, SKU o presentación…" aria-label="Buscar productos" />
      <select value={category} onChange={(e) => changeCategory(e.target.value)} className="input" aria-label="Filtrar por categoría"><option>Todas</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
    </div>
    <div className="mt-4 flex items-center justify-between text-sm text-slate-600"><span>{filtered.length} productos encontrados</span><span>Página {currentPage} de {pageCount}</span></div>
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {visible.map((p) => <article key={p.id} className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <Link href={'/producto/' + p.slug}><ProductVisual src={p.image} name={p.name} className="h-60" /></Link>
        <div className="p-6">
          {p.badge && <span className="rounded-full bg-[var(--sage)] px-3 py-1 text-xs font-bold text-[var(--deep)]">{p.badge}</span>}
          <small className="mt-3 block font-bold uppercase tracking-wider text-[var(--green)]">{p.category}</small>
          <Link href={'/producto/' + p.slug}><h2 className="mt-2 text-xl font-bold text-[var(--deep)]">{p.name}</h2></Link>
          <p className="mt-2 min-h-12 text-sm text-slate-600">{p.shortDescription}</p>
          <p className="mt-2 text-xs text-slate-500">SKU {p.sku || '—'} · {p.presentation}</p>
          <div className="mt-5 flex items-center justify-between gap-3"><strong className="text-2xl text-[var(--deep)]">${p.price.toFixed(2)}</strong><AddToCartButton product={p} /></div>
          <a href={'https://wa.me/' + (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5939999999999') + '?text=' + encodeURIComponent('Hola, quiero comprar ' + p.name + ' (SKU ' + (p.sku || 'sin SKU') + ')')} target="_blank" rel="noreferrer" className="mt-3 block text-center text-sm font-semibold text-[var(--green)]">💬 Comprar por WhatsApp</a>
        </div>
      </article>)}
    </div>
    {filtered.length === 0 && <div className="mt-8 rounded-3xl bg-white p-12 text-center text-slate-600">No encontramos productos con esos criterios.</div>}
    {pageCount > 1 && <div className="mt-8 flex items-center justify-center gap-3"><button disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-full border px-4 py-2 disabled:opacity-40">← Anterior</button><button disabled={currentPage === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))} className="rounded-full border px-4 py-2 disabled:opacity-40">Siguiente →</button></div>}
  </>;
}