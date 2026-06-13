const numberFormat = new Intl.NumberFormat('cs-CZ')

export function formatNumber(n: number): string {
  return numberFormat.format(n)
}

export function formatCzk(n: number): string {
  return `${numberFormat.format(n)} Kč`
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d}. ${m}. ${y}`
}
