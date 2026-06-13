import { Link } from 'react-router-dom'
import SearchBox from '../components/ui/SearchBox'
import CoinPlaceholder from '../components/ui/CoinPlaceholder'
import { COIN_TYPES, PERIODS, getPeriod, issueYearsLabel, siteStats } from '../data'
import styles from './HomePage.module.css'

const FEATURED_SLUGS = ['1-dukat', '10-korun']

function HomePage() {
  const featured = COIN_TYPES.filter(
    (c) => c.periodSlug === 'prvni-republika' && FEATURED_SLUGS.includes(c.slug),
  )

  return (
    <>
      <section className={styles.hero}>
        <p className="eyebrow">Česká Numismatická Databáze</p>
        <h1 className={styles.heroTitle}>
          Vše o českých a československých mincích na jednom místě
        </h1>
        <p className={`muted ${styles.heroText}`}>
          Populační reporty PCGS a NGC, odhady cen, aukční výsledky a parametry
          jednotlivých ročníků — přehledně podle období a typů mincí.
        </p>
        <div className={styles.heroSearch}>
          <SearchBox size="lg" placeholder="Hledat minci, např. „10 Korun 1931“" />
        </div>
        <p className={`muted ${styles.stats}`}>
          {siteStats.periods} období · {siteStats.coinTypes} typů mincí · {siteStats.issues} ročníků
        </p>
      </section>

      <section className="section">
        <h2>Procházet podle období</h2>
        <div className="cardGrid">
          {PERIODS.map((period) => (
            <Link key={period.slug} to={`/obdobi/${period.slug}`} className="card cardLink">
              <p className="eyebrow">{period.yearsLabel}</p>
              <h3>{period.name}</h3>
              <p className={`muted ${styles.cardText}`}>{period.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Vybrané mince</h2>
        <div className="cardGrid">
          {featured.map((coin) => {
            const period = getPeriod(coin.periodSlug)
            return (
              <Link
                key={`${coin.periodSlug}/${coin.slug}`}
                to={`/obdobi/${coin.periodSlug}/${coin.slug}`}
                className={`card cardLink ${styles.featuredCard}`}
              >
                <CoinPlaceholder size={84} />
                <div>
                  <h3 className={styles.featuredTitle}>{coin.name}</h3>
                  {coin.subtitle && <p className={`muted ${styles.featuredSub}`}>{coin.subtitle}</p>}
                  <p className={`muted ${styles.featuredSub}`}>
                    {period?.name} · {issueYearsLabel(coin)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default HomePage
