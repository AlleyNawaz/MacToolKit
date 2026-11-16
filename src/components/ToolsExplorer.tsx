"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal, List, LayoutGrid, Check, Copy, ArrowUpRight } from "lucide-react"
import { ToolCard } from "@/components/ToolCard"
import { BrandMark } from "@/components/BrandMark"
import { copyText } from "@/lib/clipboard"

type Tool = {
  id: string
  name: string
  slug: string
  description: string
  difficulty: string
  tags: string
  installCommand: string
  logo?: string
  category: { name: string; slug: string }
}

export function ToolsExplorer({
  tools,
  categories,
  initialCategory = "all",
}: {
  tools: Tool[]
  categories: { name: string; slug: string }[]
  initialCategory?: string
}) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(initialCategory)
  const [difficulty, setDifficulty] = useState("all")
  const [sort, setSort] = useState("name-asc")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const results = useMemo(() => {
    const value = query.trim().toLowerCase()
    const filtered = tools.filter((tool) => {
      const matchesQuery =
        !value ||
        `${tool.name} ${tool.description} ${tool.tags} ${tool.category.name} ${tool.installCommand}`
          .toLowerCase()
          .includes(value)
      return (
        matchesQuery &&
        (category === "all" || tool.category.slug === category) &&
        (difficulty === "all" || tool.difficulty === difficulty)
      )
    })
    const level = { BEGINNER: 0, INTERMEDIATE: 1, ADVANCED: 2 }
    return filtered.sort((a, b) => {
      if (sort === "name-desc") return b.name.localeCompare(a.name)
      if (sort === "difficulty")
        return (
          (level[a.difficulty as keyof typeof level] ?? 3) -
            (level[b.difficulty as keyof typeof level] ?? 3) || a.name.localeCompare(b.name)
        )
      return a.name.localeCompare(b.name)
    })
  }, [tools, query, category, difficulty, sort])

  async function handleCopy(tool: Tool, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const success = await copyText(tool.installCommand)
    if (success) {
      setCopiedSlug(tool.slug)
      setTimeout(() => setCopiedSlug(null), 1400)
    }
  }

  return (
    <div>
      {/* Sticky Filter Bar */}
      <div className="mb-6 rounded-xl border border-border bg-card/90 p-2.5 shadow-sm backdrop-blur-xl md:sticky md:top-14 md:z-30">
        <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">Search tools</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, command, or tag…"
              className="h-10 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/10 placeholder:text-muted-foreground"
            />
          </label>
          <label className="relative">
            <span className="sr-only">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 min-w-44 appearance-none rounded-lg border border-border bg-muted/40 pl-3 pr-8 text-xs font-mono outline-none text-foreground"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          </label>
          <label>
            <span className="sr-only">Difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="h-10 min-w-36 rounded-lg border border-border bg-muted/40 px-3 text-xs font-mono outline-none text-foreground"
            >
              <option value="all">Any difficulty</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 min-w-32 rounded-lg border border-border bg-muted/40 px-3 text-xs font-mono outline-none text-foreground"
            >
              <option value="name-asc">A–Z</option>
              <option value="name-desc">Z–A</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </label>
        </div>
      </div>

      {/* Meta Count & View Switcher */}
      <div className="mb-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <p aria-live="polite">
          <span className="font-semibold text-foreground">{results.length}</span> tools listed
        </p>
        <div className="flex items-center gap-3">
          {(query || category !== "all" || difficulty !== "all" || sort !== "name-asc") && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setCategory("all")
                setDifficulty("all")
                setSort("name-asc")
              }}
              className="text-amber-500 hover:underline"
            >
              Reset filters
            </button>
          )}

          <div className="flex items-center rounded-md border border-border bg-card/60 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              aria-label="Table view"
              className={`rounded p-1 transition ${
                viewMode === "table" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`rounded p-1 transition ${
                viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Rendering */}
      {results.length ? (
        viewMode === "table" ? (
          <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border/60">
            {results.map((tool) => {
              const isCopied = copiedSlug === tool.slug
              return (
                <div
                  key={tool.id}
                  className="group relative flex flex-col gap-3 p-3 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                >
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
                      <span className="block truncate text-xs text-muted-foreground">{tool.description}</span>
                    </div>
                  </div>

                  <div className="hidden shrink-0 sm:block sm:w-1/5">
                    <Link
                      href={`/category/${tool.category.slug}`}
                      className="rounded border border-border/70 bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground hover:border-zinc-700 hover:text-foreground transition"
                    >
                      {tool.category.name}
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 sm:w-2/5 sm:justify-end">
                    <div className="flex w-full items-center justify-between gap-2 rounded-md border border-border/80 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-zinc-300 sm:w-auto sm:max-w-xs">
                      <span className="truncate text-zinc-400">
                        <span className="text-amber-500">$</span> {tool.installCommand}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopy(tool, e)}
                        title="Copy command"
                        className="shrink-0 p-0.5 text-zinc-400 hover:text-zinc-100 transition"
                      >
                        {isCopied ? <Check className="size-3.5 text-amber-500" /> : <Copy className="size-3.5" />}
                      </button>
                    </div>

                    <Link
                      href={`/tool/${tool.slug}`}
                      className="hidden rounded border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted md:inline-flex"
                    >
                      View
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )
      ) : (
        <div className="rounded-xl border border-dashed border-border py-20 text-center font-mono text-xs text-muted-foreground">
          No matching tools found. Clear filters or broaden search.
        </div>
      )}
    </div>
  )
}
