import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { guides } from "@/data/editorial"
import { ToolCard } from "@/components/ToolCard"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)
  return guide
    ? { title: `${guide.title} · Alloy`, description: guide.description }
    : { title: "Guide not found" }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)
  if (!guide) notFound()

  const tools = await prisma.tool.findMany({
    where: { slug: { in: [...guide.toolSlugs] } },
    include: { category: true },
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="size-3.5" /> All guides
      </Link>

      <article className="mt-8 max-w-3xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-500">
          {guide.eyebrow}
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {guide.description}
        </p>
      </article>

      {/* Step Sequence Timeline */}
      <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card divide-y divide-border/60">
        {guide.steps.map((step, index) => (
          <div key={step} className="flex items-start gap-4 p-4.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border/80 bg-muted/60 font-mono text-xs font-semibold text-zinc-300">
              {index + 1}
            </span>
            <p className="pt-0.5 text-sm leading-6 text-foreground">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-2 border-b border-border pb-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Included Packages ({tools.length})
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
