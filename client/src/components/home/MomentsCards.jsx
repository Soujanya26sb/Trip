'use client'

import { moments } from '@/data/dummyData'
import { FaHeart } from 'react-icons/fa'

export default function MomentsCards() {
  return (
    <div className="section moments-section">
      <h2 className="section-title">Travel Moments</h2>
      <div className="moments-grid">
        {moments.map((m) => (
          <div className="moment-card" key={m.id}>
            <img src={m.image} alt={m.location} />
            <div className="moment-overlay">
              <div className="moment-info">
                <p className="moment-user">{m.user}</p>
                <p className="moment-location">{m.location}</p>
              </div>
              <div className="moment-likes">
                <FaHeart color="#ff4d6d" />
                <span>{m.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
