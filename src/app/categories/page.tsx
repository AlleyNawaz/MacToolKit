import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Categories · Alloy",
  description: "Browse macOS developer tools organized by workflow and technical category.",
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { tools: true } },
      tools: { take: 5, orderBy: { name: "asc" }, select: { name: true, slug: true } },
    },
    orderBy: { name: "asc" },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Categories / {categories.length} Workflows
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Tool directory by category
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Tools grouped by development discipline, runtime environment, and operational layer.
        </p>
      </div>

      {/* High-Density Editorial Table List */}
      <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border/60">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group flex flex-col gap-4 p-5 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 sm:w-1/3">
              <Link
                href={`/category/${category.slug}`}
                className="font-medium text-base text-foreground group-hover:text-amber-500 transition flex items-center gap-1.5"
              >
                {category.name}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground leading-5">
                {category.description}
              </p>
            </div>

            {/* Featured Tools in Category */}
            <div className="flex flex-wrap items-center gap-1.5 sm:w-1/2">
              {category.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tool/${tool.slug}`}
                  className="rounded border border-border/70 bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground hover:border-zinc-700 hover:text-foreground transition"
                >
                  {tool.name}
                </Link>
              ))}
            </div>

            {/* Count & Direct Arrow */}
            <div className="flex items-center justify-between sm:w-1/6 sm:justify-end gap-3 shrink-0">
              <span className="font-mono text-xs text-zinc-400">
                {category._count.tools} tools
              </span>
              <Link
                href={`/category/${category.slug}`}
                aria-label={`View ${category.name}`}
                className="rounded border border-border/60 bg-muted/40 p-1.5 text-muted-foreground group-hover:border-zinc-700 group-hover:text-foreground transition"
              >
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
