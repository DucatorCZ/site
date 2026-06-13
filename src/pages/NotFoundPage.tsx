import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <p className="eyebrow">Chyba 404</p>
      <h1>Stránka nenalezena</h1>
      <p className="muted">Hledaná stránka neexistuje, nebo byla přesunuta.</p>
      <Link className="btn" to="/">
        Zpět na úvodní stránku
      </Link>
    </div>
  )
}

export default NotFoundPage
