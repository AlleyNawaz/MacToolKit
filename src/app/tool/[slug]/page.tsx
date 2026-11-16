import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock3, ExternalLink, GitBranch,
  Laptop, ShieldCheck, Terminal, Zap, Lightbulb,
  Layers, Cpu, BadgeCheck, DollarSign
} from "lucide-react"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { BrandMark } from "@/components/BrandMark"
import { CommandCopy } from "@/components/CommandCopy"
import { FavoriteButton } from "@/components/FavoriteButton"
import { ToolCard } from "@/components/ToolCard"
import { getToolDocumentation, type ToolDocumentation } from "@/lib/tool-docs"

type Props = { params: Promise<{ slug: string }> }

function parseDocs(value: string, tool: {
  name: string
  slug: string
  description: string
  categorySlug: string
  installKind: string
  installCommand: string
  tags: string[]
}): ToolDocumentation {
  try {
    const parsed = JSON.parse(value) as Partial<ToolDocumentation>
    if (parsed && typeof parsed === "object" && parsed.benefits && Array.isArray(parsed.benefits) && parsed.benefits.length > 0) {
      return {
        overview: parsed.overview ?? tool.description,
        installation: parsed.installation ?? (tool.installKind === "manual" ? "Follow vendor installation instructions." : `Run \`${tool.installCommand}\` in your terminal.`),
        benefits: parsed.benefits,
        howToUse: parsed.howToUse ?? [],
        features: parsed.features ?? [],
        proTips: parsed.proTips ?? [],
        bestFor: parsed.bestFor ?? "Mac developers and technical teams.",
        macOSIntegration: parsed.macOSIntegration ?? "Native macOS package with Apple Silicon and Intel architecture support.",
      }
    }
  } catch {
    /* Fall back to dynamic generator */
  }

  return getToolDocumentation(tool)
}

async function getTool(slug: string) {
  return prisma.tool.findUnique({ where: { slug }, include: { category: true } })
}

export const dynamicParams = false

