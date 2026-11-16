import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ToolCard } from "@/components/ToolCard"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return (await prisma.category.findMany({ select: { slug: true } })).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug }, select: { name: true, description: true } })
  return category
    ? { title: `${category.name} · Alloy`, description: category.description }
    : { title: "Category not found" }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { tools: { orderBy: { name: "asc" }, include: { category: true } } },
  })
  if (!category) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="size-3.5" /> All categories
      </Link>

      <div className="mt-8 max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Category / {category.tools.length} Tools
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {category.description}
        </p>
      </div>

      {category.tools.length ? (
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {category.tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border py-20 text-center font-mono text-xs text-muted-foreground">
          No tools in this category yet.
        </div>
      )}
    </div>
  )
}
