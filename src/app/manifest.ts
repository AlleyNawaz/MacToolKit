import type { MetadataRoute } from "next"
export default function manifest(): MetadataRoute.Manifest { return { name: "MacToolKit", short_name: "MacToolKit", description: "The macOS developer toolkit", start_url: "/", display: "standalone", background_color: "#0b1020", theme_color: "#0ea5e9", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] } }
