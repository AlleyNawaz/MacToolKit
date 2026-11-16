"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { copyText } from "@/lib/clipboard"

export function CommandCopy({ command, kind = "command" }: { command: string; kind?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")

  useEffect(() => {
    if (status === "idle") return
    const timer = window.setTimeout(() => setStatus("idle"), 2500)
    return () => window.clearTimeout(timer)
  }, [status])

  if (kind === "manual") {
    return (
      <div className="rounded-xl border border-border bg-[#090a0d] p-4">
        <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-amber-500/90">Manual instruction</p>
        <p className="mt-2 text-sm leading-6 text-zinc-200">{command}</p>
      </div>
    )
  }

  async function handleCopy() {
    setStatus((await copyText(command)) ? "copied" : "error")
  }

  return (
    <div className="rounded-xl border border-border bg-[#090a0d] p-4 text-zinc-100">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">Terminal command</span>
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-medium transition ${
            status === "copied"
              ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
              : "border-zinc-700/80 bg-zinc-800/80 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-700 hover:text-white"
          }`}
          aria-label="Copy terminal command"
        >
          {status === "copied" ? <Check className="size-3.5 text-amber-400" /> : <Copy className="size-3.5" />}
          {status === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      <code className="block overflow-x-auto whitespace-pre-wrap break-all font-mono text-sm leading-relaxed text-zinc-200">{command}</code>
      {status === "error" && <p role="status" className="mt-2 text-xs text-rose-400">Clipboard unavailable. Select command manually.</p>}
    </div>
  )
}
