import Link from "next/link"
import { ArrowLeft, Terminal } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <span className="grid size-12 place-items-center rounded-xl border border-border bg-card text-muted-foreground">
        <Terminal className="size-5" />
      </span>
      <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-wider text-amber-500">
        404 · Null Pointer / Unresolved Path
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Package not found in index</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The tool or documentation page may have been relocated or removed from the index.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-background transition hover:bg-zinc-200"
      >
        <ArrowLeft className="size-3.5" /> Return to directory
      </Link>
    </div>
  )
}
