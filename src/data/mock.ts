/**
 * Deterministic generator of placeholder population/price/auction data.
 * Every value is derived from a seed built from period/coin/year/variant,
 * so the "database" is stable across reloads without storing large JSONs.
 * Replace this module with real data sources once they exist.
 */
import { PLUS_ELIGIBLE, SHELDON_GRADES, gradeLabel } from './grades'
import type {
  AuctionResult,
  CoinIssue,
  CoinType,
  GradePopulation,
  IssueVariantData,
  Metal,
  VariantCode,
} from './types'

function hashString(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface MetalProfile {
  center: number
  sigma: number
  circFrac: number
  circCenter: number
  circSigma: number
  basePriceCzk: number
}

const METAL_PROFILES: Record<Metal, MetalProfile> = {
  Au: { center: 63, sigma: 2.2, circFrac: 0.06, circCenter: 55, circSigma: 6, basePriceCzk: 9000 },
  Ag: { center: 62, sigma: 3.2, circFrac: 0.32, circCenter: 45, circSigma: 11, basePriceCzk: 350 },
  CuNi: { center: 60, sigma: 4.5, circFrac: 0.5, circCenter: 40, circSigma: 13, basePriceCzk: 90 },
  Zn: { center: 58, sigma: 5, circFrac: 0.6, circCenter: 35, circSigma: 13, basePriceCzk: 70 },
}

const AUCTION_HOUSES = [
  'Aurea Numismatika',
  'Macho & Chlapovič',
  'Heritage Auctions',
  'Fritz Rudolf Künker',
  "Stack's Bowers",
]

const gauss = (x: number, mu: number, sigma: number) =>
  Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma))

function roundNice(n: number): number {
  if (n < 1000) return Math.max(10, Math.round(n / 10) * 10)
  if (n < 10_000) return Math.round(n / 100) * 100
  if (n < 100_000) return Math.round(n / 500) * 500
  return Math.round(n / 1000) * 1000
}

function priceFor(grade: number, plus: boolean, base: number, mult: number): number {
  let p: number
  if (grade < 60) p = base * (0.4 + (grade / 60) ** 1.6 * 3)
  else p = base * 3 * Math.pow(1.55, grade - 60)
  if (plus) p *= 1.3
  return roundNice(p * mult)
}

const cache = new Map<string, IssueVariantData>()

