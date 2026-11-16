import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BrandMark } from "@/components/BrandMark"
import { FavoriteButton } from "@/components/FavoriteButton"

interface ToolCardProps {
  tool: {
    name: string
    slug: string
    description: string
    difficulty?: string
    category: { name: string }
    logo?: string
  }
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="group relative flex min-h-[14rem] flex-col justify-between rounded-xl border border-border bg-card p-4 transition hover:border-zinc-700 hover:bg-card/90">
      <div>
        <div className="flex items-start justify-between gap-3">
          <BrandMark name={tool.name} logo={tool.logo} className="size-10 rounded-md text-xs" />
          <FavoriteButton slug={tool.slug} compact />
        </div>
        <div className="mt-3">
          <span className="font-mono text-[11px] text-muted-foreground">{tool.category.name}</span>
          <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground">
            <Link href={`/tool/${tool.slug}`} className="after:absolute after:inset-0 hover:text-amber-500 transition">
              {tool.name}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">{tool.description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
        <span className="font-mono text-[10px] uppercase text-zinc-500">
          {tool.difficulty?.toLowerCase() ?? "utility"}
        </span>
        <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground group-hover:text-foreground transition">
          Inspect <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  )
}
