export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-12 sm:px-6">
      <div className="h-4 w-28 rounded bg-muted/60" />
      <div className="mt-4 h-10 w-1/2 rounded-lg bg-muted/60" />
      <div className="mt-3 h-5 w-1/3 rounded bg-muted/40" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-40 rounded-xl border border-border bg-card/40" />
        ))}
      </div>
    </div>
  )
}
