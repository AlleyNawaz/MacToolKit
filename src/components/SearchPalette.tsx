"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Folder, Search, Wrench, X } from "lucide-react"
import { BrandMark } from "@/components/BrandMark"

type SearchTool = { name: string; slug: string; description: string; category: { name: string }; logo?: string }
type SearchCategory = { name: string; slug: string }
type Result = { kind: "tool" | "category"; name: string; description: string; path: string; logo?: string }

export function SearchPalette({ tools, categories }: { tools: SearchTool[]; categories: SearchCategory[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMac, setIsMac] = useState(true)
  const [restoreFocus, setRestoreFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.platform)))
    return () => cancelAnimationFrame(frame)
  }, [])

  function closeSearch() {
    setOpen(false)
    setQuery("")
    setActiveIndex(0)
    setRestoreFocus(true)
  }

  useEffect(() => {
    if (open || !restoreFocus) return
    const frame = requestAnimationFrame(() => {
      triggerRef.current?.focus()
      setRestoreFocus(false)
    })
    return () => cancelAnimationFrame(frame)
  }, [open, restoreFocus])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        if (open) closeSearch()
        else setOpen(true)
      } else if (event.key === "Escape" && open) {
        event.preventDefault()
        closeSearch()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const results = useMemo<Result[]>(() => {
    const value = query.trim().toLowerCase()
    const matchingTools = (value
      ? tools.filter((tool) => `${tool.name} ${tool.description} ${tool.category.name}`.toLowerCase().includes(value)).slice(0, 8)
      : tools.slice(0, 7)
    ).map((tool) => ({ kind: "tool" as const, name: tool.name, description: `${tool.category.name} · ${tool.description}`, path: `/tool/${tool.slug}`, logo: tool.logo }))
    const matchingCategories = value
      ? categories.filter((category) => category.name.toLowerCase().includes(value)).slice(0, 5).map((category) => ({ kind: "category" as const, name: category.name, description: "Category", path: `/category/${category.slug}` }))
      : []
    return [...matchingTools, ...matchingCategories]
  }, [query, tools, categories])

  function go(path: string) {
    closeSearch()
    router.push(path)
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % Math.max(1, results.length))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + Math.max(1, results.length)) % Math.max(1, results.length))
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault()
      go(results[activeIndex].path)
    }
  }

  function trapFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !dialogRef.current) return
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("input, button, a[href]"))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)} className="flex h-9 w-full items-center gap-2 rounded-lg border border-border bg-card/60 px-2.5 text-xs text-muted-foreground shadow-sm transition hover:border-zinc-700 hover:text-foreground md:w-52 lg:w-60" aria-label="Search tools and categories" aria-haspopup="dialog" aria-expanded={open}>
        <Search className="size-3.5" />
        <span className="hidden flex-1 text-left sm:inline">Search Alloy index…</span>
        <kbd className="hidden rounded border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 sm:inline">{isMac ? "⌘ K" : "Ctrl K"}</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-3 pt-[8vh] backdrop-blur-md sm:px-4 sm:pt-[12vh]" onMouseDown={(event) => { if (event.target === event.currentTarget) closeSearch() }}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Search tools and categories" onKeyDown={trapFocus} className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 border-b border-border px-4 sm:px-5">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} onKeyDown={onInputKeyDown} role="combobox" aria-expanded="true" aria-controls="search-results" aria-activedescendant={results[activeIndex] ? `search-result-${activeIndex}` : undefined} aria-label="Search query" className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search 244 Mac tools, categories, or commands…" />
              <button type="button" onClick={closeSearch} className="rounded-md p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground" aria-label="Close search"><X className="size-4" /></button>
            </div>
            <div id="search-results" role="listbox" aria-label="Search results" className="max-h-[58vh] overflow-y-auto p-2">
              <p className="px-3 pb-2 pt-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{query ? "Matches" : "Quick Access"}</p>
              {results.length ? results.map((item, index) => (
                <button id={`search-result-${index}`} role="option" aria-selected={index === activeIndex} key={item.path} type="button" onMouseEnter={() => setActiveIndex(index)} onClick={() => go(item.path)} className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition ${index === activeIndex ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}>
                  {item.kind === "tool" ? <BrandMark name={item.name} logo={item.logo} className="size-8 rounded-md text-xs" /> : <Folder className="size-8 shrink-0 rounded-md bg-muted p-2 text-amber-500" />}
                  <span className="min-w-0 flex-1"><span className="block text-sm font-medium text-foreground">{item.name}</span><span className="block truncate text-xs text-muted-foreground">{item.description}</span></span>
                </button>
              )) : <div className="px-3 py-10 text-center font-mono text-xs text-muted-foreground">No matching entries found.</div>}
            </div>
            <div className="flex items-center gap-4 border-t border-border bg-muted/30 px-4 py-2.5 font-mono text-[11px] text-muted-foreground"><span>↑↓ Navigate</span><span>↵ Select</span><span>esc Close</span><span className="ml-auto hidden items-center gap-1 sm:flex"><Wrench className="size-3" /> {tools.length} entries</span></div>
          </div>
        </div>
      )}
    </>
  )
}
