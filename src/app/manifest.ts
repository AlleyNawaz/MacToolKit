import type { MetadataRoute } from "next"
export default function manifest(): MetadataRoute.Manifest { return { name: "Alloy", short_name: "Alloy", description: "The macOS Developer Index", start_url: "/", display: "standalone", background_color: "#08090b", theme_color: "#f59e0b", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] } }
