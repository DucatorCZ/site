import { Link, NavLink } from 'react-router-dom'
import SearchBox from '../ui/SearchBox'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { to: '/obdobi', label: 'Období' },
  { to: '/populace', label: 'Populace' },
  { to: '/o-projektu', label: 'O projektu' },
]

function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">Č</span>
          <span>
            ČNDB
            <span className={styles.tagline}>Česká Numismatická Databáze</span>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Hlavní navigace">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.search}>
          <SearchBox />
        </div>
      </div>
    </header>
  )
}

export default Header
