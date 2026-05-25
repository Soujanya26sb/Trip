'use client'

import { places } from '@/data/dummyData'
import { FaStar } from 'react-icons/fa'

export default function PlacesCards() {
  return (
    <div className="section places-section">
      <h2 className="section-title">Top Attractions</h2>
      <div className="places-grid">
        {places.map((p) => (
          <div className="place-card" key={p.id}>
            <div className="place-img-wrap">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="place-info">
              <h4>{p.name}</h4>
              <p className="place-city">{p.city}</p>
              <div className="place-rating">
                <FaStar color="#f5a623" />
                <span>{p.rating}</span>
                <span className="place-reviews">({p.reviews.toLocaleString()} reviews)</span>
              </div>
              <p className="place-price">From <strong>${p.price}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
