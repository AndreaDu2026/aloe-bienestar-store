export default function ProductVisual({ src, name, className = '' }: { src: string; name: string; className?: string }) {
  if (!src) return <div className={`flex items-center justify-center bg-[var(--pale)] text-6xl ${className}`}>🌿</div>;
  return <div className={`overflow-hidden bg-white ${className}`}>
    <iframe src={src} title={`Ficha de ${name}`} loading="lazy" className="h-full w-full border-0" />
  </div>;
}
