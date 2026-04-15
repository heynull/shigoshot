interface MarqueeStripProps {
  items?: string[];
  children?: React.ReactNode;
  className?: string;
}

export default function MarqueeStrip({
  items,
  children,
  className = "",
}: MarqueeStripProps) {
  // If items are provided, render them with gold diamond separators
  if (items && items.length > 0) {
    return (
      <div className={`marquee-strip bg-gold text-black ${className}`}>
        <div className="flex items-center gap-0 whitespace-nowrap">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-0">
              <span className="px-6 font-montserrat text-sm font-light">{item}</span>
              {index < items.length - 1 && (
                <span className="text-gold/60 opacity-60 mx-0">✦</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Otherwise render children as before
  return <div className={`marquee-strip ${className}`}>{children}</div>;
}
