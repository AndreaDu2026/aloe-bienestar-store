import { catalog, type CatalogRow } from '@/lib/catalog-rows';

export type Product = {
  id: string; slug: string; name: string; category: string; sku?: string; presentation: string; price: number; image: string; badge?: string; icon: string; shortDescription: string; description: string; features: string[]; stock: number;
};

function slugify(value: string) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function imageForSku(sku: string) {
  if (sku === '215') return '';
  return '/products/' + (sku || 'tri-pack-aloe-vera-gel') + '.webp';
}

export const products: Product[] = (catalog as CatalogRow[]).map(([sku,name,category,presentation,price,description,badge]) => {
  const id = slugify(name);
  return { id, slug:id, name, category, sku:sku || undefined, presentation, price, image:imageForSku(sku), badge:badge || undefined, icon:'🌿', shortDescription:description, description, features:[`Presentación: ${presentation}`, ...(sku ? [`SKU: ${sku}`] : ['SKU: No indicado en el catálogo']), 'Precio del catálogo Ecuador 2026'], stock:20 };
});

export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
export const categories = [...new Set(products.map((product) => product.category))];