export function formatRelativeTime(dateIso: string): string {
  const diffMs = Date.now() - new Date(dateIso).getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return 'baru saja'
  if (diffMin < 60) return `${diffMin}m ago`

  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24) return `${diffH}h ago`

  const diffD = Math.floor(diffH / 24)
  return `${diffD}d ago`
}
