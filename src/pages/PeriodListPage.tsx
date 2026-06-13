import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import { PERIODS, listCoinTypes } from '../data'

function PeriodListPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Období' }]} />
      <div className="pageHead">
        <h1>Období</h1>
        <p className="muted">
          Mince jsou v databázi řazeny podle historických období českých zemí.
        </p>
      </div>
      <div className="cardGrid">
        {PERIODS.map((period) => {
          const coinCount = listCoinTypes(period.slug).length
          return (
            <Link key={period.slug} to={`/obdobi/${period.slug}`} className="card cardLink">
              <p className="eyebrow">{period.yearsLabel}</p>
              <h3>{period.name}</h3>
              <p className="muted" style={{ fontSize: '0.9rem' }}>
                {period.description}
              </p>
              <span className="badge">{coinCount} typů mincí</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default PeriodListPage
