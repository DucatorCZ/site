import { useMemo, useState } from 'react'
import { gradeLabel } from '../../data'
import type { GradePopulation, VariantCode } from '../../data'
import { formatNumber } from '../../lib/format'
import styles from './PopulationTable.module.css'

interface PopulationTableProps {
  population: GradePopulation[]
  variant: VariantCode
}

function PopulationTable({ population, variant }: PopulationTableProps) {
  const [showPlus, setShowPlus] = useState(false)

  const columns = useMemo(
    () => (showPlus ? population : population.filter((row) => !row.plus)),
    [population, showPlus],
  )

  const renderCount = (n: number) =>
    n === 0 ? <span className={styles.zero}>0</span> : <strong>{formatNumber(n)}</strong>

  return (
    <div>
      <div className={styles.toolbar}>
        <button className="btnGhost" onClick={() => setShowPlus((s) => !s)}>
          {showPlus ? 'Skrýt známky s plusem (+)' : 'Zobrazit známky s plusem (+)'}
        </button>
        <span className={`muted ${styles.hint}`}>Tabulku lze posouvat do stran</span>
      </div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.sticky} scope="col">
                Známka
              </th>
              {columns.map((col) => (
                <th
                  key={`${col.grade}${col.plus ? '+' : ''}`}
                  scope="col"
                  className={col.plus ? styles.plusCol : undefined}
                >
                  {gradeLabel(col.grade, col.plus, variant)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={styles.sticky} scope="row">
                PCGS
              </th>
              {columns.map((col) => (
                <td key={`${col.grade}${col.plus ? '+' : ''}`} className={col.plus ? styles.plusCol : undefined}>
                  {renderCount(col.pcgs)}
                </td>
              ))}
            </tr>
            <tr>
              <th className={styles.sticky} scope="row">
                NGC
              </th>
              {columns.map((col) => (
                <td key={`${col.grade}${col.plus ? '+' : ''}`} className={col.plus ? styles.plusCol : undefined}>
                  {renderCount(col.ngc)}
                </td>
              ))}
            </tr>
            <tr className={styles.totalRow}>
              <th className={styles.sticky} scope="row">
                Celkem
              </th>
              {columns.map((col) => (
                <td key={`${col.grade}${col.plus ? '+' : ''}`} className={col.plus ? styles.plusCol : undefined}>
                  {renderCount(col.pcgs + col.ngc)}
                </td>
              ))}
            </tr>
            <tr className={styles.priceRow}>
              <th className={styles.sticky} scope="row">
                Odhad ceny (Kč)
              </th>
              {columns.map((col) => (
                <td key={`${col.grade}${col.plus ? '+' : ''}`} className={col.plus ? styles.plusCol : undefined}>
                  {col.priceCzk != null ? formatNumber(col.priceCzk) : <span className={styles.zero}>—</span>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className={`muted ${styles.note}`}>
        Zdroj: populační reporty PCGS a NGC. Zobrazená data jsou ukázková.
      </p>
    </div>
  )
}

export default PopulationTable
