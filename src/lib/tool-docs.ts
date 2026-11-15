export interface ToolBenefit {
  title: string
  description: string
}

export interface ToolStep {
  step: number
  title: string
  description: string
}

export interface ToolDocumentation {
  overview: string
  installation: string
  benefits: ToolBenefit[]
  howToUse: ToolStep[]
  features: string[]
  proTips: string[]
  bestFor: string
  macOSIntegration: string
}

type ToolInput = {
  name: string
  slug: string
  description: string
  categorySlug: string
  installKind?: string
  command?: string
  installCommand?: string
  tags?: string[]
  domain?: string
}

const customDocs: Record<string, Partial<ToolDocumentation>> = {
  "adobe-creative-cloud": {
    overview: "Adobe Creative Cloud is the industry-standard creative ecosystem for macOS, uniting industry-defining tools like Photoshop, Illustrator, Premiere Pro, After Effects, and InDesign. Built with deep Apple Silicon optimization, it powers creative professionals worldwide with unified asset libraries and cloud synchronization.",
    benefits: [
      { title: "Industry-Standard Interoperability", description: "Seamlessly exchange assets between Photoshop, Illustrator, and After Effects with shared smart objects and cloud libraries." },
      { title: "Apple Silicon Metal Acceleration", description: "Takes full advantage of macOS Metal GPU rendering and Apple's unified memory for lightning-fast filter rendering and real-time video playback." },
      { title: "Adobe Fonts & Asset Sync", description: "Instantly activate thousands of high-quality typography styles across your entire macOS system and sync project assets across Mac and iPad." },
      { title: "Collaborative Team Workflows", description: "Share live review links, collaborate on cloud documents with version histories, and hand off assets to developers effortlessly." },
    ],
    howToUse: [
      { step: 1, title: "Install the Creative Cloud Desktop App", description: "Run the suggested Homebrew cask or download the official installer. Launch the app and sign in with your Adobe ID." },
      { step: 2, title: "Install Your Creative Suite Apps", description: "From the Apps tab, select and install the applications you need (Photoshop, Illustrator, Premiere Pro, etc.)." },
      { step: 3, title: "Activate Fonts & Connect Libraries", description: "Browse Adobe Fonts in the sidebar to activate typefaces globally on macOS, and organize client assets into CC Libraries." },
      { step: 4, title: "Tune Performance & Scratch Disks", description: "In application preferences, configure dedicated APFS volumes for scratch disks and allocate optimal RAM for rendering." },
    ],
    features: [
      "Native Apple Silicon (M1/M2/M3/M4) universal binaries",
      "Adobe Sensei AI-powered masking, neural filters, and generative fills",
      "System-wide Adobe Fonts activation without manual font file management",
      "Dynamic Link between Premiere Pro and After Effects without intermediate rendering",
      "Automatic cloud document versioning and collaborative review links",
    ],
    proTips: [
      "Set a secondary APFS volume or fast external Thunderbolt SSD as your scratch disk in Photoshop to keep your primary system drive fast.",
      "Use Creative Cloud Libraries to sync brand color swatches, vector logos, and text styles across your entire team.",
      "Manage app background updates in Creative Cloud Settings to prevent unexpected updates during active client deadlines.",
    ],
    bestFor: "Graphic designers, video editors, illustrators, photographers, and multidisciplinary creative studios.",
    macOSIntegration: "Full Apple Silicon Metal acceleration, Touch Bar and trackpad gesture support, native dark mode, and macOS ColorSync color calibration.",
  },
  "cleanshot": {
    overview: "CleanShot X is the quintessential screen capture, annotation, and video recording tool designed exclusively for macOS. It replaces the default Mac screenshot utility with a floating thumbnail overlay, scroll capture, built-in cloud upload, and instant OCR text recognition.",
    benefits: [
      { title: "Surgical Screen Capture", description: "Capture windows with transparent or custom backgrounds, grab full-page scrolling websites, and capture specific screen regions with pixel precision." },
      { title: "Instant Annotation & Redaction", description: "Highlight key UI elements with numbers, draw arrows, add sleek background padding, and blur confidential credentials or sensitive info in seconds." },
      { title: "Built-In Screen Recording", description: "Record crisp 60 FPS video or animated GIFs with webcam overlays, microphone audio, and animated keystroke visualizations." },
      { title: "Local OCR Text Recognition", description: "Instantly copy unselectable text from videos, images, or protected web pages right onto your clipboard with on-device OCR." },
    ],
    howToUse: [
      { step: 1, title: "Install and Grant Screen Recording Permissions", description: "Install CleanShot X and grant Screen Recording and Accessibility permissions in macOS System Settings." },
      { step: 2, title: "Replace System Shortcuts", description: "Configure CleanShot X to replace default Mac shortcuts (⌘+Shift+4 for Area, ⌘+Shift+5 for Video/Scrolling)." },
      { step: 3, title: "Capture & Annotate", description: "Trigger your capture shortcut, use the Quick Access Overlay to annotate with arrows and blur, and copy directly to your clipboard." },
      { step: 4, title: "Pin & Share", description: "Pin screenshots as floating windows on your display for visual reference, or upload to CleanShot Cloud with a short link." },
    ],
    features: [
      "Pixel-perfect scrolling screenshot capture for long web pages and chat logs",
      "Quick Access Overlay thumbnail with 1-click drag and drop into Slack, Notion, or Mail",
      "Smart text recognition (OCR) that works 100% offline",
      "Sleek customizable background padding for social media and documentation mockups",
      "Audio and microphone capture with automated webcam overlay positioning",
    ],
    proTips: [
      "Hold Space after making a selection to move the capture rectangle before releasing.",
      "Use 'Pin to Screen' to keep references or color codes floating on top while you design or code.",
      "Enable auto-copy to clipboard so screenshots are instantly ready to paste into chat.",
    ],
    bestFor: "Developers, technical writers, designers, and remote professionals who frequently communicate visually.",
    macOSIntegration: "Menu bar extra, custom macOS keyboard shortcuts, native Retina display rendering, and deep integration with the macOS Share Sheet.",
  },
  "ghostty": {
    overview: "Ghostty is a groundbreaking, GPU-accelerated terminal emulator developed by Mitchell Hashimoto. Built natively for macOS using Zig and Swift, it combines blistering render performance with native tabs, split panes, and zero-compromise typography.",
    benefits: [
      { title: "GPU-Accelerated Rendering", description: "Renders complex text, animations, and heavy output using Metal shaders for ultra-low latency and battery-friendly operation." },
      { title: "Native macOS Look & Feel", description: "Features native macOS window chrome, translucent materials, system tabs, and proper keyboard navigation without Electron bloat." },
      { title: "Deep Feature Set", description: "Built-in split panes, modern terminal graphics protocols (Kitty/Sixel), true color support, and rich custom keybinding engines." },
      { title: "Seamless Font Rendering", description: "Crisp ligatures, box-drawing characters, and powerline glyph support out of the box with custom line spacing controls." },
    ],
    howToUse: [
      { step: 1, title: "Install Ghostty", description: "Run `brew install --cask ghostty` or grab the universal binary. Move it to `/Applications` and launch." },
      { step: 2, title: "Configure Your Settings", description: "Ghostty stores its config at `~/.config/ghostty/config`. Set your favorite theme, font size, and background blur." },
      { step: 3, title: "Navigate Split Panes", description: "Use `⌘+D` and `⌘+Shift+D` to split your terminal vertically or horizontally, and `⌘+[` / `⌘+]` to navigate panes." },
      { step: 4, title: "Integrate with Shell Tools", description: "Combine with zsh, tmux, starship, and fzf for an unbeatable command-line development environment." },
    ],
    features: [
      "Hardware-accelerated rendering powered by Apple Metal",
      "Native macOS tab bar and split pane management",
      "TrueColor (24-bit) color rendering and modern terminal image protocols",
      "Clean declarative plain-text configuration file",
      "Lightning-fast cold start times (<50ms)",
    ],
    proTips: [
      "Add `theme = dark:catppuccin-mocha,light:catppuccin-latte` to automatically switch themes with macOS system dark mode.",
      "Hold Option to make block selections across split panes.",
      "Use `macos-titlebar-style = transparent` for a modern, bezel-less window appearance.",
    ],
    bestFor: "Software developers, DevOps engineers, and system administrators looking for maximum terminal responsiveness.",
    macOSIntegration: "Native AppKit/SwiftUI controls, Metal rendering backend, native tabs, macOS keyboard shortcuts, and full Apple Silicon optimization.",
  },
  "optpaste": {
    overview: "OptPaste is a lightweight, open-source clipboard history manager for Mac. Triggered with a simple Option+V keystroke, it provides instant keyboard-navigable search across copied texts, links, code snippets, and images with military-grade AES-256 local disk encryption.",
    benefits: [
      { title: "Instant Option+V Access", description: "Summon your entire clipboard history with a single, memorable key combination without leaving your active app." },
      { title: "Local AES-256 Encryption", description: "Your copied data never touches the cloud; all saved history is encrypted on your local drive with AES-256-GCM." },
      { title: "Smart Privacy Filters", description: "Automatically detects and suppresses passwords from 1Password, Bitwarden, and Apple Keychain to prevent credential leaks." },
      { title: "Keyboard-First Speed", description: "Navigate with Arrow keys, filter with instant search, and paste plain text with Shift+Enter." },
    ],
    howToUse: [
      { step: 1, title: "Launch and Grant Accessibility", description: "Install OptPaste and grant Accessibility permissions in System Settings → Privacy & Security so it can paste into active windows." },
      { step: 2, title: "Copy As You Normally Do", description: "Copy text, code snippets, URLs, and screenshots as you browse and code. OptPaste quietly tracks them in the background." },
      { step: 3, title: "Trigger With Option+V", description: "Press `Option + V` in any application to pop up the clipboard search window." },
      { step: 4, title: "Search and Paste", description: "Type a few letters to filter your history, press `Enter` to paste, or `Shift+Enter` to paste stripped plain text." },
    ],
    features: [
      "Dedicated Option+V hotkey with global summoning",
      "Support for plain text, rich text, code snippets, images, and file paths",
      "Local AES-256-GCM encryption on disk",
      "Password manager integration that ignores confidential clipboard writes",
      "Pin favorite snippets to the top for quick recurring access",
    ],
    proTips: [
      "Press `Shift+Enter` to paste without formatting, stripping unwanted CSS and styles when writing in Google Docs or Notion.",
      "Pin your SSH keys, meeting links, or boilerplate code snippets so they never drop out of your clipboard history.",
      "Configure history retention limits (e.g. 7 days or 30 days) to match your workflow preferences.",
    ],
    bestFor: "Developers, writers, and anyone who copies and pastes multiple pieces of information throughout the day.",
    macOSIntegration: "Lightweight background daemon, native macOS pasteboard monitoring, Accessibility API integration, and menu bar access.",
  },
  "costdoctor": {
    overview: "CostDoctor is a specialized Mac menu bar utility created for developers working with AI coding agents like Claude Code, Codex, and Cursor. It tracks token usage, calculates real-time API spend, warns about session bloat, and alerts you before runaway loops burn through token quotas.",
    benefits: [
      { title: "Real-Time AI Spending Visibility", description: "Know exactly what your autonomous coding sessions are costing in real time directly from your menu bar." },
      { title: "Session Bloat Detection", description: "Pinpoint when conversation context is getting too heavy and receive actionable advice on when to compact or restart sessions." },
      { title: "Runaway Agent Safeguards", description: "Set spending caps and get visual alerts when an autonomous agent enters an expensive retry loop or build cycle." },
      { title: "Multi-Model Forecasting", description: "Compare cost forecasts across Claude 3.5 Sonnet, Opus, GPT-4o, and Gemini models for complex refactoring tasks." },
    ],
    howToUse: [
      { step: 1, title: "Install CostDoctor & CLI", description: "Install the menu bar app or run `brew install costdoctor` for terminal integration." },
      { step: 2, title: "Connect Coding Agent Logs", description: "Point CostDoctor to your Claude Code, Codex, or local agent session directories." },
      { step: 3, title: "Set Daily & Session Budgets", description: "Establish budget thresholds and notification limits in the menu bar preferences." },
      { step: 4, title: "Monitor Active Sessions", description: "Glance at the menu bar icon while agents run; click to see a breakdown of input tokens, output tokens, and cost per turn." },
    ],
    features: [
      "Live menu bar ticker showing active session cost in USD",
      "Context window visualization to spot context bloat before it degrades model quality",
      "Visual full-screen flash alerts when build checks or spend thresholds fail",
      "Exportable session summaries for client billing and expense reports",
      "Companion CLI utility `costdoctor` for terminal workflows",
    ],
    proTips: [
      "Use CostDoctor's compact recommendation whenever context exceeds 60% of model limits to save up to 40% on token costs.",
      "Configure red screen alerts during headless agent tasks so you catch infinite loops even when working in another window.",
      "Review the weekly spending breakdown to see which projects generate the highest AI development costs.",
    ],
    bestFor: "Software engineers and agencies deploying agentic AI coding assistants like Claude Code, Codex, and Cursor.",
    macOSIntegration: "Menu bar extra with dynamic status text, system notifications, Terminal/shell integration, and launch-at-login support.",
  },
  "siftmac": {
    overview: "SiftMac is a thoughtful, privacy-focused macOS disk cleaner and system maintenance utility. Instead of opaque '1-click clean' buttons that risk deleting critical files, SiftMac provides clear plain-language verdicts for every file and holds un-rebuildable deleted items in a 7-day safe undo shelf.",
    benefits: [
      { title: "Plain-Language Verdicts", description: "Understand exactly what each cache, log, and leftover file does before choosing whether to clean it." },
      { title: "7-Day Safety Undo Shelf", description: "Never worry about accidentally breaking an app; deleted files are staged in an undo shelf for 7 days before permanent removal." },
      { title: "Developer Cache Intelligence", description: "Specialized cleanups for Docker images, Xcode derived data, Node modules, package manager caches, and stale simulator runtimes." },
      { title: "Zero Telemetry & 100% Local", description: "Operates completely on your machine without background tracking, account requirements, or data collection." },
    ],
    howToUse: [
      { step: 1, title: "Download & Open SiftMac", description: "Download the signed DMG from siftmac.com and move SiftMac to your Applications folder." },
      { step: 2, title: "Scan Your Mac", description: "Click Scan to analyze disk space across system caches, user logs, development folders, and leftover app dependencies." },
      { step: 3, title: "Review Verdicts", description: "Browse categorized items. Each item explains whether it is safe to remove, how it was created, and whether it can regenerate automatically." },
      { step: 4, title: "Clean with Confidence", description: "Confirm cleanup. Items are staged safely so you can restore them anytime within 7 days if needed." },
    ],
    features: [
      "Intelligent rule engine covering 60+ common macOS application and system cache paths",
      "Dedicated developer presets for node_modules, cargo, gradle, and Xcode derived data",
      "7-day staged recovery shelf for complete peace of mind",
      "Interactive storage treemap showing the largest folders on your internal SSD",
      "Zero background daemon consumption when the application is closed",
    ],
    proTips: [
      "Run SiftMac right after major Xcode or operating system updates to reclaim 20–50 GB of stale simulators and update caches.",
      "Check the 'Rebuildable' tag—files marked rebuildable can be cleared safely without any risk to your configurations.",
      "Use the 'Older than 30 days' filter to clean only stale project dependencies while preserving active workflows.",
    ],
    bestFor: "Developers and power users who want a clean, fast Mac without risking system corruption from aggressive cleaner tools.",
    macOSIntegration: "Native Swift/SwiftUI interface, APFS fast cloning for instant undo staging, and sandboxed disk access.",
  },
  "notchnook": {
    overview: "NotchNook is a transformative macOS utility that turns the camera notch on modern MacBooks into an interactive, functional Dynamic Island. It houses media playback controls, drag-and-drop file shelves, notes, and quick widgets directly inside your screen's notch.",
    benefits: [
      { title: "Transforms Wasted Screen Space", description: "Converts the dead black notch space into a fluid, responsive command center that expands on hover or click." },
      { title: "Interactive Media Player", description: "Control Spotify, Apple Music, or YouTube playback with album art, scrub bars, and playback buttons right in the notch." },
      { title: "Drag-and-Drop File Trays", description: "Drop files, screenshots, and links directly onto the notch to hold them temporarily while switching between spaces and apps." },
      { title: "Customizable Widgets", description: "Add calendar reminders, quick notes, timers, battery levels, and shortcuts tailored to your daily workflow." },
    ],
    howToUse: [
      { step: 1, title: "Install NotchNook", description: "Download and install NotchNook. Grant Accessibility permissions when prompted." },
      { step: 2, title: "Hover to Reveal", description: "Move your mouse cursor to the camera notch at the top of your display to smoothly expand the Nook interface." },
      { step: 3, title: "Drop Files or Control Media", description: "Drag any file onto the notch to store it in the Tray, or control your music while you work." },
      { step: 4, title: "Customize Layouts", description: "Open NotchNook preferences to choose which widgets appear and configure gestures and sensitivity." },
    ],
    features: [
      "Smooth physics-based notch expansion and contraction animations",
      "Universal media player supporting Spotify, Apple Music, and web browsers",
      "Temporary file tray for seamless drag-and-drop between full-screen workspaces",
      "Quick notes and clipboard history shelf built into the notch header",
      "Full support for external displays and notchless Mac monitors via floating pill mode",
    ],
    proTips: [
      "Use the notch tray when dragging files from Finder to full-screen browser tabs or Slack channels.",
      "If you use an external monitor, enable 'Floating Island' mode to enjoy the same functionality on non-notch screens.",
      "Customize hover delay in Settings to ensure NotchNook expands only when intentionally hovering over the notch area.",
    ],
    bestFor: "MacBook Air and MacBook Pro users looking to make their camera notch practical, elegant, and productive.",
    macOSIntegration: "Seamless alignment with MacBook screen notches, native Now Playing integration, and CoreAnimation physics.",
  },
  "homebrew": {
    overview: "Homebrew is the foundational package manager for macOS. Known as 'The Missing Package Manager for macOS', it allows developers to install, update, and manage thousands of command-line tools, programming runtimes, and GUI desktop applications with single terminal commands.",
    benefits: [
      { title: "Universal Software Management", description: "Install development compilers, runtimes (Node, Python, Go), utilities (git, fzf), and full applications (VS Code, Chrome) with one consistent command syntax." },
      { title: "Apple Silicon & Intel Native", description: "Maintains dedicated optimized formula bottles compiled specifically for Apple Silicon ARM64 (`/opt/homebrew`) and Intel x86_64 (`/usr/local`)." },
      { title: "Dependency Resolution & Versioning", description: "Automatically tracks and resolves shared libraries, system dependencies, and compiler toolchains without conflicting with system libraries." },
      { title: "Effortless System Updates", description: "Update your entire developer toolchain and all installed applications in one step using `brew update && brew upgrade`." },
    ],
    howToUse: [
      { step: 1, title: "Bootstrap Homebrew", description: "Run `/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"` in your terminal." },
      { step: 2, title: "Configure Shell Environment", description: "Add Homebrew to your PATH by adding `eval \"$(/opt/homebrew/bin/brew shellenv)\"` to your `~/.zprofile`." },
      { step: 3, title: "Install CLI Tools & Casks", description: "Use `brew install <tool>` for CLI programs (e.g. `brew install git`) and `brew install --cask <app>` for GUI applications (e.g. `brew install --cask raycast`)." },
      { step: 4, title: "Maintain Your Setup", description: "Run `brew doctor` to check your setup health, and `brew cleanup` to clear stale download caches." },
    ],
    features: [
      "Massive repository of over 7,000+ formula and 4,000+ GUI cask applications",
      "Formula sandboxing and isolated installation in the Cellar",
      "Homebrew Bundle (`Brewfile`) support to replicate your entire Mac setup with one command",
      "Official and community third-party taps for specialized software distribution",
      "Fast pre-compiled binary bottles for near-instant package installation",
    ],
    proTips: [
      "Create a `Brewfile` by running `brew bundle dump` to backup your entire software stack to version control.",
      "Use `brew cleanup -s` periodically to purge old package versions and free up gigabytes of disk space in your Homebrew cache.",
      "Run `brew outdated` before upgrading to see exactly which tools have pending updates.",
    ],
    bestFor: "Every software developer, engineer, and technical user setting up and managing a Mac.",
    macOSIntegration: "Deep integration with Xcode Command Line Tools, macOS zsh shell, APFS symlinking, and quarantine attribute handling.",
  },
  "raycast": {
    overview: "Raycast is a blazingly fast, highly extensible launcher and productivity tool for macOS. Designed as a modern replacement for Spotlight and Alfred, it allows developers and power users to control tools, run scripts, manage windows, search documentation, and automate workflows in milliseconds.",
    benefits: [
      { title: "Blistering Speed & Extensibility", description: "Native Swift and React architecture that opens instantly and features an extensive ecosystem of community extensions." },
      { title: "Built-In Power Utilities", description: "Includes clipboard history, window management, system commands, snippet expansions, and floating notes out of the box." },
      { title: "Developer Integrations", description: "Search GitHub PRs, inspect Jira issues, toggle Linear tasks, manage Docker containers, and trigger CI workflows without leaving your keyboard." },
      { title: "Integrated AI Assistant", description: "Chat with leading LLMs (Claude 3.5 Sonnet, GPT-4o, Perplexity) directly from your launcher to draft text, explain code, or query data." },
    ],
    howToUse: [
      { step: 1, title: "Install & Replace Spotlight", description: "Install via `brew install --cask raycast`. In System Settings, disable the default ⌘+Space shortcut for Spotlight and assign it to Raycast." },
      { step: 2, title: "Explore Core Features", description: "Press ⌘+Space and type 'Clipboard History', 'Window Management', or 'Snippets' to explore built-in utilities." },
      { step: 3, title: "Install Community Extensions", description: "Browse the Raycast Store (`Store` command) to install integrations for GitHub, Notion, Spotify, Linear, and Docker." },
      { step: 4, title: "Assign Custom Hotkeys & Aliases", description: "Configure custom aliases or hotkeys (e.g. `gc` for GitHub, `ch` for Clipboard History) for instant muscle memory access." },
    ],
    features: [
      "Instant native search across applications, files, system settings, and contacts",
      "Rich developer extension API built with TypeScript and React",
      "Powerful clipboard history manager with image previews and text filters",
      "Snappy window tiling with hotkeys (left half, right half, maximize, center)",
      "Text snippets with dynamic placeholders, dates, and clipboard insertion",
    ],
    proTips: [
      "Assign direct hotkeys to your most frequent commands in Raycast Settings → Extensions (e.g. ⌥+V for Clipboard History).",
      "Use Quicklinks with argument tokens (e.g. `gh {repo}`) to jump straight to GitHub repositories from your search bar.",
      "Write your own Raycast Script Commands in Bash, Python, or Node.js for custom personal automations.",
    ],
    bestFor: "Developers, power users, and knowledge workers who want to maximize keyboard efficiency across macOS.",
    macOSIntegration: "Native Swift architecture, dark mode, Accessibility API integration, system audio/brightness controls, and Apple Silicon optimization.",
  },
}

