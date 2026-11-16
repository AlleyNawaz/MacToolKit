"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { favoritesEvent, favoritesKey, readFavorites, writeFavorites } from "@/lib/favorites"

export function FavoriteButton({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    const sync = () => setSaved(readFavorites().includes(slug))
    const onStorage = (event: StorageEvent) => { if (event.key === favoritesKey || event.key === null) sync() }
    const frame = requestAnimationFrame(sync)
    window.addEventListener(favoritesEvent, sync)
    window.addEventListener("storage", onStorage)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener(favoritesEvent, sync)
      window.removeEventListener("storage", onStorage)
    }
  }, [slug])

  function toggle() {
    const values = readFavorites()
    const next = values.includes(slug) ? values.filter((value) => value !== slug) : [...values, slug]
    const persisted = writeFavorites(next)
    setSaveError(!persisted)
    if (persisted) setSaved(next.includes(slug))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative z-10 inline-flex items-center justify-center gap-1.5 rounded-lg border font-mono text-xs transition",
        saved
          ? "border-amber-500/40 bg-amber-500/10 text-amber-400 font-medium"
          : "border-border bg-card text-muted-foreground hover:border-zinc-700 hover:text-foreground",
        compact ? "size-8 p-0" : "h-9 px-3 uppercase tracking-wider"
      )}
      aria-label={saveError ? "Could not save favorite in this browser" : saved ? "Remove from saved shortlist" : "Save package to shortlist"}
      aria-pressed={saved}
      title={saveError ? "Could not save in this browser" : undefined}
    >
      <Heart className={cn("size-3.5", saved && "fill-amber-400 text-amber-400")} />
      {!compact && (saveError ? "Save error" : saved ? "Saved" : "Save")}
    </button>
  )
}
