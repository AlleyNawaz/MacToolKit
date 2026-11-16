import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { guides } from "@/data/editorial"

export const metadata: Metadata = {
  title: "Setup Guides · Alloy",
  description: "Step-by-step setup guides and recommended tool combinations for macOS developers.",
}

export default function GuidesIndex() {
  const [featured, ...rest] = guides

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Editorial / Setup Sequences
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Developer setup guides
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Step-by-step installation guides and reproducible software stacks for Mac environments.
        </p>
      </div>

      {/* Asymmetric Hero Guide (Featured) */}
      {featured && (
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 transition hover:border-zinc-700">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-500 uppercase">
            <BookOpen className="size-4" />
            <span>{featured.eyebrow} · FEATURED WORKFLOW</span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
            <Link href={`/guides/${featured.slug}`} className="hover:text-amber-500 transition">
              {featured.title}
            </Link>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {featured.description}
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 pt-6 border-t border-border/60">
            {featured.steps.slice(0, 4).map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                <span className="font-mono text-amber-500 font-semibold">{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40">
            <span className="font-mono text-xs text-muted-foreground">
              {featured.toolSlugs.length} tools included
            </span>
            <Link
              href={`/guides/${featured.slug}`}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground font-medium hover:text-amber-500 transition"
            >
              Read complete guide <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Secondary Guides List (Editorial Architecture) */}
      <div className="mt-6 divide-y divide-border/60 rounded-xl border border-border bg-card">
        {rest.map((guide) => (
          <div
            key={guide.slug}
            className="group flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between transition hover:bg-muted/40"
          >
            <div className="min-w-0 sm:w-2/3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {guide.eyebrow}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-foreground group-hover:text-amber-500 transition">
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-5">{guide.description}</p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 sm:w-1/3">
              <span className="font-mono text-xs text-zinc-400">
                {guide.toolSlugs.length} tools
              </span>
              <Link
                href={`/guides/${guide.slug}`}
                className="inline-flex items-center gap-1 rounded border border-border/60 bg-muted/40 px-3 py-1.5 font-mono text-xs text-foreground hover:bg-muted transition"
              >
                Inspect guide <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
