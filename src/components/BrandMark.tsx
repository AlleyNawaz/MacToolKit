"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function BrandMark({ name, logo, className }: { name: string; logo?: string; className?: string }) {
  const [imageError, setImageError] = useState(false)
  const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()
  const isImageLogo = Boolean(logo && (logo.startsWith("http") || logo.startsWith("/")) && !imageError)

  if (isImageLogo) {
    return (
      <span className={cn("grid shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-card p-1 shadow-sm", className)} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          loading="lazy"
          className="size-full rounded-lg object-contain p-0.5"
          onError={() => setImageError(true)}
        />
      </span>
    )
  }

  return (
    <span className={cn("grid shrink-0 place-items-center rounded-xl border border-zinc-800 bg-zinc-900 font-mono font-semibold text-zinc-300 shadow-sm", className)} aria-hidden="true">
      {initials}
    </span>
  )
}
