export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  icon: string;
  shortDescription: string;
  description: string;
  features: string[];
  stock: number;
};

export const products: Product[] = [
  {
    id: 'aloe-vera-gel', slug: 'aloe-vera-gel', name: 'Aloe Vera Gel', category: 'Nutrición', price: 32, compareAtPrice: 36, badge: 'Más vendido', icon: '🌿',
    shortDescription: 'Gel de aloe vera para acompañar tu rutina diaria de bienestar.',
    description: 'Una opción práctica para complementar una rutina de nutrición y bienestar. Consulta siempre las indicaciones del producto antes de consumirlo.',
    features: ['Presentación práctica', 'Ideal para una rutina diaria', 'Producto original y sellado'], stock: 12,
  },
  {
    id: 'forever-arctic-sea', slug: 'forever-arctic-sea', name: 'Forever Arctic Sea', category: 'Bienestar', price: 42, icon: '🐟',
    shortDescription: 'Complemento nutricional para incorporar omega-3 a tu rutina.',
    description: 'Complemento nutricional pensado para quienes desean incorporar omega-3 a su alimentación habitual.',
    features: ['Fuente de omega-3', 'Presentación práctica', 'Producto original y sellado'], stock: 8,
  },
  {
    id: 'aloe-vera-gelly', slug: 'aloe-vera-gelly', name: 'Aloe Vera Gelly', category: 'Belleza', price: 28, icon: '✨',
    shortDescription: 'Gel de uso tópico para el cuidado diario de la piel.',
    description: 'Gel de uso tópico para acompañar rutinas de cuidado de la piel. Aplicar según las indicaciones del envase.',
    features: ['Uso tópico', 'Para cuidado diario', 'Producto original y sellado'], stock: 15,
  },
  {
    id: 'aloe-sunscreen', slug: 'aloe-sunscreen', name: 'Aloe Sunscreen', category: 'Belleza', price: 31, icon: '☀️',
    shortDescription: 'Protección solar para complementar tu rutina de cuidado personal.',
    description: 'Protector solar para complementar el cuidado diario de la piel. Reaplicar siguiendo las instrucciones del producto.',
    features: ['Uso diario', 'Formato práctico', 'Producto original y sellado'], stock: 10,
  },
  {
    id: 'forever-ultra', slug: 'forever-ultra', name: 'Forever Ultra', category: 'Nutrición', price: 39, icon: '🥤',
    shortDescription: 'Batido nutricional para complementar una alimentación equilibrada.',
    description: 'Producto nutricional diseñado para complementar la alimentación. No sustituye una dieta variada y equilibrada.',
    features: ['Preparación sencilla', 'Ideal para complementar comidas', 'Producto original y sellado'], stock: 9,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const categories = [...new Set(products.map((product) => product.category))];