export async function generateStaticParams() {
  return (await prisma.tool.findMany({ select: { slug: true } })).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = await getTool(slug)
  return tool
    ? {
        title: `${tool.name} — Alloy macOS Spec Sheet`,
        description: `${tool.description} Overview, installation command, features, and verification details on macOS.`,
        openGraph: { title: `${tool.name} for Mac`, description: tool.description, type: "article" },
      }
    : { title: "Tool not found" }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = await getTool(slug)
  if (!tool) notFound()

  const related = await prisma.tool.findMany({
    where: { categoryId: tool.categoryId, id: { not: tool.id } },
    orderBy: { name: "asc" },
    take: 3,
    include: { category: true },
  })

  const rawTags = tool.tags.split(",").map((t) => t.trim()).filter(Boolean)
  const isPaid = rawTags.includes("paid")
  const isFreemium = rawTags.includes("freemium")
  const priceModel = isPaid ? "Paid" : isFreemium ? "Freemium" : "Free / Open-Source"

  const docs = parseDocs(tool.documentation, {
    name: tool.name,
    slug: tool.slug,
    description: tool.description,
    categorySlug: tool.category.slug,
    installKind: tool.installKind,
    installCommand: tool.installCommand,
    tags: rawTags,
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: docs.overview,
    applicationCategory: tool.category.name,
    operatingSystem: "macOS",
    offers: {
      "@type": "Offer",
      price: isPaid ? "Paid" : "0",
      priceCurrency: "USD",
    },
  }

  const benefitIcons = [Zap, Cpu, Layers, ShieldCheck]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition inline-flex items-center gap-1">
          <ArrowLeft className="size-3" /> tools
        </Link>
        <span className="text-zinc-600">/</span>
        <Link href={`/category/${tool.category.slug}`} className="hover:text-foreground transition">
          {tool.category.slug}
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400 font-semibold">{tool.slug}</span>
      </div>

      {/* Hero Spec Header */}
      <section className="relative mt-5 rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <BrandMark name={tool.name} logo={tool.logo} className="size-16 rounded-xl text-xl sm:size-20 sm:text-2xl shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <Link href={`/category/${tool.category.slug}`} className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-zinc-300 hover:text-foreground hover:border-zinc-700 transition">
                {tool.category.name}
              </Link>
              <span className="rounded-md border border-border bg-muted/20 px-2.5 py-1 text-muted-foreground capitalize">
                {tool.difficulty.toLowerCase()}
              </span>
              <span className={`rounded-md border px-2.5 py-1 font-semibold ${
                isPaid
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                  : isFreemium
                  ? "border-purple-500/30 bg-purple-500/10 text-purple-300"
                  : "border-zinc-800 bg-zinc-900 text-zinc-300"
              }`}>
                {priceModel}
              </span>
            </div>
            
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground font-sans">
              {tool.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 sm:text-base text-zinc-300">
              {docs.overview}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <FavoriteButton slug={tool.slug} />
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-4 text-xs font-semibold uppercase tracking-wider text-background transition hover:bg-zinc-200"
              >
                Official Site <ExternalLink className="size-3.5" />
              </a>
              {tool.github && (
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-4 font-mono text-xs text-muted-foreground transition hover:border-zinc-700 hover:text-foreground"
                >
                  <GitBranch className="size-3.5" /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Specs Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          {/* Installation Section */}
          <section id="installation" className="scroll-mt-24 rounded-xl border border-border bg-[#090a0d] p-5 sm:p-6 text-zinc-100">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-amber-500" />
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Installation · {tool.name}
                </h2>
              </div>
              <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                macOS Universal (Apple Silicon & Intel)
              </span>
            </div>
            <CommandCopy command={tool.installCommand} kind={tool.installKind} />
            <p className="mt-3 font-mono text-xs leading-relaxed text-zinc-400">{docs.installation}</p>
          </section>

          {/* Key Benefits */}
          {docs.benefits.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Utility Evaluation & Strengths
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {docs.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index % benefitIcons.length]
                  return (
                    <div key={benefit.title} className="rounded-xl border border-border bg-card p-4 transition hover:border-zinc-700">
                      <div className="flex items-center gap-2.5">
                        <div className="grid size-7 place-items-center rounded-md border border-border bg-muted/60 text-amber-500">
                          <Icon className="size-3.5" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{benefit.title}</h3>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{benefit.description}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* How to Use / Walkthrough */}
          {docs.howToUse.length > 0 && (
            <section className="space-y-3 pt-2">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Workflow & Common Operations
              </h2>
              <div className="space-y-2">
                {docs.howToUse.map((step) => (
                  <div key={step.step} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md border border-amber-500/30 bg-amber-500/10 font-mono text-xs font-bold text-amber-500">
                      {step.step}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Features */}
          {docs.features.length > 0 && (
            <section className="space-y-3 pt-2">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Feature Checklist
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {docs.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 rounded-lg border border-border bg-card/60 p-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-500" />
                    <span className="text-xs leading-5 text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Pro Tips */}
          {docs.proTips.length > 0 && (
            <section className="rounded-xl border border-border bg-card/60 p-5">
              <div className="flex items-center gap-2.5">
                <div className="grid size-7 place-items-center rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-500">
                  <Lightbulb className="size-4" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">Configuration & Shortcuts</h3>
                </div>
              </div>
              <ul className="mt-3.5 space-y-2">
                {docs.proTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                    <span className="text-amber-500 font-mono select-none">→</span>
                    <span className="text-zinc-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related Tools */}
          {related.length > 0 && (
            <section className="pt-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Related in {tool.category.name}
                </h2>
                <Link href={`/category/${tool.category.slug}`} className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground transition">
                  Index <ArrowRight className="size-3" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <ToolCard key={item.id} tool={item} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Specifications */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Technical Specifications</h2>
            <dl className="mt-3 divide-y divide-border/60 text-xs font-mono">
              <Detail icon={<Laptop />} label="Category" value={tool.category.name} />
              <Detail icon={<ShieldCheck />} label="Difficulty" value={tool.difficulty.toLowerCase()} />
              <Detail icon={<DollarSign />} label="License / Model" value={priceModel} />
              <Detail icon={<Cpu />} label="Architecture" value="Apple Silicon & Intel" />
              <Detail icon={<BadgeCheck />} label="Target OS" value={tool.compatibility} />
              <Detail icon={<Clock3 />} label="Indexed" value={tool.updatedAt.toLocaleDateString("en", { month: "short", year: "numeric" })} />
            </dl>

            <div className="mt-4 border-t border-border/60 pt-3">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Target Audience</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-300">{docs.bestFor}</p>
            </div>

            <div className="mt-3 border-t border-border/60 pt-3">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Platform Integration</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-300">{docs.macOSIntegration}</p>
            </div>
          </div>

          {rawTags.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Index Tags</h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono">
                {rawTags.map((tag) => (
                  <span key={tag} className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[11px] text-zinc-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 py-2.5 first:pt-1">
      <span className="mt-0.5 text-muted-foreground [&>svg]:size-3.5">{icon}</span>
      <div className="min-w-0 flex-1">
        <dt className="text-[10px] text-muted-foreground uppercase">{label}</dt>
        <dd className="mt-0.5 font-medium text-foreground truncate">{value}</dd>
      </div>
    </div>
  )
}
