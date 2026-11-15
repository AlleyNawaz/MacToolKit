import { PrismaClient } from "@prisma/client"
import { categoryCatalog, toolCatalog } from "../src/data/catalog"
import { getToolDocumentation } from "../src/lib/tool-docs"

const prisma = new PrismaClient()

function documentation(tool: (typeof toolCatalog)[number]) {
  return JSON.stringify(getToolDocumentation(tool))
}

async function main() {
  const categoryIds = new Map<string, string>()

  for (const [name, slug, description] of categoryCatalog) {
    const category = await prisma.category.upsert({
      where: { slug },
      update: { name, description },
      create: { name, slug, description },
    })
    categoryIds.set(slug, category.id)
  }

  for (const tool of toolCatalog) {
    const data = {
      name: tool.name,
      logo: tool.logo,
      description: tool.description,
      developer: tool.name,
      website: tool.website,
      github: tool.github,
      installCommand: tool.command,
      installKind: tool.installKind,
      alternativeCommands: "",
      platform: "macOS,Apple Silicon,Intel Mac",
      tags: tool.tags.join(","),
      difficulty: tool.difficulty,
      documentation: documentation(tool),
      screenshots: "",
      rating: tool.rating,
      downloads: tool.downloads,
      latestVersion: "Tracked",
      compatibility: "macOS 13 Ventura,macOS 14 Sonoma,macOS 15 Sequoia",
      categoryId: categoryIds.get(tool.categorySlug)!,
    }
    const saved = await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: data,
      create: { slug: tool.slug, ...data },
    })
    await prisma.command.deleteMany({ where: { toolId: saved.id } })
    await prisma.command.create({ data: { label: "Install", command: tool.command, description: `Install ${tool.name} on macOS`, toolId: saved.id } })
  }

  console.log(`Seeded ${toolCatalog.length} tools across ${categoryCatalog.length} categories.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
}).finally(() => prisma.$disconnect())
