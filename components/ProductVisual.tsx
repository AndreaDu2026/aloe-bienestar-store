export default function ProductVisual({ src, name, className = '' }: { src: string; name: string; className?: string }) {
  if (!src) return <div className={`flex items-center justify-center bg-[var(--pale)] text-6xl ${className}`}>🌿</div>;
  return <div className={`flex items-center justify-center overflow-hidden bg-white ${className}`}><img src={src} alt={name} loading="lazy" decoding="async" className="h-full w-full object-contain" /></div>;
}