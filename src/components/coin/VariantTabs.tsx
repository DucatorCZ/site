import type { VariantCode } from '../../data'
import styles from './VariantTabs.module.css'

const VARIANT_LABELS: Record<VariantCode, string> = {
  MS: 'MS (Mint State)',
  PL: 'PL (Prooflike)',
}

interface VariantTabsProps {
  variants: VariantCode[]
  selected: VariantCode
  onSelect: (v: VariantCode) => void
}

function VariantTabs({ variants, selected, onSelect }: VariantTabsProps) {
  if (variants.length <= 1) {
    return <span className="badge badgeAccent">{VARIANT_LABELS[variants[0]] ?? variants[0]}</span>
  }
  return (
    <div className={styles.tabs} role="tablist" aria-label="Varianta ražby">
      {variants.map((v) => (
        <button
          key={v}
          role="tab"
          aria-selected={v === selected}
          className={`${styles.tab} ${v === selected ? styles.active : ''}`}
          onClick={() => onSelect(v)}
        >
          {VARIANT_LABELS[v]}
        </button>
      ))}
    </div>
  )
}

export default VariantTabs
