import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import { siteStats } from '../data'

function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'O projektu' }]} />
      <div className="pageHead">
        <h1>O projektu</h1>
      </div>
      <div style={{ maxWidth: 720 }}>
        <p>
          <strong>ČNDB — Česká Numismatická Databáze</strong> je otevřený katalog
          českých a československých mincí. Pro každý ročník shromažďujeme
          parametry ražby, populační reporty certifikačních společností PCGS a
          NGC, odhady cen a výsledky aukcí.
        </p>
        <p>
          Databáze aktuálně pokrývá {siteStats.periods} historická období,{' '}
          {siteStats.coinTypes} typů mincí a {siteStats.issues} jednotlivých
          ročníků. Obsah průběžně rozšiřujeme — v plánu jsou další období,
          varianty ražeb i fotografie mincí.
        </p>
        <p>
          Projekt je ve vývoji a zobrazená populační a cenová data jsou zatím{' '}
          <strong>ukázková</strong>. Neslouží jako podklad pro investiční
          rozhodnutí.
        </p>
        <p>
          Začněte procházením podle <Link to="/obdobi">období</Link> nebo si
          prohlédněte souhrnný <Link to="/populace">populační report</Link>.
        </p>
      </div>
    </>
  )
}

export default AboutPage
