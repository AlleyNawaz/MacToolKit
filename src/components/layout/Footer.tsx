import Link from "next/link"
import { AlloyMark } from "@/components/brand/AlloyLogo"

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-semibold">
            <span className="grid size-6 place-items-center rounded border border-white/10 bg-zinc-900 text-zinc-100">
              <AlloyMark className="size-3.5" />
            </span>
            <span className="font-mono text-sm tracking-wider uppercase">Alloy</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            A fast, keyboard-first index of verified tools, package managers, and command-line utilities for macOS.
          </p>
        </div>
        <div><p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">Catalogue</p><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><Link href="/tools" className="hover:text-foreground">All tools</Link><Link href="/categories" className="hover:text-foreground">Categories</Link><Link href="/setup" className="hover:text-foreground">Setup wizard</Link></div></div>
        <div><p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">Resources</p><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><Link href="/guides" className="hover:text-foreground">Setup guides</Link><Link href="/compare" className="hover:text-foreground">Comparisons</Link><Link href="/favorites" className="hover:text-foreground">Saved tools</Link></div></div>
      </div>
      <div className="border-t border-border/40 py-5 text-center font-mono text-xs text-muted-foreground">
        Alloy macOS Index · Open-source and community verified
      </div>
    </footer>
  )
}
