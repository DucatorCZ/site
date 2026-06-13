import { useState } from 'react'
import CoinPlaceholder from '../ui/CoinPlaceholder'
import styles from './Gallery.module.css'

const VIEWS = ['Avers', 'Revers', 'Hrana', 'Avers — detail', 'Revers — detail']

function Gallery({ coinName }: { coinName: string }) {
  const [selected, setSelected] = useState(0)

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <CoinPlaceholder label={VIEWS[selected]} size={280} />
        <p className={styles.caption}>
          {coinName} · {VIEWS[selected]}
          <span className="muted"> (fotografie připravujeme)</span>
        </p>
      </div>
      <div className={styles.thumbs} role="tablist" aria-label="Náhledy mince">
        {VIEWS.map((view, i) => (
          <button
            key={view}
            role="tab"
            aria-selected={i === selected}
            className={`${styles.thumb} ${i === selected ? styles.thumbActive : ''}`}
            onClick={() => setSelected(i)}
            title={view}
          >
            <CoinPlaceholder size={44} />
            <span className={styles.thumbLabel}>{view}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Gallery
