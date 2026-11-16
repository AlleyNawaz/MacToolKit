"use client"

import Link from "next/link"
import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react"

export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <span className="grid size-12 place-items-center rounded-xl border border-border bg-card text-amber-500">
        <AlertCircle className="size-6" />
      </span>
      <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-wider text-amber-500">
        Runtime Exception
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Page execution stalled</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        An unhandled runtime error occurred during rendering. Check connectivity or retry.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <button
          type="button"
          onClick={retry}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-4 font-mono text-xs font-semibold uppercase tracking-wider text-background transition hover:bg-zinc-200"
        >
          <RotateCcw className="size-3.5" /> Retry render
        </button>
        <Link
          href="/tools"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-4 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:border-zinc-700 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Return to directory
        </Link>
      </div>
    </div>
  )
}
