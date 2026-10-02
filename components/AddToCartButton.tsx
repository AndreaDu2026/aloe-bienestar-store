'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import type { Product } from '@/lib/products';

export default function AddToCartButton({ product, buyNow = false }: { product: Product; buyNow?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
    if (buyNow) window.location.href = '/carrito';
  }

  return <button onClick={handleClick} disabled={product.stock < 1} className="rounded-full bg-[var(--deep)] px-5 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
    {product.stock < 1 ? 'Agotado' : added ? '✓ Agregado' : buyNow ? 'Comprar ahora' : 'Agregar al carrito'}
  </button>;
}
