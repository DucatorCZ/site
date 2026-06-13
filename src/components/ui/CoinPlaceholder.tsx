import styles from './CoinPlaceholder.module.css'

interface CoinPlaceholderProps {
  label?: string
  size?: number
}

/** Circular gray stand-in for a coin photo until real imagery exists. */
function CoinPlaceholder({ label, size = 220 }: CoinPlaceholderProps) {
  return (
    <div
      className={styles.coin}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ? `${label} — fotografie připravujeme` : 'Fotografie připravujeme'}
    >
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}

export default CoinPlaceholder