const categoryTemplates: Record<string, {
  benefitThemes: Array<{ title: string; description: string }>
  workflowSteps: Array<{ title: string; description: string }>
  featurePool: string[]
  proTipPool: string[]
  bestFor: string
  macOSIntegration: string
}> = {
  "terminal-tools": {
    benefitThemes: [
      { title: "Command-Line Efficiency", description: "Optimized for low-latency terminal rendering, rapid keyboard navigation, and fast feedback loops." },
      { title: "Workflow Customization", description: "Easily configurable via dotfiles, configuration scripts, and themes to match your development habits." },
      { title: "Shell & Multiplexer Synergy", description: "Integrates cleanly with zsh, bash, tmux, and modern developer CLI tools for seamless multi-tasking." },
      { title: "Apple Silicon Performance", description: "Runs natively on Apple Silicon with minimal CPU overhead and maximum battery longevity." },
    ],
    workflowSteps: [
      { title: "Install & Shell Config", description: "Install via package manager or direct download, then verify execution in your active terminal." },
      { title: "Customize Aliases & Options", description: "Configure default flags, keybindings, and themes in your `~/.zshrc` or tool configuration file." },
      { title: "Integrate into Daily Workflows", description: "Incorporate into scripts, pipe outputs, and combine with text search or file pickers." },
      { title: "Review Status & Updates", description: "Periodically check installed versions and update through your package manager." },
    ],
    featurePool: [
      "Native Apple Silicon ARM64 and Intel x86_64 universal binary support",
      "Full ANSI, 24-bit TrueColor, and modern unicode character support",
      "Configurable keyboard shortcuts and keybind mappings",
      "Scriptable execution suitable for automated workflows and shell pipelines",
      "Lightweight memory footprint designed for continuous background operation",
    ],
    proTipPool: [
      "Create concise shell aliases in `~/.zshrc` to quickly trigger common flags and workflows.",
      "Pipe tool output into utilities like `fzf`, `jq`, or `less` for interactive data inspection.",
      "Check `man <tool>` or `--help` to discover built-in subcommands and performance flags.",
    ],
    bestFor: "Software developers, system administrators, and command-line power users.",
    macOSIntegration: "Native macOS terminal subsystem, zsh shell environment, and POSIX compliance.",
  },
  "code-editors": {
    benefitThemes: [
      { title: "Streamlined Coding Workflows", description: "Features intelligent code completion, lightning-fast syntax highlighting, and responsive navigation." },
      { title: "Extensible Ecosystem", description: "Customizable with themes, language servers, debuggers, and specialized developer extensions." },
      { title: "Version Control Integration", description: "Direct Git status visualizers, diff views, and branch management inside your editing canvas." },
      { title: "Hardware-Accelerated UI", description: "Optimized for macOS Retina displays with smooth scrolling and sharp font rendering." },
    ],
    workflowSteps: [
      { title: "Install & Setup CLI Launcher", description: "Install to `/Applications` and configure the command-line launcher for quick folder opening." },
      { title: "Install Language Extensions", description: "Add syntax highlighters, linters, and language servers for your primary tech stack." },
      { title: "Configure Hotkeys & Themes", description: "Set your favorite font, line height, keymap, and editor dark mode theme." },
      { title: "Code & Debug Efficiently", description: "Leverage multi-cursor editing, split views, and integrated terminal panels." },
    ],
    featurePool: [
      "Advanced Language Server Protocol (LSP) code intelligence and autocomplete",
      "Integrated terminal panels and side-by-side git diff inspection",
      "Extensive extension marketplace for languages, linters, and tools",
      "Multi-cursor editing, symbol search, and refactoring utilities",
      "Native macOS typography with font ligatures and subpixel antialiasing",
    ],
    proTipPool: [
      "Install the shell launcher command to open any project instantly from your terminal with `<editor> .`",
      "Learn the Command Palette shortcut (`⌘+Shift+P`) to trigger any editor command without reaching for your mouse.",
      "Configure project-specific workspaces to maintain tailored settings for each codebase.",
    ],
    bestFor: "Programmers, web developers, software engineers, and technical writers.",
    macOSIntegration: "Full Retina display rendering, native window tabs, system dark mode support, and keyboard shortcuts.",
  },
  "productivity-tools": {
    benefitThemes: [
      { title: "Time-Saving Automation", description: "Reduces repetitive manual tasks, saving keystrokes and context switches across apps." },
      { title: "Keyboard-First Ergonomics", description: "Keep your hands on the keyboard with fast hotkeys, quick search, and global actions." },
      { title: "System Resource Efficiency", description: "Engineered to run quietly in the background without draining your Mac's battery or memory." },
      { title: "Seamless App Switching", description: "Bridges apps and workspaces with clipboard sharing, window snapping, or quick staging." },
    ],
    workflowSteps: [
      { title: "Launch & Grant Permissions", description: "Open the app and grant Accessibility or Screen permissions if required for system controls." },
      { title: "Configure Global Hotkeys", description: "Assign comfortable, conflict-free hotkeys in preferences for instant summoning." },
      { title: "Enable Launch at Login", description: "Turn on launch at startup so your favorite utility is always running when you wake your Mac." },
      { title: "Master Essential Shortcuts", description: "Practice primary keyboard commands to turn repetitive clicks into fast muscle memory." },
    ],
    featurePool: [
      "Global menu bar and system-wide hotkey access",
      "Native macOS Dark Mode and dynamic interface themes",
      "Configurable startup options and launch-at-login support",
      "Low idle CPU consumption designed for all-day background use",
      "Quick search and keyboard-driven command execution",
    ],
    proTipPool: [
      "Set a dedicated global hotkey using Option or Command combinations for instant 1-finger summoning.",
      "Check the app settings to hide dock icons and keep your setup minimal in the menu bar.",
      "Review shortcut cheat sheets or settings regularly to discover overlooked power-user features.",
    ],
    bestFor: "Professionals, students, and power users seeking to maximize daily Mac efficiency.",
    macOSIntegration: "macOS Menu Bar extras, Accessibility APIs, global hotkey monitors, and Apple Silicon efficiency.",
  },
  "design-tools": {
    benefitThemes: [
      { title: "Pixel-Perfect Visual Quality", description: "High-fidelity rendering engines tailored for Retina displays, wide-gamut P3 color, and vector assets." },
      { title: "Accelerated Export Workflows", description: "Batch export assets in modern formats (SVG, WebP, AVIF, PNG) with automatic optimization." },
      { title: "Creative Flexibility", description: "Versatile canvases, layer management, and precision styling tools for digital creation." },
      { title: "Developer Handoff", description: "Easily inspect visual coordinates, color hex codes, dimensions, and typography specs." },
    ],
    workflowSteps: [
      { title: "Install & Setup Workspace", description: "Install the app and configure default canvas dimensions, color profiles, and units." },
      { title: "Configure Presets & Palettes", description: "Set up reusable styles, color swatches, and asset libraries for your visual projects." },
      { title: "Create & Iterate", description: "Use shortcut-driven tools to compose layouts, edit visuals, and refine details." },
      { title: "Export & Share", description: "Export optimized assets or generate shareable presentation links for feedback." },
    ],
    featurePool: [
      "Display P3 wide color gamut and macOS ColorSync color calibration",
      "Hardware-accelerated rendering utilizing Apple Metal and GPU shaders",
      "Multi-format export supporting PNG, JPG, WebP, SVG, and PDF",
      "Responsive zoom and smooth pan controls with trackpad gesture support",
      "Keyboard shortcuts aligned with professional creative software standards",
    ],
    proTipPool: [
      "Use Display P3 color spaces on modern MacBook displays for vibrant, true-to-life colors.",
      "Learn trackpad pinch-to-zoom and two-finger pan gestures for fluid navigation across large canvases.",
      "Set up automatic export presets to output multiple resolutions (@1x, @2x, @3x) simultaneously.",
    ],
    bestFor: "UI/UX designers, visual artists, content creators, and frontend developers.",
    macOSIntegration: "ColorSync color management, Metal graphics acceleration, trackpad gestures, and Retina optimization.",
  },
  "system-monitoring": {
    benefitThemes: [
      { title: "Hardware Transparency", description: "Gain instant visibility into CPU temperatures, memory pressure, battery cycles, and network bandwidth." },
      { title: "Identify Resource Hogs", description: "Spot rogue processes, runaway threads, or background daemons draining battery and thermals." },
      { title: "Glanceable Menu Bar Stats", description: "Monitor vital statistics without opening heavy Activity Monitor windows." },
      { title: "Hardware Longevity", description: "Maintain battery health and cooling efficiency with timely notifications." },
    ],
    workflowSteps: [
      { title: "Launch and Grant Monitoring Access", description: "Open the monitor and permit system statistics access in macOS preferences." },
      { title: "Select Menu Bar Modules", description: "Pick your preferred indicators (CPU graph, RAM percentage, network speed, battery life)." },
      { title: "Configure Alert Thresholds", description: "Set warnings for high memory pressure, elevated temperatures, or low battery." },
      { title: "Keep Active at Login", description: "Enable auto-launch to ensure stats are visible throughout your work sessions." },
    ],
    featurePool: [
      "Real-time CPU cluster and GPU core utilization monitoring",
      "Memory pressure tracking and swap space visualization",
      "Network upload/download speedometers and IP inspection",
      "Battery health, discharge rate, and cycle count reporting",
      "Low CPU overhead (<0.5%) for 24/7 background telemetry",
    ],
    proTipPool: [
      "Focus on macOS 'Memory Pressure' rather than raw RAM usage—green pressure means your Mac is performing optimally.",
      "Keep network throughput in the menu bar to instantly verify if uploads or downloads are stalling.",
      "Review high-temperature sensor readings when operating demanding builds or renders to ensure adequate cooling.",
    ],
    bestFor: "Developers, power users, and MacBook users focused on battery health and performance optimization.",
    macOSIntegration: "macOS Menu Bar extras, IOKit hardware sensor APIs, SMC thermal sensors, and Battery frameworks.",
  },
  "mac-optimization": {
    benefitThemes: [
      { title: "Reclaim Storage Capacity", description: "Quickly clear gigabytes of obsolete build caches, Xcode derived data, and system logs." },
      { title: "Clean App Uninstallation", description: "Remove residual application support files, preferences, and daemons when deleting apps." },
      { title: "Safe & Controlled Maintenance", description: "Maintain system stability with transparent file listings and undo safeguards." },
      { title: "Peak System Performance", description: "Prevent SSD fragmentation and slow search indexes by purging stale temporary assets." },
    ],
    workflowSteps: [
      { title: "Scan Disk Usage", description: "Run an initial scan to discover where storage is allocated across user and system caches." },
      { title: "Inspect Flagged Items", description: "Review categorized files to distinguish essential data from rebuildable caches." },
      { title: "Execute Safe Cleanup", description: "Confirm removal of selected items to instantly recover gigabytes of SSD space." },
      { title: "Repeat Periodically", description: "Schedule a monthly checkup to keep storage clean and system responsiveness high." },
    ],
    featurePool: [
      "Deep scan of application support, cache folders, and log directories",
      "Developer cache awareness (Xcode, Docker, Node.js, CocoaPods, Homebrew)",
      "Visual disk space breakdowns highlighting oversized files and folders",
      "Residual file cleaner when dragging apps to the macOS Trash",
      "Safe deletion protocols with staging or confirmation prompts",
    ],
    proTipPool: [
      "Always check the Xcode DerivedData folder if you develop iOS apps—it can easily consume 30+ GB over a few weeks.",
      "Use application cleaners rather than just dragging apps to the Trash to prevent orphaned background launch agents.",
      "Clear browser and simulator caches when testing responsive web apps to ensure accurate fresh-state rendering.",
    ],
    bestFor: "Anyone with limited SSD storage, active developers, and users maintaining clean macOS systems.",
    macOSIntegration: "APFS volume inspection, macOS Trash integration, Spotlight index rebuilding, and sandboxed file handling.",
  },
  "security-tools": {
    benefitThemes: [
      { title: "Proactive Threat Defense", description: "Monitor incoming and outgoing connections, persistence installers, and suspicious payloads." },
      { title: "Privacy Safeguards", description: "Block unwanted telemetry and prevent background apps from phoning home without permission." },
      { title: "Zero Performance Penalty", description: "Lightweight monitoring architecture that protects without slowing down compiles or system responsiveness." },
      { title: "Transparent Security Auditing", description: "Clear, understandable alerts detailing processes, remote IPs, and persistence mechanisms." },
    ],
    workflowSteps: [
      { title: "Install & Grant Network/System Extension", description: "Install and approve system network filter or full disk access extensions in macOS System Settings." },
      { title: "Establish Default Rules", description: "Configure default behavior (e.g. allow known system apps, prompt for new third-party connections)." },
      { title: "Review Real-Time Alerts", description: "Respond to notifications when an application attempts new network or background installation events." },
      { title: "Audit Rules Regularly", description: "Periodically inspect your active firewall rules and granted security permissions." },
    ],
    featurePool: [
      "Real-time process and network connection monitoring",
      "Rule-based per-application traffic filtering",
      "Persistence location tracking (LaunchDaemons, LaunchAgents, Login Items)",
      "Zero cloud reliance with 100% on-device decision logic",
      "Clean notification alerts with instant Allow or Block actions",
    ],
    proTipPool: [
      "Block outgoing telemetry on offline tools and media utilities to ensure complete personal data privacy.",
      "Check your Login Items and LaunchAgents periodically to ensure background tools aren't lingering after app uninstalls.",
      "Keep rules explicit rather than global to maintain full visibility over which apps access the internet.",
    ],
    bestFor: "Security-conscious developers, remote workers handling sensitive credentials, and privacy advocates.",
    macOSIntegration: "macOS Network Extension framework, EndpointSecurity APIs, system notifications, and Keychain access.",
  },
  "networking-tools": {
    benefitThemes: [
      { title: "Frictionless Connectivity", description: "Establish secure point-to-point tunnels, private mesh networks, or fast local sharing." },
      { title: "End-to-End Encryption", description: "Keep data encrypted in transit using industry-standard protocols like WireGuard and TLS 1.3." },
      { title: "Cross-Platform Interoperability", description: "Seamlessly connect your Mac with Linux servers, Windows workstations, and mobile devices." },
      { title: "Effortless Remote Development", description: "Access local dev servers, databases, and desktop displays securely from anywhere." },
    ],
    workflowSteps: [
      { title: "Install Client or CLI", description: "Install the client application or command-line binary on your Mac." },
      { title: "Authenticate or Pair Devices", description: "Sign in with your identity provider or scan a direct pairing QR code/token." },
      { title: "Establish Secure Tunnel", description: "Connect to your private network or expose local ports with secure credentials." },
      { title: "Access Services Remotely", description: "Interact with remote databases, files, and displays as if they were on your local network." },
    ],
    featurePool: [
      "Modern cryptographic protocols (WireGuard, TLS 1.3, AES-GCM)",
      "Direct peer-to-peer connection negotiation for minimal latency",
      "Automatic reconnect handling across Wi-Fi networks and sleep states",
      "Menu bar quick toggle for instant connection status and IP inspection",
      "Minimal battery and CPU consumption during active streaming",
    ],
    proTipPool: [
      "Pair with local file sharing tools to transfer large video and dataset files at maximum gigabit Wi-Fi speeds.",
      "Use mesh VPNs like Tailscale to access your home or office Mac securely without opening router port forwards.",
      "Keep speed test and latency utilities pinned to verify network quality before remote presentations.",
    ],
    bestFor: "Remote developers, system engineers, homelab enthusiasts, and distributed teams.",
    macOSIntegration: "macOS Network Extension, system VPN profiles, menu bar status items, and keychain certificate storage.",
  },
}

