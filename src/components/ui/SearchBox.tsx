import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SearchBox.module.css'

interface SearchBoxProps {
  size?: 'sm' | 'lg'
  initialQuery?: string
  placeholder?: string
}

function SearchBox({ size = 'sm', initialQuery = '', placeholder = 'Hledat minci…' }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  return (
    <form
      className={`${styles.form} ${size === 'lg' ? styles.lg : ''}`}
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        if (query.trim()) navigate(`/hledat?q=${encodeURIComponent(query.trim())}`)
      }}
    >
      <input
        className={styles.input}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Hledat v databázi"
      />
      <button className={styles.button} type="submit">
        Hledat
      </button>
    </form>
  )
}

export default SearchBox
