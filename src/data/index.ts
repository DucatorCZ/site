import { COIN_TYPES, PERIODS } from './catalog'
import { getIssueVariantData } from './mock'
import type { CoinIssue, CoinType, Period } from './types'

export { PERIODS, COIN_TYPES }
export { getIssueVariantData }
export * from './types'
export * from './grades'

export function getPeriod(slug: string): Period | undefined {
  return PERIODS.find((p) => p.slug === slug)
}

export function listCoinTypes(periodSlug: string): CoinType[] {
  return COIN_TYPES.filter((c) => c.periodSlug === periodSlug)
}

export function getCoinType(periodSlug: string, coinSlug: string): CoinType | undefined {
  return COIN_TYPES.find((c) => c.periodSlug === periodSlug && c.slug === coinSlug)
}

export function getIssue(coin: CoinType, year: number): CoinIssue | undefined {
  return coin.issues.find((i) => i.year === year)
}

export function issueYearsLabel(coin: CoinType): string {
  const years = coin.issues.map((i) => i.year)
  return `${Math.min(...years)}–${Math.max(...years)}`
}

/** Combined certified population of an issue across all its variants. */
export function issueTotalPopulation(coin: CoinType, issue: CoinIssue): number {
  return coin.issues.length === 0
    ? 0
    : issue.variants.reduce((sum, v) => sum + getIssueVariantData(coin, issue, v).totals.all, 0)
}

/** Price estimate (CZK) for a given base grade of the MS variant, if available. */
export function issuePriceEstimate(coin: CoinType, issue: CoinIssue, grade = 63): number | null {
  const data = getIssueVariantData(coin, issue, 'MS')
  const row = data.population.find((r) => r.grade === grade && !r.plus)
  return row?.priceCzk ?? null
}

export const siteStats = {
  periods: PERIODS.length,
  coinTypes: COIN_TYPES.length,
  issues: COIN_TYPES.reduce((sum, c) => sum + c.issues.length, 0),
}

// ── Search ──

export interface SearchResult {
  label: string
  sub: string
  url: string
}

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export function searchSite(query: string): SearchResult[] {
  const q = normalize(query.trim())
  if (!q) return []

  const results: SearchResult[] = []
  for (const coin of COIN_TYPES) {
    const period = getPeriod(coin.periodSlug)
    const periodName = period?.name ?? coin.periodSlug
    const baseUrl = `/obdobi/${coin.periodSlug}/${coin.slug}`
    const typeText = `${coin.name} ${coin.subtitle ?? ''} ${periodName}`

    if (normalize(typeText).includes(q)) {
      results.push({
        label: coin.name,
        sub: `${periodName} · ${issueYearsLabel(coin)}`,
        url: baseUrl,
      })
    }
    for (const issue of coin.issues) {
      if (normalize(`${coin.name} ${issue.year} ${periodName}`).includes(q)) {
        results.push({
          label: `${coin.name} ${issue.year}`,
          sub: periodName,
          url: `${baseUrl}/${issue.year}`,
        })
      }
    }
  }
  return results.slice(0, 30)
}
