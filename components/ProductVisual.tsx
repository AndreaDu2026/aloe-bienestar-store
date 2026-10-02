export default function ProductVisual({ src, name, className = '' }: { src: string; name: string; className?: string }) {
  if (!src) return <div className={`flex items-center justify-center bg-[var(--pale)] text-6xl ${className}`}>🌿</div>;
  if (src.includes('#sku-')) return <div className={`flex items-center justify-center overflow-hidden bg-white ${className}`}><svg viewBox="0 0 900 900" role="img" aria-label={name} className="h-full w-full"><use href={src} /></svg></div>;
  return <div className={`flex items-center justify-center overflow-hidden bg-white ${className}`}><img src={src} alt={name} loading="lazy" decoding="async" className="h-full w-full object-contain" /></div>;
}