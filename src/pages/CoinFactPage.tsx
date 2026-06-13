import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Gallery from '../components/coin/Gallery'
import FactsTable from '../components/coin/FactsTable'
import VariantTabs from '../components/coin/VariantTabs'
import PopulationTable from '../components/coin/PopulationTable'
import RarityCard from '../components/coin/RarityCard'
import AuctionTable from '../components/coin/AuctionTable'
import NotFoundPage from './NotFoundPage'
import {
  getCoinType,
  getIssue,
  getIssueVariantData,
  getPeriod,
} from '../data'
import type { CoinIssue, CoinType, Period } from '../data'
import { formatNumber } from '../lib/format'
import styles from './CoinFactPage.module.css'

interface CoinFactContentProps {
  period: Period
  coin: CoinType
  issue: CoinIssue
}

function CoinFactContent({ period, coin, issue }: CoinFactContentProps) {
  const [variant, setVariant] = useState(issue.variants[0])
  const data = getIssueVariantData(coin, issue, variant)

  const sortedIssues = [...coin.issues].sort((a, b) => a.year - b.year)
  const idx = sortedIssues.findIndex((i) => i.year === issue.year)
  const prev = idx > 0 ? sortedIssues[idx - 1] : null
  const next = idx < sortedIssues.length - 1 ? sortedIssues[idx + 1] : null
  const baseUrl = `/obdobi/${period.slug}/${coin.slug}`

  return (
    <article>
      <Breadcrumbs
        items={[
          { label: 'Období', to: '/obdobi' },
          { label: period.name, to: `/obdobi/${period.slug}` },
          { label: coin.name, to: baseUrl },
          { label: String(issue.year) },
        ]}
      />

      <header className={styles.head}>
        <div>
          <h1>
            {coin.name} {issue.year}
          </h1>
          {coin.subtitle && <p className={`muted ${styles.subtitle}`}>{coin.subtitle}</p>}
        </div>
        <div className={styles.headRight}>
          <VariantTabs variants={issue.variants} selected={variant} onSelect={setVariant} />
          <nav className={styles.yearNav} aria-label="Sousední ročníky">
            {prev ? (
              <Link className="btnGhost" to={`${baseUrl}/${prev.year}`}>
                ← {prev.year}
              </Link>
            ) : (
              <span className={styles.yearNavSpacer} />
            )}
            {next ? (
              <Link className="btnGhost" to={`${baseUrl}/${next.year}`}>
                {next.year} →
              </Link>
            ) : (
              <span className={styles.yearNavSpacer} />
            )}
          </nav>
        </div>
      </header>

      <div className={styles.topGrid}>
        <Gallery coinName={`${coin.name} ${issue.year}`} />
        <div className={styles.sideCol}>
          <FactsTable coin={coin} issue={issue} />
          <RarityCard rarity={data.rarity} />
        </div>
      </div>

      <section className="section">
        <h2>Populace a odhady cen</h2>
        <p className="muted">
          Certifikováno celkem <strong>{formatNumber(data.totals.all)}</strong> kusů
          ({formatNumber(data.totals.pcgs)} PCGS, {formatNumber(data.totals.ngc)} NGC) ve
          variantě {variant}.
        </p>
        <PopulationTable population={data.population} variant={variant} />
      </section>

      <section className="section">
        <h2>Nedávné aukční výsledky</h2>
        <AuctionTable auctions={data.auctions} />
      </section>

      <section className="section">
        <h2>O minci</h2>
        <p>{coin.description}</p>
        <p>
          {issue.note && <>{issue.note} </>}
          {issue.mintage != null && (
            <>
              V roce {issue.year} bylo vyraženo {formatNumber(issue.mintage)} kusů.{' '}
            </>
          )}
          Do dnešního dne se podle odhadů dochovalo přibližně{' '}
          {formatNumber(data.rarity.survivalAll)} exemplářů napříč všemi stupni zachovalosti,
          z toho zhruba {formatNumber(data.rarity.survivalMs65)} ve stavu MS65 a lepším.
        </p>
      </section>
    </article>
  )
}

function CoinFactPage() {
  const { periodSlug = '', coinSlug = '', year = '' } = useParams()
  const period = getPeriod(periodSlug)
  const coin = period && getCoinType(periodSlug, coinSlug)
  const issue = coin && getIssue(coin, Number(year))

  if (!period || !coin || !issue) return <NotFoundPage />

  return (
    <CoinFactContent
      key={`${periodSlug}/${coinSlug}/${year}`}
      period={period}
      coin={coin}
      issue={issue}
    />
  )
}

export default CoinFactPage
