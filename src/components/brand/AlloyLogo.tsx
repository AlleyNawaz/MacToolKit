export function AlloyMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Precision geometric Alloy glyph: Dual faceted titanium prism */}
      <path
        d="M12 2.5L21 19.5H16.2L12 11.2L7.8 19.5H3L12 2.5Z"
        fill="currentColor"
        fillOpacity="0.95"
      />
      <path
        d="M8.8 17.2L12 11L15.2 17.2H8.8Z"
        fill="var(--background)"
      />
      <circle cx="12" cy="7" r="1.25" fill="#f59e0b" />
    </svg>
  )
}

export function AlloyWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-semibold tracking-tight ${className}`}>
      <span className="grid size-7 place-items-center rounded-md border border-white/10 bg-zinc-900 text-zinc-100 shadow-sm">
        <AlloyMark className="size-4 text-zinc-100" />
      </span>
      <span className="font-mono text-sm tracking-widest text-zinc-100 uppercase">
        Alloy
      </span>
      <span className="hidden font-mono text-[10px] text-zinc-500 uppercase tracking-wider sm:inline">
        v2.0
      </span>
    </div>
  )
}
