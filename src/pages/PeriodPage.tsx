import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import CoinPlaceholder from '../components/ui/CoinPlaceholder'
import NotFoundPage from './NotFoundPage'
import { getPeriod, issueYearsLabel, listCoinTypes } from '../data'
import styles from './PeriodPage.module.css'

function PeriodPage() {
  const { periodSlug = '' } = useParams()
  const period = getPeriod(periodSlug)
  if (!period) return <NotFoundPage />

  const coins = listCoinTypes(period.slug)

  return (
    <>
      <Breadcrumbs items={[{ label: 'Období', to: '/obdobi' }, { label: period.name }]} />
      <div className="pageHead">
        <p className="eyebrow">{period.yearsLabel}</p>
        <h1>{period.name}</h1>
        <p className={`muted ${styles.lede}`}>{period.description}</p>
      </div>

      <h2>Typy mincí</h2>
      <div className="cardGrid">
        {coins.map((coin) => (
          <Link
            key={coin.slug}
            to={`/obdobi/${period.slug}/${coin.slug}`}
            className={`card cardLink ${styles.coinCard}`}
          >
            <CoinPlaceholder size={72} />
            <div>
              <h3 className={styles.coinTitle}>{coin.name}</h3>
              {coin.subtitle && <p className={`muted ${styles.coinSub}`}>{coin.subtitle}</p>}
              <p className={`muted ${styles.coinSub}`}>
                {coin.parameters.composition} · {issueYearsLabel(coin)}
              </p>
              <span className="badge">{coin.issues.length} ročníků</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default PeriodPage
