export default function ImagePlaceholder({ 
  label = "Add image in Sanity",
  className = "" 
}: { label?: string; className?: string }) {
  return (
    <div className={`w-full h-full min-h-[200px] bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center gap-3 ${className}`}>
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#c9a84c" 
        strokeWidth="1" 
        style={{ opacity: 0.4 }}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <p 
        style={{
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#6a6a6a'
        }}
      >
        {label}
      </p>
    </div>
  )
}
