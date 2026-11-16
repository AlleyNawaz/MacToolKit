"use client"

import { useMemo, useState } from "react"
import { Check, ChevronRight, Copy, Download, RotateCcw, Terminal } from "lucide-react"
import { BrandMark } from "@/components/BrandMark"
import { copyText } from "@/lib/clipboard"
import { buildSetupScript, type SetupTool } from "@/lib/setup-script"

type Tool = SetupTool & { description: string; logo?: string }

const profiles: Record<string, { label: string; description: string; slugs: string[] }> = {
  web: {
    label: "Web engineering",
    description: "Modern JavaScript, TypeScript, Node.js, and API debugging stack.",
    slugs: ["homebrew", "git", "nodejs", "pnpm", "visual-studio-code", "orbstack", "postman", "raycast"],
  },
  ai: {
    label: "AI & machine learning",
    description: "Local model runtimes, Python virtual environments, and container utilities.",
    slugs: ["homebrew", "git", "python", "miniconda", "jupyterlab", "ollama", "visual-studio-code", "docker-desktop"],
  },
  mobile: {
    label: "Native iOS & mobile",
    description: "Swift, simulator tools, package management, and developer shortcuts.",
    slugs: ["homebrew", "git", "visual-studio-code", "nodejs", "postman", "orbstack", "raycast", "rectangle"],
  },
  devops: {
    label: "Cloud & infrastructure",
    description: "Container virtualization, Kubernetes client tooling, and mesh networking.",
    slugs: ["homebrew", "git", "orbstack", "kubernetes", "helm", "terraform", "ansible", "tailscale"],
  },
  design: {
    label: "Interface & product craft",
    description: "Vector prototyping, 3D assets, quick window management, and disk hygiene.",
    slugs: ["homebrew", "figma", "sketch", "blender", "raycast", "rectangle", "notion", "daisydisk"],
  },
  student: {
    label: "Foundation & learning",
    description: "Clean essentials for computer science coursework and personal projects.",
    slugs: ["homebrew", "git", "visual-studio-code", "nodejs", "python", "github-cli", "rectangle", "obsidian"],
  },
}

export function SetupWizard({ tools }: { tools: Tool[] }) {
  const [profile, setProfile] = useState<string | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")

  const recommendations = useMemo(
    () =>
      profile
        ? profiles[profile].slugs.flatMap((slug) => {
            const tool = tools.find((item) => item.slug === slug)
            return tool ? [tool] : []
          })
        : [],
    [profile, tools]
  )
  const active = recommendations.filter((tool) => selected.includes(tool.slug))
  const script = useMemo(() => buildSetupScript(active), [active])

  function choose(key: string) {
    setProfile(key)
    setSelected(profiles[key].slugs)
    setCopyStatus("idle")
  }

  function toggle(slug: string) {
    setSelected((values) =>
      values.includes(slug) ? values.filter((value) => value !== slug) : [...values, slug]
    )
    setCopyStatus("idle")
  }

  async function copyScript() {
    setCopyStatus((await copyText(script)) ? "copied" : "error")
  }

  function download() {
    const url = URL.createObjectURL(new Blob([script], { type: "text/x-shellscript" }))
    const link = document.createElement("a")
    link.href = url
    link.download = `alloy-${profile}-setup.sh`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  if (!profile) {
    return (
      <div>
        <div className="mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="grid size-5 place-items-center rounded border border-border bg-card font-mono text-[11px] font-bold text-foreground">
            1
          </span>
          Select an engineering profile
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(profiles).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => choose(key)}
              className="group rounded-xl border border-border bg-card p-5 text-left transition hover:border-zinc-700"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  {key}
                </span>
                <ChevronRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h2 className="mt-4 text-base font-semibold text-foreground">{item.label}</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
              <p className="mt-4 font-mono text-xs text-amber-500">
                {item.slugs.filter((slug) => tools.some((tool) => tool.slug === slug)).length} curated packages
              </p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-500">
            Selected Profile
          </p>
          <h2 className="mt-1 text-xl font-semibold">{profiles[profile].label}</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setProfile(null)
            setSelected([])
            setCopyStatus("idle")
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground transition hover:border-zinc-700 hover:text-foreground"
        >
          <RotateCcw className="size-3.5" /> Change profile
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs">
            <p className="text-muted-foreground">
              {active.length} of {recommendations.length} packages included
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelected(recommendations.map((tool) => tool.slug))
                  setCopyStatus("idle")
                }}
                disabled={active.length === recommendations.length}
                className="text-zinc-400 hover:text-foreground disabled:opacity-40 transition"
              >
                Select all
              </button>
              <span className="text-zinc-700">|</span>
              <button
                type="button"
                onClick={() => {
                  setSelected([])
                  setCopyStatus("idle")
                }}
                disabled={!active.length}
                className="text-zinc-400 hover:text-foreground disabled:opacity-40 transition"
              >
                Deselect all
              </button>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {recommendations.map((tool) => {
              const checked = selected.includes(tool.slug)
              return (
                <button
                  key={tool.slug}
                  type="button"
                  aria-pressed={checked}
                  onClick={() => toggle(tool.slug)}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${
                    checked
                      ? "border-amber-500/50 bg-amber-500/5"
                      : "border-border bg-card/60 opacity-60 hover:opacity-100 hover:border-zinc-700"
                  }`}
                >
                  <BrandMark name={tool.name} logo={tool.logo} className="size-9 rounded-lg text-xs" />
                  <span className="min-w-0 flex-1">
                    <strong className="block text-sm font-semibold">{tool.name}</strong>
                    <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                      {tool.description}
                    </span>
                    {tool.installKind === "manual" && (
                      <span className="mt-1.5 inline-block font-mono text-[10px] uppercase tracking-wider text-amber-500">
                        Manual package
                      </span>
                    )}
                  </span>
                  <span
                    className={`grid size-4 shrink-0 place-items-center rounded border transition ${
                      checked
                        ? "border-amber-500 bg-amber-500 text-black font-bold"
                        : "border-zinc-700 bg-zinc-800"
                    }`}
                  >
                    {checked && <Check className="size-3" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-xl border border-border bg-[#090a0d] shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 font-mono text-xs text-zinc-400">
              <span className="flex items-center gap-2">
                <Terminal className="size-3.5 text-amber-500" />
                <span>{active.length} packages queued</span>
              </span>
              <span className="text-[11px] text-zinc-500">alloy-setup.sh</span>
            </div>
            <pre className="max-h-[26rem] overflow-auto p-4 font-mono text-xs leading-relaxed text-zinc-300">
              <code>{script}</code>
            </pre>
            <div className="grid gap-2 border-t border-zinc-800 p-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={!active.length}
                onClick={copyScript}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-foreground font-mono text-xs font-semibold uppercase tracking-wider text-background transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Copy className="size-3.5" /> {copyStatus === "copied" ? "Copied" : "Copy script"}
              </button>
              <button
                type="button"
                disabled={!active.length}
                onClick={download}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-card font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 transition hover:border-zinc-700 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download className="size-3.5" /> Download .sh
              </button>
            </div>
          </div>
          {copyStatus === "error" && (
            <p role="status" className="mt-2 text-xs text-rose-400 font-mono">
              Clipboard unavailable. Download the script or select text manually.
            </p>
          )}
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground font-mono">
            Review instructions before execution. Never run uninspected shell scripts with elevated privileges.
          </p>
        </div>
      </div>
    </div>
  )
}
