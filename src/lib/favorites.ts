export const favoritesKey = "alloy-favorites"
export const legacyFavoritesKey = "mactoolkit-favorites"
export const oldLegacyFavoritesKey = "mactools-favorites"
export const favoritesEvent = "alloy:favorites"

export function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(favoritesKey) ?? localStorage.getItem(legacyFavoritesKey) ?? localStorage.getItem(oldLegacyFavoritesKey) ?? "[]"
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    return [...new Set(value.filter((item): item is string => typeof item === "string" && /^[a-z0-9-]+$/.test(item)))]
  } catch {
    return []
  }
}

export function writeFavorites(slugs: string[]): boolean {
  try {
    localStorage.setItem(favoritesKey, JSON.stringify([...new Set(slugs)]))
    window.dispatchEvent(new Event(favoritesEvent))
    return true
  } catch {
    return false
  }
}
