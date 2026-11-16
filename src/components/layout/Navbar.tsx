import { Suspense } from "react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ThemeToggle } from "@/components/ThemeToggle"
import { SearchPalette } from "@/components/SearchPalette"
import { PrimaryNav } from "@/components/layout/PrimaryNav"
import { AlloyWordmark } from "@/components/brand/AlloyLogo"

export async function Navbar() {
  const [tools, categories] = await Promise.all([
    prisma.tool.findMany({ select: { name: true, slug: true, description: true, logo: true, category: { select: { name: true } } }, orderBy: { name: "asc" } }),
    prisma.category.findMany({ select: { name: true, slug: true }, orderBy: { name: "asc" } }),
  ])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Alloy Home" className="mr-auto flex shrink-0 items-center">
          <AlloyWordmark />
        </Link>
        <Suspense fallback={null}><PrimaryNav /></Suspense>
        <div className="w-10 sm:w-auto"><SearchPalette tools={tools} categories={categories} /></div>
        <ThemeToggle />
      </div>
      <Suspense fallback={null}><PrimaryNav mobile /></Suspense>
    </header>
  )
}
