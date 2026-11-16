import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock3, ExternalLink, GitBranch,
  Laptop, ShieldCheck, Terminal, Zap, Sparkles, Lightbulb,
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
        installation: parsed.installation ?? (tool.installKind === "manual" ? "Follow the vendor's installation guide." : `Run \`${tool.installCommand}\` in terminal.`),
        benefits: parsed.benefits,
        howToUse: parsed.howToUse ?? [],
        features: parsed.features ?? [],
        proTips: parsed.proTips ?? [],
        bestFor: parsed.bestFor ?? "Mac developers and power users.",
        macOSIntegration: parsed.macOSIntegration ?? "Native macOS application and Apple Silicon support.",
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
        title: `${tool.name} for Mac — Complete Guide & Overview`,
        description: `${tool.description} Learn features, key benefits, installation, and how to use ${tool.name} on macOS.`,
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

  const benefitIcons = [Zap, Sparkles, Layers, ShieldCheck]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/tools" className="inline-flex items-center gap-1.5 font-medium hover:text-foreground">
          <ArrowLeft className="size-4" /> All tools
        </Link>
        <span>/</span>
        <Link href={`/category/${tool.category.slug}`} className="hover:text-foreground">
          {tool.category.name}
        </Link>
      </div>

      {/* Hero Header */}
      <section className="relative mt-6 overflow-hidden rounded-[2.5rem] border bg-card p-7 sm:p-10 shadow-sm">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-violet-500/15" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
          <BrandMark name={tool.name} logo={tool.logo} className="size-20 rounded-3xl text-xl shadow-xl sm:size-28 sm:text-3xl" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <Link href={`/category/${tool.category.slug}`} className="rounded-full bg-sky-500/10 px-3 py-1 font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20">
                {tool.category.name}
              </Link>
              <span className="rounded-full border bg-background/80 px-3 py-1 capitalize text-muted-foreground">
                {tool.difficulty.toLowerCase()}
              </span>
              <span className={`rounded-full px-3 py-1 font-semibold ${isPaid ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : isFreemium ? "bg-purple-500/10 text-purple-600 dark:text-purple-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}`}>
                {priceModel}
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{tool.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{docs.overview}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <FavoriteButton slug={tool.slug} />
              <a href={tool.website} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90">
                Visit official site <ExternalLink className="size-4" />
              </a>
              {tool.github && (
                <a href={tool.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border bg-background px-5 text-sm font-medium transition hover:bg-muted">
                  <GitBranch className="size-4" /> Source code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-12">
          {/* Installation Section */}
          <section id="installation" className="scroll-mt-28 rounded-3xl border bg-slate-950 p-6 text-white shadow-xl sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Terminal className="size-5 text-sky-400" /> Install {tool.name}
                </h2>
                <p className="mt-1 text-xs text-slate-400">Suggested macOS installation command</p>
              </div>
              <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
                macOS Universal
              </span>
            </div>
            <CommandCopy command={tool.installCommand} kind={tool.installKind} />
            <p className="mt-4 text-sm leading-6 text-slate-400">{docs.installation}</p>
          </section>

          {/* Key Benefits */}
          {docs.benefits.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Key benefits</h2>
                <p className="mt-1 text-sm text-muted-foreground">Why developers and teams choose {tool.name}.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {docs.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index % benefitIcons.length]
                  return (
                    <div key={benefit.title} className="rounded-3xl border bg-card/60 p-6 shadow-sm transition hover:border-sky-500/30 hover:bg-card">
                      <div className="grid size-10 place-items-center rounded-2xl bg-sky-500/10 text-sky-500">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.description}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* How to Use / Getting Started */}
          {docs.howToUse.length > 0 && (
            <section className="space-y-4 border-t pt-10">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">How to use</h2>
                <p className="mt-1 text-sm text-muted-foreground">Setup walkthrough and common commands.</p>
              </div>
              <div className="space-y-3">
                {docs.howToUse.map((step) => (
                  <div key={step.step} className="flex gap-4 rounded-2xl border bg-card p-5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-foreground text-xs font-bold text-background">
                      {step.step}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-semibold text-foreground text-sm">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Features Checklist */}
          {docs.features.length > 0 && (
            <section className="space-y-4 border-t pt-10">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Core features</h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {docs.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 rounded-2xl border bg-muted/40 p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm leading-6 text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Pro Tips */}
          {docs.proTips.length > 0 && (
            <section className="rounded-3xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-xl bg-sky-500 text-white shadow-sm">
                  <Lightbulb className="size-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Tips & shortcuts</h3>
                  <p className="text-xs text-muted-foreground">Configuration suggestions and keyboard shortcuts</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2.5">
                {docs.proTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
                    <span className="text-sky-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related Tools */}
          {related.length > 0 && (
            <section className="border-t pt-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">More in {tool.category.name}</h2>
                  <p className="text-sm text-muted-foreground">Alternative and related tools in this category</p>
                </div>
                <Link href={`/category/${tool.category.slug}`} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-sky-600 dark:text-sky-400">
                  View all <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <ToolCard key={item.id} tool={item} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Overview</h2>
            <dl className="mt-4 space-y-3.5 text-sm divide-y divide-border/60">
              <Detail icon={<Laptop />} label="Category" value={tool.category.name} />
              <Detail icon={<ShieldCheck />} label="Difficulty" value={tool.difficulty.toLowerCase()} />
              <Detail icon={<DollarSign />} label="Pricing" value={priceModel} />
              <Detail icon={<Cpu />} label="Architecture" value="Apple Silicon (M1–M4) & Intel" />
              <Detail icon={<BadgeCheck />} label="Compatibility" value={tool.compatibility} />
              <Detail icon={<Clock3 />} label="Catalog updated" value={tool.updatedAt.toLocaleDateString("en", { month: "short", year: "numeric" })} />
            </dl>

            <div className="mt-5 border-t pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best for</h3>
              <p className="mt-1.5 text-sm leading-6 text-foreground">{docs.bestFor}</p>
            </div>

            <div className="mt-4 border-t pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">macOS Integration</h3>
              <p className="mt-1.5 text-sm leading-6 text-foreground">{docs.macOSIntegration}</p>
            </div>
          </div>

          {rawTags.length > 0 && (
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Tags</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {rawTags.map((tag) => (
                  <span key={tag} className="rounded-full border bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground">
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
    <div className="flex gap-3 pt-3 first:pt-0">
      <span className="mt-0.5 text-muted-foreground [&>svg]:size-4">{icon}</span>
      <div>
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 text-sm font-medium capitalize text-foreground">{value}</dd>
      </div>
    </div>
  )
}
