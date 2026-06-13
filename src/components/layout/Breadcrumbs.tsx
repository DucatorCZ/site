import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

export interface Crumb {
  label: string
  to?: string
}

function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className={styles.crumbs} aria-label="Drobečková navigace">
      <ol className={styles.list}>
        <li>
          <Link to="/">Domů</Link>
        </li>
        {items.map((item, i) => (
          <li key={i}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
