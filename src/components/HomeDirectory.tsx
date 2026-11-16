"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, Check, Copy, ArrowUpRight, LayoutGrid, List } from "lucide-react"
import { BrandMark } from "@/components/BrandMark"
import { copyText } from "@/lib/clipboard"

export interface ToolItem {
  id: string
  name: string
  slug: string
  description: string
  installCommand: string
  installKind: string
  difficulty: string
  tags: string
  logo?: string
  category: {
    name: string
    slug: string
  }
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
  _count?: {
    tools: number
  }
}

export function HomeDirectory({
  initialTools,
  categories,
}: {
  initialTools: ToolItem[]
  categories: CategoryItem[]
}) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase()
    return initialTools.filter((tool) => {
      const matchesCat = selectedCategory === "all" || tool.category.slug === selectedCategory
      const matchesQ =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.installCommand.toLowerCase().includes(q) ||
        tool.tags.toLowerCase().includes(q) ||
        tool.category.name.toLowerCase().includes(q)
      return matchesCat && matchesQ
    })
  }, [initialTools, query, selectedCategory])

  async function handleCopy(tool: ToolItem, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const success = await copyText(tool.installCommand)
    if (success) {
      setCopiedSlug(tool.slug)
      setTimeout(() => setCopiedSlug(null), 1400)
    }
  }

  return (
    <div className="w-full">
      {/* Front-and-Center Spotlight Launcher */}
      <div className="mx-auto max-w-4xl">
        <div className="relative flex items-center rounded-xl border border-border bg-card/90 shadow-2xl backdrop-blur-xl focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/10">
          <Search className="pointer-events-none ml-4 size-5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 244 tools by name, formula, or category (e.g. ghostty, raycast, docker)..."
            className="h-14 w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mr-3 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              clear
            </button>
          )}
          <div className="mr-3 hidden items-center gap-1.5 border-l border-border/80 pl-3 sm:flex">
            <kbd className="rounded border border-border/80 bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-md px-3 py-1 font-mono text-xs transition ${
              selectedCategory === "all"
                ? "bg-foreground text-background font-medium"
                : "border border-border/80 bg-card/60 text-muted-foreground hover:border-zinc-700 hover:text-foreground"
            }`}
          >
            All ({initialTools.length})
          </button>
          {categories.slice(0, 9).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`rounded-md px-2.5 py-1 font-mono text-xs transition ${
                selectedCategory === cat.slug
                  ? "bg-foreground text-background font-medium"
                  : "border border-border/80 bg-card/60 text-muted-foreground hover:border-zinc-700 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-xs text-amber-500 hover:underline"
          >
            More →
          </Link>
        </div>
      </div>

      {/* Directory Controls Bar */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Index Results
          </span>
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">
            {filteredTools.length}
          </span>
          {selectedCategory !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="text-xs text-amber-500 hover:underline"
            >
              (reset filter)
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-border bg-card/60 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              aria-label="Table view"
              className={`rounded p-1 transition ${
                viewMode === "table" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`rounded p-1 transition ${
                viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* High-Density Index Table View */}
      {viewMode === "table" ? (
        <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
          <div className="divide-y divide-border/60">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => {
                const isCopied = copiedSlug === tool.slug
                return (
                  <div
                    key={tool.id}
                    className="group relative flex flex-col gap-3 p-3.5 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Tool Info Column */}
                    <div className="flex items-center gap-3 min-w-0 sm:w-1/3">
                      <BrandMark name={tool.name} logo={tool.logo} className="size-8 shrink-0 rounded-md text-xs" />
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/tool/${tool.slug}`}
                          className="font-medium text-foreground hover:text-amber-500 transition flex items-center gap-1.5 text-sm"
                        >
                          {tool.name}
                          <ArrowUpRight className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                        </Link>
                        <span className="block truncate text-xs text-muted-foreground">
                          {tool.description}
                        </span>
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="hidden shrink-0 sm:block sm:w-1/5">
                      <Link
                        href={`/category/${tool.category.slug}`}
                        className="rounded border border-border/70 bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground hover:border-zinc-700 hover:text-foreground transition"
                      >
                        {tool.category.name}
                      </Link>
                    </div>

                    {/* Copyable Install Snippet */}
                    <div className="flex items-center gap-2 sm:w-2/5 sm:justify-end">
                      <div className="flex w-full items-center justify-between gap-2 rounded-md border border-border/80 bg-zinc-950 px-2.5 py-1.5 font-mono text-xs text-zinc-300 sm:w-auto sm:max-w-xs">
                        <span className="truncate text-zinc-400">
                          <span className="text-amber-500">$</span> {tool.installCommand}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopy(tool, e)}
                          title="Copy install command"
                          className="shrink-0 p-0.5 text-zinc-400 hover:text-zinc-100 transition"
                        >
                          {isCopied ? (
                            <Check className="size-3.5 text-amber-500" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                      </div>

                      <Link
                        href={`/tool/${tool.slug}`}
                        className="hidden rounded border border-border/60 bg-muted/40 px-2 py-1 text-xs font-medium text-foreground hover:bg-muted md:inline-flex"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-20 text-center font-mono text-xs text-muted-foreground">
                No matching tools for &ldquo;{query}&rdquo;.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Grid View with Crisp 12px Geometry */
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => {
            const isCopied = copiedSlug === tool.slug
            return (
              <div
                key={tool.id}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition hover:border-zinc-700 hover:bg-card/90"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <BrandMark name={tool.name} logo={tool.logo} className="size-10 rounded-md text-xs" />
                    <span className="rounded border border-border/80 bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {tool.category.name}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    <Link href={`/tool/${tool.slug}`} className="hover:text-amber-500 transition">
                      {tool.name}
                    </Link>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                  <div className="flex-1 truncate font-mono text-[11px] text-zinc-400">
                    <span className="text-amber-500">$</span> {tool.installCommand}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(tool, e)}
                    className="rounded border border-border/80 bg-muted/40 p-1.5 text-zinc-400 hover:text-zinc-100 transition"
                  >
                    {isCopied ? <Check className="size-3.5 text-amber-500" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
