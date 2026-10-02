import Link from 'next/link';
import CatalogGrid from '@/components/CatalogGrid';
import { categories, products } from '@/lib/products';

export default function ProductsPage() {
  return <main className="min-h-screen bg-[var(--cream)] py-12"><div className="container">
    <Link href="/" className="text-sm text-[var(--green)]">← Inicio</Link>
    <div className="mt-4 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-4xl font-bold text-[var(--deep)]">Catálogo Aloe & Bienestar</h1><p className="mt-2 text-slate-600">Productos del Catálogo de productos Ecuador 2026, con precios y referencias del documento proporcionado.</p></div><span className="rounded-full bg-[var(--pale)] px-4 py-2 text-sm font-bold text-[var(--deep)]">{products.length} productos</span></div>
    <CatalogGrid products={products} categories={categories} />
  </div></main>;
}