export function getIssueVariantData(
  coin: CoinType,
  issue: CoinIssue,
  variant: VariantCode,
): IssueVariantData {
  const seed = `${coin.periodSlug}/${coin.slug}/${issue.year}/${variant}`
  const cached = cache.get(seed)
  if (cached) return cached

  const rng = mulberry32(hashString(seed))
  const profile = METAL_PROFILES[coin.metal]

  let center = profile.center
  let sigma = profile.sigma
  let circFrac = profile.circFrac
  let total: number
  if (variant === 'PL') {
    // Prooflike examples: tiny populations concentrated in mint state.
    total = Math.round(12 + rng() * 90)
    center += 1.5
    sigma = 2
    circFrac = 0
  } else {
    const mintage = issue.mintage ?? 100_000
    total = Math.min(2600, Math.max(40, Math.round((mintage ** 0.55 / 2) * (0.6 + rng() * 0.8))))
  }

  const priceMult = 0.8 + rng() * 0.5
  const ngcShare = 0.45 + rng() * 0.25

  const weights = SHELDON_GRADES.map(
    (g) => (1 - circFrac) * gauss(g, center, sigma) + circFrac * gauss(g, profile.circCenter, profile.circSigma),
  )
  const weightSum = weights.reduce((a, b) => a + b, 0)

  const population: GradePopulation[] = []
  for (let i = 0; i < SHELDON_GRADES.length; i++) {
    const grade = SHELDON_GRADES[i]
    const count = Math.round((total * weights[i] / weightSum) * (0.7 + rng() * 0.6))
    let ngc = Math.round(count * ngcShare)
    let pcgs = count - ngc

    let plusRow: GradePopulation | null = null
    if (PLUS_ELIGIBLE.has(grade) && count >= 3) {
      const plusTotal = Math.round(count * (0.08 + rng() * 0.14))
      const plusNgc = Math.min(ngc, Math.round(plusTotal * ngcShare))
      const plusPcgs = Math.min(pcgs, plusTotal - plusNgc)
      ngc -= plusNgc
      pcgs -= plusPcgs
      plusRow = { grade, plus: true, pcgs: plusPcgs, ngc: plusNgc, priceCzk: null }
    }

    population.push({ grade, plus: false, pcgs, ngc, priceCzk: null })
    if (plusRow) population.push(plusRow)
  }

  const topGrade = population.reduce(
    (max, row) => (row.pcgs + row.ngc > 0 && row.grade > max ? row.grade : max),
    0,
  )
  for (const row of population) {
    if (row.grade <= topGrade) {
      row.priceCzk = priceFor(row.grade, row.plus, profile.basePriceCzk, priceMult)
    }
  }

  const totals = population.reduce(
    (acc, row) => {
      acc.pcgs += row.pcgs
      acc.ngc += row.ngc
      return acc
    },
    { pcgs: 0, ngc: 0, all: 0 },
  )
  totals.all = totals.pcgs + totals.ngc

  const survivalAll = roundNice(totals.all * (6 + rng() * 6))
  const msPop = population.filter((r) => r.grade >= 60).reduce((a, r) => a + r.pcgs + r.ngc, 0)
  const gemPop = population.filter((r) => r.grade >= 65).reduce((a, r) => a + r.pcgs + r.ngc, 0)
  const survivalMs60 = Math.min(survivalAll, roundNice(Math.max(msPop, 1) * (1.5 + rng())))
  const survivalMs65 = Math.min(survivalMs60, roundNice(Math.max(gemPop, 1) * (1.2 + rng() * 0.6)))
  const rarityScore =
    Math.round(Math.min(9.9, Math.max(1, 10 - Math.log10(Math.max(survivalAll, 2)) * 1.4)) * 10) / 10

  const populated = population.filter((r) => r.pcgs + r.ngc > 0 && r.grade >= 45)
  const auctionCount = 4 + Math.floor(rng() * 5)
  const auctions: AuctionResult[] = []
  for (let i = 0; i < auctionCount && populated.length > 0; i++) {
    const pickWeights = populated.map((r) => (r.pcgs + r.ngc) * (r.grade >= 60 ? 2 : 1))
    const pickSum = pickWeights.reduce((a, b) => a + b, 0)
    let roll = rng() * pickSum
    let row = populated[0]
    for (let j = 0; j < populated.length; j++) {
      roll -= pickWeights[j]
      if (roll <= 0) {
        row = populated[j]
        break
      }
    }
    const year = 2023 + Math.floor(rng() * 4)
    const month = year === 2026 ? 1 + Math.floor(rng() * 5) : 1 + Math.floor(rng() * 12)
    const day = 1 + Math.floor(rng() * 28)
    const estimate = priceFor(row.grade, row.plus, profile.basePriceCzk, priceMult)
    auctions.push({
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      gradeLabel: gradeLabel(row.grade, row.plus, variant),
      service: rng() < 0.55 ? 'NGC' : 'PCGS',
      auctionHouse: AUCTION_HOUSES[Math.floor(rng() * AUCTION_HOUSES.length)],
      priceCzk: roundNice(estimate * (0.7 + rng() * 0.7)),
    })
  }
  auctions.sort((a, b) => b.date.localeCompare(a.date))

  const data: IssueVariantData = {
    population,
    rarity: { survivalAll, survivalMs60, survivalMs65, rarityScore },
    auctions,
    totals,
  }
  cache.set(seed, data)
  return data
}
