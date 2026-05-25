'use client'

import { hotels } from '@/data/dummyData'
import { FaStar } from 'react-icons/fa'

export default function HotelCards() {
  return (
    <div className="section hotels-section">
      <h2 className="section-title">Featured Hotels</h2>
      <div className="hotels-grid">
        {hotels.map((h) => (
          <div className="hotel-card" key={h.id}>
            <div className="hotel-img-wrap">
              <img src={h.image} alt={h.name} />
              <span className="hotel-stars">{'★'.repeat(h.stars)}</span>
            </div>
            <div className="hotel-info">
              <h4>{h.name}</h4>
              <p className="hotel-city">{h.city}</p>
              <div className="hotel-rating">
                <span className="rating-badge">{h.rating}</span>
                <span className="hotel-reviews">{h.reviews.toLocaleString()} reviews</span>
              </div>
              <p className="hotel-price">From <strong>${h.price}</strong><span>/night</span></p>
              <button className="book-btn" suppressHydrationWarning>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
