import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import {
  COIN_TYPES,
  getIssueVariantData,
  getPeriod,
  issueYearsLabel,
} from '../data'
import type { CoinType } from '../data'
import { formatNumber } from '../lib/format'

function typeTotals(coin: CoinType) {
  let pcgs = 0
  let ngc = 0
  for (const issue of coin.issues) {
    for (const variant of issue.variants) {
      const data = getIssueVariantData(coin, issue, variant)
      pcgs += data.totals.pcgs
      ngc += data.totals.ngc
    }
  }
  return { pcgs, ngc, all: pcgs + ngc }
}

function PopulationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Populace' }]} />
      <div className="pageHead">
        <h1>Populační report</h1>
        <p className="muted" style={{ maxWidth: 720 }}>
          Souhrn certifikovaných populací PCGS a NGC napříč databází. Detailní
          rozpad podle známek najdete na kartě každého ročníku.
        </p>
      </div>

      <div className="tableWrap">
        <table className="data">
          <thead>
            <tr>
              <th>Mince</th>
              <th>Období</th>
              <th>Ročníky</th>
              <th className="num">PCGS</th>
              <th className="num">NGC</th>
              <th className="num">Celkem</th>
            </tr>
          </thead>
          <tbody>
            {COIN_TYPES.map((coin) => {
              const period = getPeriod(coin.periodSlug)
              const totals = typeTotals(coin)
              return (
                <tr key={`${coin.periodSlug}/${coin.slug}`}>
                  <td>
                    <Link to={`/obdobi/${coin.periodSlug}/${coin.slug}`}>
                      <strong>{coin.name}</strong>
                      {coin.subtitle ? ` — ${coin.subtitle}` : ''}
                    </Link>
                  </td>
                  <td>{period?.name}</td>
                  <td>{issueYearsLabel(coin)}</td>
                  <td className="num">{formatNumber(totals.pcgs)}</td>
                  <td className="num">{formatNumber(totals.ngc)}</td>
                  <td className="num">
                    <strong>{formatNumber(totals.all)}</strong>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ fontSize: '0.82rem', marginTop: 10 }}>
        Zdroj: populační reporty PCGS a NGC. Zobrazená data jsou ukázková.
      </p>
    </>
  )
}

export default PopulationPage
