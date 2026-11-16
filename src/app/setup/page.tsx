import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { SetupWizard } from "@/components/SetupWizard"

export const metadata: Metadata = {
  title: "Setup Manifest Generator — Alloy",
  description: "Generate a reviewable, modular macOS setup shell script for your workflow.",
}

export default async function SetupPage() {
  const tools = await prisma.tool.findMany({
    select: {
      name: true,
      slug: true,
      description: true,
      installCommand: true,
      installKind: true,
      logo: true,
    },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-500">
          Environment Automation
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Build a macOS Setup Manifest
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Select a developer profile, inspect the recommended packages, and export an executable script you can review line-by-line before running.
        </p>
      </div>
      <SetupWizard tools={tools} />
    </div>
  )
}
