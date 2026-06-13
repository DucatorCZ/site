import type { VariantCode } from './types'

/** Full Sheldon scale as used by PCGS/NGC population reports. */
export const SHELDON_GRADES = [
  1, 2, 3, 4, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 53, 55, 58, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
] as const

/** Grades that the services also assign with a "+" designation. */
export const PLUS_ELIGIBLE = new Set([45, 50, 53, 55, 58, 62, 63, 64, 65, 66, 67, 68])

export function gradePrefix(grade: number, variant: VariantCode = 'MS'): string {
  if (grade < 2) return 'PO'
  if (grade < 3) return 'FR'
  if (grade < 4) return 'AG'
  if (grade < 8) return 'G'
  if (grade < 12) return 'VG'
  if (grade < 20) return 'F'
  if (grade < 40) return 'VF'
  if (grade < 50) return 'XF'
  if (grade < 60) return 'AU'
  return variant
}

export function gradeLabel(
  grade: number,
  plus = false,
  variant: VariantCode = 'MS',
): string {
  return `${gradePrefix(grade, variant)}${grade}${plus ? '+' : ''}`
}
