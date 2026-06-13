import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import SearchBox from '../components/ui/SearchBox'
import { searchSite } from '../data'

function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const results = searchSite(query)

  return (
    <>
      <Breadcrumbs items={[{ label: 'Vyhledávání' }]} />
      <div className="pageHead">
        <h1>Vyhledávání</h1>
        <SearchBox size="lg" initialQuery={query} key={query} />
      </div>

      {query.trim() === '' ? (
        <p className="muted">Zadejte hledaný výraz, např. „dukát“ nebo „10 Korun 1931“.</p>
      ) : results.length === 0 ? (
        <p className="muted">
          Pro dotaz „{query}“ jsme nic nenašli. Zkuste název mince nebo ročník.
        </p>
      ) : (
        <>
          <p className="muted">
            Nalezeno {results.length} výsledků pro „{query}“:
          </p>
          <div className="tableWrap">
            <table className="data">
              <tbody>
                {results.map((r) => (
                  <tr key={r.url}>
                    <td>
                      <Link to={r.url}>
                        <strong>{r.label}</strong>
                      </Link>
                      <div className="muted" style={{ fontSize: '0.85rem' }}>
                        {r.sub}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default SearchPage
