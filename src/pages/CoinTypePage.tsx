import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import CoinPlaceholder from '../components/ui/CoinPlaceholder'
import NotFoundPage from './NotFoundPage'
import {
  getCoinType,
  getPeriod,
  issuePriceEstimate,
  issueTotalPopulation,
} from '../data'
import { formatCzk, formatNumber } from '../lib/format'
import styles from './CoinTypePage.module.css'

function CoinTypePage() {
  const { periodSlug = '', coinSlug = '' } = useParams()
  const navigate = useNavigate()
  const period = getPeriod(periodSlug)
  const coin = period && getCoinType(periodSlug, coinSlug)
  if (!period || !coin) return <NotFoundPage />

  const p = coin.parameters
  const sortedIssues = [...coin.issues].sort((a, b) => a.year - b.year)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Období', to: '/obdobi' },
          { label: period.name, to: `/obdobi/${period.slug}` },
          { label: coin.name },
        ]}
      />

      <div className={styles.head}>
        <CoinPlaceholder size={110} label={coin.name} />
        <div>
          <p className="eyebrow">{period.name}</p>
          <h1>{coin.name}</h1>
          {coin.subtitle && <p className={`muted ${styles.subtitle}`}>{coin.subtitle}</p>}
          <p className={`muted ${styles.params}`}>
            {p.composition} · {p.weightGrams.toLocaleString('cs-CZ')} g ·{' '}
            {p.diameterMm.toLocaleString('cs-CZ')} mm · {p.mint}
          </p>
        </div>
      </div>

      <p className={styles.description}>{coin.description}</p>

      <section className="section">
        <h2>Ročníky</h2>
        <p className="muted">Kliknutím na ročník zobrazíte detailní kartu mince.</p>
        <div className="tableWrap">
          <table className="data">
            <thead>
              <tr>
                <th>Ročník</th>
                <th className="num">Náklad</th>
                <th>Varianty</th>
                <th className="num">Certifikovaná populace</th>
                <th className="num">Odhad ceny v MS63</th>
                <th aria-label="Poznámka"></th>
              </tr>
            </thead>
            <tbody>
              {sortedIssues.map((issue) => {
                const url = `/obdobi/${period.slug}/${coin.slug}/${issue.year}`
                const price = issuePriceEstimate(coin, issue)
                return (
                  <tr key={issue.year} className="rowLink" onClick={() => navigate(url)}>
                    <td>
                      <Link to={url} onClick={(e) => e.stopPropagation()}>
                        <strong>
                          {coin.name} {issue.year}
                        </strong>
                      </Link>
                    </td>
                    <td className="num">
                      {issue.mintage != null ? formatNumber(issue.mintage) : '—'}
                    </td>
                    <td>
                      {issue.variants.map((v) => (
                        <span key={v} className={`badge ${styles.variantBadge}`}>
                          {v}
                        </span>
                      ))}
                    </td>
                    <td className="num">{formatNumber(issueTotalPopulation(coin, issue))}</td>
                    <td className="num">{price != null ? formatCzk(price) : '—'}</td>
                    <td className={styles.note}>{issue.note ?? ''}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default CoinTypePage
