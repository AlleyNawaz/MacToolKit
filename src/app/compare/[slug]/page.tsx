import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Terminal } from "lucide-react"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { comparisons } from "@/data/editorial"
import { BrandMark } from "@/components/BrandMark"
import { CommandCopy } from "@/components/CommandCopy"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return comparisons.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = comparisons.find((entry) => entry.slug === slug)
  return item
    ? {
        title: `${item.title} — Technical Comparison | Alloy`,
        description: item.summary,
      }
    : { title: "Comparison not found" }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const item = comparisons.find((entry) => entry.slug === slug)
  if (!item) notFound()

  const [left, right] = await Promise.all([
    prisma.tool.findUnique({ where: { slug: item.left }, include: { category: true } }),
    prisma.tool.findUnique({ where: { slug: item.right }, include: { category: true } }),
  ])
  if (!left || !right) notFound()

  const rows = [
    ["Category", left.category.name, right.category.name],
    ["Difficulty", left.difficulty.toLowerCase(), right.difficulty.toLowerCase()],
    ["Install method", left.installKind === "manual" ? "Manual package" : "Homebrew package", right.installKind === "manual" ? "Manual package" : "Homebrew package"],
    ["Compatibility", left.compatibility, right.compatibility],
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link href="/compare" className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition">
        <ArrowLeft className="size-3" /> All comparisons
      </Link>

      <div className="mt-6 max-w-3xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-500">Side-by-side analysis</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h1>
        <p className="mt-3 text-base text-muted-foreground">{item.summary}</p>
      </div>

      <p className="mt-8 text-xs text-muted-foreground sm:hidden font-mono">Scroll horizontally for side-by-side metrics →</p>

      {/* Comparison Matrix */}
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card sm:mt-8">
        <div className="grid min-w-[34rem] grid-cols-[.7fr_1fr_1fr]">
          <div className="border-b border-border p-4 sm:p-5 font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-end">
            Metric
          </div>
          <ToolHead tool={left} />
          <ToolHead tool={right} />

          {rows.flatMap(([label, a, b]) => [
            <div key={`${label}-l`} className="border-t border-border p-4 font-mono text-xs text-muted-foreground sm:p-4">
              {label}
            </div>,
            <div key={`${label}-a`} className="border-l border-t border-border p-4 text-xs font-mono capitalize text-zinc-300 sm:p-4">
              {a}
            </div>,
            <div key={`${label}-b`} className="border-l border-t border-border p-4 text-xs font-mono capitalize text-zinc-300 sm:p-4">
              {b}
            </div>,
          ])}
        </div>
      </div>

      {/* Install commands */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Install tool={left} />
        <Install tool={right} />
      </div>

      {/* Editorial Verdict */}
      <section className="mt-6 rounded-xl border border-border bg-card p-6 sm:p-7">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-500">Evaluation</span>
          <span className="text-zinc-600">/</span>
          <h2 className="text-base font-semibold text-foreground">Recommendation</h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-zinc-300">{item.verdict}</p>
      </section>
    </div>
  )
}

function ToolHead({ tool }: { tool: { name: string; slug: string; description: string; logo?: string } }) {
  return (
    <div className="border-l border-b border-border p-4 sm:p-5">
      <BrandMark name={tool.name} logo={tool.logo} className="size-10 rounded-lg text-xs" />
      <Link href={`/tool/${tool.slug}`} className="mt-2.5 block text-sm font-semibold hover:text-amber-400 transition">
        {tool.name}
      </Link>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{tool.description}</p>
    </div>
  )
}

function Install({ tool }: { tool: { name: string; installCommand: string; installKind: string } }) {
  return (
    <div className="rounded-xl border border-border bg-[#090a0d] p-5 text-zinc-100">
      <div className="mb-3 flex items-center gap-2">
        <Terminal className="size-4 text-amber-500" />
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
          Install {tool.name}
        </p>
      </div>
      <CommandCopy command={tool.installCommand} kind={tool.installKind} />
    </div>
  )
}
