import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ToolsExplorer } from "@/components/ToolsExplorer"

export const metadata: Metadata = { title: "Complete Index · Alloy", description: "Browse and search the complete Alloy index of macOS developer software." }

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([
    prisma.tool.findMany({ include: { category: true }, orderBy: { name: "asc" } }),
    prisma.category.findMany({ select: { name: true, slug: true }, orderBy: { name: "asc" } }),
  ])
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Index / {tools.length} Tools
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Complete tool index
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Filter by category, search by command syntax, or sort by difficulty level.
        </p>
      </div>
      <ToolsExplorer tools={tools} categories={categories} />
    </div>
  )
}
