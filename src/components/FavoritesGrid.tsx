"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Bookmark, Search } from "lucide-react"
import { ToolCard } from "@/components/ToolCard"
import { favoritesEvent, favoritesKey, readFavorites } from "@/lib/favorites"

type Tool = {
  id: string
  name: string
  slug: string
  description: string
  difficulty: string
  logo?: string
  category: { name: string }
}

export function FavoritesGrid({ tools }: { tools: Tool[] }) {
  const [slugs, setSlugs] = useState<string[] | null>(null)

  useEffect(() => {
    const update = () => setSlugs(readFavorites())
    const onStorage = (event: StorageEvent) => {
      if (event.key === favoritesKey || event.key === null) update()
    }
    const frame = requestAnimationFrame(update)
    window.addEventListener(favoritesEvent, update)
    window.addEventListener("storage", onStorage)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener(favoritesEvent, update)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  const favorites = useMemo(() => tools.filter((tool) => slugs?.includes(tool.slug)), [slugs, tools])

  if (slugs === null) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-44 animate-pulse rounded-xl border border-border bg-card/40" />
        ))}
      </div>
    )
  }

  if (!favorites.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/30 p-12 text-center">
        <div className="mx-auto grid size-10 place-items-center rounded-lg border border-border bg-card text-muted-foreground">
          <Bookmark className="size-5" />
        </div>
        <h2 className="mt-4 text-base font-semibold">No saved packages yet</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Flag tools while exploring the index to build your personal macOS setup sheet.
        </p>
        <Link
          href="/tools"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-background transition hover:bg-zinc-200"
        >
          <Search className="size-3.5" /> Explore index
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
