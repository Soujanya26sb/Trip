'use client'

import { useState } from 'react'
import { recommendations } from '@/data/dummyData'
import { FaStar } from 'react-icons/fa'

const tabs = ['Trending', 'Popular', 'New']

export default function RecommendationTabs() {
  const [active, setActive] = useState('Trending')
  const filtered = recommendations.filter((r) => r.tab === active)

  return (
    <div className="section rec-section">
      <h2 className="section-title">Recommended For You</h2>
      <div className="rec-tabs">
        {tabs.map((t) => (
          <button key={t} className={active === t ? 'rec-tab active' : 'rec-tab'} onClick={() => setActive(t)} suppressHydrationWarning>
            {t}
          </button>
        ))}
      </div>
      <div className="rec-grid">
        {filtered.map((r) => (
          <div className="rec-card" key={r.id}>
            <div className="rec-img-wrap">
              <img src={r.image} alt={r.name} />
              <span className="rec-type">{r.type}</span>
            </div>
            <div className="rec-info">
              <h4>{r.name}</h4>
              <div className="rec-rating">
                <FaStar color="#f5a623" />
                <span>{r.rating}</span>
              </div>
              <p className="rec-price">From <strong>${r.price}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
