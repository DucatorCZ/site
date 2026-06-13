import type { CoinIssue, CoinType } from '../../data'
import { formatNumber } from '../../lib/format'
import styles from './FactsTable.module.css'

function FactsTable({ coin, issue }: { coin: CoinType; issue: CoinIssue }) {
  const p = coin.parameters
  const rows: Array<[string, string]> = [
    ['Nominál', p.denomination],
    ['Ročník', String(issue.year)],
    ['Náklad', issue.mintage != null ? `${formatNumber(issue.mintage)} ks` : 'neznámý'],
    ['Materiál', p.composition],
    ['Hmotnost', `${p.weightGrams.toLocaleString('cs-CZ')} g`],
    ['Průměr', `${p.diameterMm.toLocaleString('cs-CZ')} mm`],
    ['Hrana', p.edge],
    ['Autor', p.designer],
    ['Mincovna', p.mint],
  ]

  return (
    <table className={styles.facts}>
      <caption className={styles.caption}>Parametry mince</caption>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FactsTable
