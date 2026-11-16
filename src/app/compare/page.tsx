import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, GitCompareArrows } from "lucide-react"
import { comparisons } from "@/data/editorial"

export const metadata: Metadata = {
  title: "Comparisons · Alloy",
  description: "Technical comparisons and tradeoffs between popular macOS developer tools.",
}

export default function CompareIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Evaluation / Head-to-Head
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Tool comparisons
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Architecture tradeoffs, performance characteristics, and installation commands for direct alternatives.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {comparisons.map((item) => (
          <Link
            key={item.slug}
            href={`/compare/${item.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition hover:border-zinc-700 hover:bg-card/90"
          >
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-500">
                <GitCompareArrows className="size-4" />
                <span>SPEC COMPARISON</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-foreground group-hover:text-amber-500 transition">
                {item.title}
              </h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {item.summary}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-3 font-mono text-xs text-foreground font-medium">
              <span>Inspect tradeoffs</span>
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
