import Link from "next/link"
import { ArrowRight, Terminal, GitCompareArrows } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { HomeDirectory } from "@/components/HomeDirectory"

export default async function Home() {
  const [allTools, categories] = await Promise.all([
    prisma.tool.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    }),
    prisma.category.findMany({
      include: { _count: { select: { tools: true } } },
      orderBy: { tools: { _count: "desc" } },
    }),
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Centered Spotlight Command Center Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded border border-border/80 bg-muted/40 px-3 py-1 font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
          Alloy · macOS Developer Index · {allTools.length} Entries
        </div>

        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          The developer tool index for macOS.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
          A keyboard-first directory of verified tools, package managers, and command-line utilities. Filter, inspect, and copy install commands instantly.
        </p>
      </section>

      {/* Front-and-Center Spotlight Directory Launcher */}
      <section className="mt-10">
        <HomeDirectory initialTools={allTools} categories={categories} />
      </section>

      {/* Asymmetric Editorial Bento (No 3-Card Monotony) */}
      <section className="mt-20 border-t border-border pt-14">
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              02 / Ecosystem
            </span>
            <h2 className="mt-1 text-2xl font-semibold text-foreground">
              Setup automation, comparisons &amp; guides
            </h2>
          </div>
          <Link
            href="/guides"
            className="hidden items-center gap-1 font-mono text-xs text-amber-500 hover:underline sm:flex"
          >
            Explore all guides <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Bento Tile 1: Large Feature — Setup Script Builder */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition hover:border-zinc-700 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-500">
                <Terminal className="size-4" />
                <span>AUTOMATION</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-foreground">
                Personalized setup scripts
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Configure reproducible workstations for Web Development, AI Engineering, DevOps, or Native Mobile. Review every brew formula and manual step before downloading a single shell script.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-border/60">
              <Link
                href="/setup"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-4 text-xs font-semibold text-background hover:opacity-90 transition"
              >
                Launch Setup Wizard <ArrowRight className="size-3" />
              </Link>
              <span className="font-mono text-xs text-muted-foreground">
                6 preconfigured workflow profiles
              </span>
            </div>
          </div>

          {/* Bento Tile 2: Side-by-Side Comparisons */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition hover:border-zinc-700">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <GitCompareArrows className="size-4 text-amber-500" />
                <span>COMPARISONS</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Technical tradeoffs
              </h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Objective comparisons between major macOS utilities without manufactured winners.
              </p>
              <div className="mt-4 space-y-2 font-mono text-xs text-zinc-400">
                <div className="flex justify-between border-b border-border/40 pb-1.5">
                  <span>VS Code</span>
                  <span className="text-zinc-500">vs</span>
                  <span>Cursor</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-1.5">
                  <span>Docker</span>
                  <span className="text-zinc-500">vs</span>
                  <span>OrbStack</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-1.5">
                  <span>Raycast</span>
                  <span className="text-zinc-500">vs</span>
                  <span>Alfred</span>
                </div>
              </div>
            </div>

            <Link
              href="/compare"
              className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-foreground hover:text-amber-500 transition"
            >
              View comparisons →
            </Link>
          </div>
        </div>
      </section>

      {/* Tabular Categories Index Bar */}
      <section className="mt-16 border-t border-border pt-12">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              03 / Directory
            </span>
            <h2 className="mt-1 text-xl font-semibold text-foreground">
              Directory by category
            </h2>
          </div>
          <Link href="/categories" className="font-mono text-xs text-amber-500 hover:underline">
            All categories →
          </Link>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex items-center justify-between rounded-lg border border-border/80 bg-card/60 p-3 transition hover:border-zinc-700 hover:bg-card"
            >
              <div className="min-w-0 pr-2">
                <span className="block truncate text-sm font-medium text-foreground group-hover:text-amber-500 transition">
                  {cat.name}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {cat._count?.tools ?? 0} tools
                </span>
              </div>
              <ArrowRight className="size-3 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
