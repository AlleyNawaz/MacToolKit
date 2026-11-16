# ALLOY Design System (MASTER.md)

**Aesthetic**: macOS Native Utility & Editorial Index  
**Inspiration**: Linear, Raycast, Panic, Craft, Apple Developer Documentation  
**Version**: 2.0.0 (Titanium Edition)

---

## 1. Brand Identity

- **Name**: **Alloy**
- **Descriptor**: The macOS Developer Index
- **Positioning**: A fast, keyboard-first catalogue of developer tools, command-line utilities, and system software for macOS.
- **Logomark**: A precision geometric glyph formed from two intersecting 45° titanium facets with a single coordinate apex. Minimal, tactile, vector-crisp.
- **Tone of Voice**: Deadpan, utility-first, technical, authoritative. Zero SaaS fluff, zero marketing cheerleading, zero empty superlatives.

---

## 2. Color Palette & Surfaces

Monochrome Apple Titanium & Graphite with surgical warm amber accents.

### Dark Theme (Default)
| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg-base` | `#08090b` | Viewport ground (deep obsidian) |
| `--bg-surface` | `#0e1116` | Container panels, list groups, header |
| `--bg-elevated` | `#151921` | Active items, search inputs, modal sheets |
| `--bg-hover` | `#1a202a` | Hover states, table row hover |
| `--border-hairline` | `rgba(255, 255, 255, 0.08)` | 1px precision separation lines |
| `--border-focus` | `rgba(245, 158, 11, 0.60)` | Active focus indicators |
| `--text-primary` | `#f4f4f5` (Zinc 100) | Primary titles, active tool names |
| `--text-secondary` | `#a1a1aa` (Zinc 400) | Descriptions, metadata labels |
| `--text-muted` | `#71717a` (Zinc 500) | Timestamps, shortcuts, inactive tags |
| `--accent-amber` | `#f59e0b` (Amber 500) | Terminal prompt `$`, active tabs, copy confirmation |
| `--accent-amber-subtle` | `rgba(245, 158, 11, 0.12)` | Active pill fills, focus rings |

### Light Theme
| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg-base` | `#fbfbfd` | Viewport ground (Apple off-white) |
| `--bg-surface` | `#ffffff` | Clean white cards and panels |
| `--bg-elevated` | `#f4f4f6` | Form inputs, inactive pills |
| `--border-hairline` | `rgba(0, 0, 0, 0.08)` | Hairline dividers |
| `--text-primary` | `#09090b` (Zinc 950) | High-contrast copy |
| `--text-secondary` | `#52525b` (Zinc 600) | Technical copy |

---

## 3. Typography Scale

- **Sans Stack**: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif`
- **Mono Stack**: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`
- **Sizing Hierarchy**:
  - `Hero Title`: 2.5rem (40px) to 3.25rem (52px), weight 600, tracking -0.035em. No rainbow gradients. Solid Zinc 100.
  - `Section Heading`: 1.25rem (20px) to 1.5rem (24px), weight 600, tracking -0.02em.
  - `Body Copy`: 0.875rem (14px) / 1.5rem (24px) leading.
  - `Tabular Code / Commands`: 0.8125rem (13px), weight 500, `SF Mono`.
  - `Micro-Labels`: 0.6875rem (11px), tracking 0.04em, weight 600, uppercase mono.

---

## 4. Geometry & Radii

Goodbye to bubbly 24px+ `rounded-3xl` cards. Precision geometry:
- **Small components (pills, badges, buttons, kbd)**: `rounded-md` (6px) or `rounded-lg` (8px).
- **Cards, tables, search containers**: `rounded-xl` (12px) to `rounded-2xl` (16px).
- **Hairlines**: Strict 1px hairline (`border border-white/10`).
- **Shadows**: Restrained ambient occlusion (`0 1px 2px rgba(0,0,0,0.4)`). Zero neon blur blobs or colored outer glows.

---

## 5. Interaction Model

- **Instant Launcher Hero**: The landing page is a keyboard-driven directory. A tactile search input with command palette mechanics (`⌘K`, category chips, instant matching) sits immediately above the catalog.
- **Copy Actions**: Clickable commands flash an amber checkmark with audio-tactile visual feedback for 1200ms.
- **Layout Rhythm**:
  - High-density directory table view with inline install commands and metadata.
  - Asymmetric bento architecture for guides and category clusters.
  - High-efficiency two-column specification sheets on tool detail pages.
