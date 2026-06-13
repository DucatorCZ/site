export type VariantCode = 'MS' | 'PL'

export type Metal = 'Au' | 'Ag' | 'CuNi' | 'Zn'

export interface Period {
  slug: string
  name: string
  yearsLabel: string
  description: string
}

export interface CoinParameters {
  denomination: string
  composition: string
  weightGrams: number
  diameterMm: number
  edge: string
  designer: string
  mint: string
}

export interface CoinIssue {
  year: number
  mintage: number | null
  variants: VariantCode[]
  note?: string
}

export interface CoinType {
  slug: string
  periodSlug: string
  name: string
  subtitle?: string
  metal: Metal
  parameters: CoinParameters
  description: string
  issues: CoinIssue[]
}

/** One cell row of a population report (a grade, optionally its "+" version). */
export interface GradePopulation {
  grade: number
  plus: boolean
  pcgs: number
  ngc: number
  /** Price estimate in CZK; null when no realistic market estimate exists. */
  priceCzk: number | null
}

export interface AuctionResult {
  date: string // ISO yyyy-mm-dd
  gradeLabel: string
  service: 'PCGS' | 'NGC'
  auctionHouse: string
  priceCzk: number
}

export interface RarityInfo {
  /** Estimated surviving examples across all grades. */
  survivalAll: number
  /** Estimated surviving examples in MS60 or better. */
  survivalMs60: number
  /** Estimated surviving examples in MS65 or better. */
  survivalMs65: number
  /** 1 (common) – 10 (unique) relative rarity index. */
  rarityScore: number
}

/** Everything the coin-fact page needs for one issue + variant combination. */
export interface IssueVariantData {
  population: GradePopulation[]
  rarity: RarityInfo
  auctions: AuctionResult[]
  totals: { pcgs: number; ngc: number; all: number }
}
