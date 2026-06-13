import { Link } from 'react-router-dom'
import { PERIODS } from '../../data'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.about}>
          <strong>ČNDB</strong>
          <p className={styles.aboutText}>
            Česká Numismatická Databáze — katalog českých a československých
            mincí s populačními reporty, odhady cen a aukčními výsledky.
          </p>
        </div>
        <div>
          <h3 className={styles.colTitle}>Procházet</h3>
          <ul className={styles.list}>
            {PERIODS.map((p) => (
              <li key={p.slug}>
                <Link to={`/obdobi/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/populace">Populační report</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.colTitle}>Informace</h3>
          <ul className={styles.list}>
            <li>
              <Link to="/o-projektu">O projektu</Link>
            </li>
            <li>
              <Link to="/hledat">Vyhledávání</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        © {new Date().getFullYear()} ČNDB — Česká Numismatická Databáze
      </div>
    </footer>
  )
}

export default Footer
