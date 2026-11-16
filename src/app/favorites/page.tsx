import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { FavoritesGrid } from "@/components/FavoritesGrid"

export const metadata: Metadata = {
  title: "Saved Tools — Alloy",
  description: "Personal macOS developer shortlist stored locally in browser.",
}

export default async function FavoritesPage() {
  const tools = await prisma.tool.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 max-w-3xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-500">Shortlist</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Saved tools</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Tools stored in this browser session. Persisted locally without account requirements.
        </p>
      </div>
      <FavoritesGrid tools={tools} />
    </div>
  )
}
