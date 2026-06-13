import type { RarityInfo } from '../../data'
import { formatNumber } from '../../lib/format'
import styles from './RarityCard.module.css'

function RarityCard({ rarity }: { rarity: RarityInfo }) {
  const rows: Array<[string, number]> = [
    ['Všechny stupně', rarity.survivalAll],
    ['MS60 a lepší', rarity.survivalMs60],
    ['MS65 a lepší', rarity.survivalMs65],
  ]

  return (
    <div className={`card ${styles.card}`}>
      <h3 className={styles.title}>Vzácnost a odhad dochovaných kusů</h3>
      <table className={styles.table}>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>≈ {formatNumber(value)} ks</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.scoreRow}>
        <span className={styles.scoreLabel}>Index vzácnosti</span>
        <span className={styles.scoreValue}>{rarity.rarityScore.toLocaleString('cs-CZ')} / 10</span>
      </div>
      <div
        className={styles.bar}
        role="meter"
        aria-valuemin={1}
        aria-valuemax={10}
        aria-valuenow={rarity.rarityScore}
        aria-label="Index vzácnosti"
      >
        <div className={styles.barFill} style={{ width: `${rarity.rarityScore * 10}%` }} />
      </div>
      <p className={`muted ${styles.note}`}>
        Odhady vycházejí z certifikovaných populací a aukčních výskytů. Ukázková data.
      </p>
    </div>
  )
}

export default RarityCard