export function getToolDocumentation(tool: ToolInput): ToolDocumentation {
  const custom = customDocs[tool.slug]
  if (custom && custom.overview && custom.benefits && custom.howToUse && custom.features && custom.proTips) {
    return {
      overview: custom.overview,
      installation: custom.installation ?? (tool.installKind === "manual" ? "Follow the vendor's installation guide and confirm version." : `Run \`${tool.installCommand}\` in terminal to install.`),
      benefits: custom.benefits,
      howToUse: custom.howToUse,
      features: custom.features,
      proTips: custom.proTips,
      bestFor: custom.bestFor ?? `Developers and Mac users seeking modern ${tool.categorySlug.replace(/-/g, " ")} capabilities.`,
      macOSIntegration: custom.macOSIntegration ?? "Native macOS application support, Apple Silicon optimization, and system integration.",
    }
  }

  const template = categoryTemplates[tool.categorySlug] ?? categoryTemplates["productivity-tools"]

  const overview = tool.description.length > 30 && !tool.description.startsWith("Explore ")
    ? `${tool.name} is a dedicated macOS utility designed for ${tool.categorySlug.replace(/-/g, " ")}. ${tool.description}`
    : `${tool.name} is a high-performance macOS tool tailored for ${tool.categorySlug.replace(/-/g, " ")}. It streamlines workflows, boosts productivity, and delivers a polished native Mac experience.`

  const cmd = tool.command ?? tool.installCommand ?? `brew install ${tool.slug}`
  const isManual = tool.installKind === "manual"

  const installation = isManual
    ? `Download ${tool.name} from its official provider and drag it to your Applications folder. Verify any requested system permissions on first launch.`
    : `Install ${tool.name} effortlessly via Homebrew by executing \`${cmd}\` in your macOS Terminal.`

  const benefits: ToolBenefit[] = [
    { title: `Tailored for ${tool.name}`, description: tool.description },
    ...template.benefitThemes.slice(0, 3),
  ]

  const howToUse: ToolStep[] = [
    {
      step: 1,
      title: "Install & Initial Launch",
      description: isManual
        ? `Install ${tool.name} by following the official download instructions and moving it to your /Applications folder.`
        : `Run \`${cmd}\` in your terminal to automatically download and configure the package.`,
    },
    {
      step: 2,
      title: template.workflowSteps[1].title,
      description: `Open ${tool.name} via Spotlight (⌘+Space) or your terminal. Adjust initial settings to suit your workflow preferences.`,
    },
    {
      step: 3,
      title: template.workflowSteps[2].title,
      description: `Incorporate ${tool.name} into your daily development routine. Explore primary shortcuts and commands.`,
    },
    {
      step: 4,
      title: template.workflowSteps[3].title,
      description: `Check for updates periodically to enjoy new features, performance improvements, and macOS compatibility patches.`,
    },
  ]

  return {
    overview,
    installation,
    benefits,
    howToUse,
    features: [
      `Optimized for macOS and Apple Silicon architecture`,
      `Fast execution with clean integration into macOS workflows`,
      `Supports keyboard-driven controls and common macOS shortcuts`,
      ...template.featurePool.slice(0, 2),
    ],
    proTips: [
      `Pin ${tool.name} to your Dock or Menu Bar for instant access throughout the day.`,
      `Check preferences to configure launch-at-login and custom shortcut mappings.`,
      ...template.proTipPool.slice(0, 1),
    ],
    bestFor: template.bestFor,
    macOSIntegration: template.macOSIntegration,
  }
}
