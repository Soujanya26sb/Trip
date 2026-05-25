'use client'

import React from 'react'

export default function DestinationSlider() {
  
  const destinations = [
    { id: 1, city: 'Tokyo', country: 'Japan', img: '/3.jpg' },
    { id: 2, city: 'Paris', country: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600' },
    { id: 3, city: 'New York', country: 'USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600' },
    { id: 4, city: 'Dubai', country: 'UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600' }
  ];

  return (
    <div className="destinations-section-block">
      <style>{`
        .destinations-section-block {
          max-width: 1240px;
          margin: 40px auto;
          padding: 0 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        /* Fixed Banner Grid Wrapper holding 'Explore the World' */
        .featured-banners-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 24px; /* Essential padding space so bottom items don't overlap */
        }
        
        @media (max-width: 768px) {
          .featured-banners-grid {
            grid-template-columns: 1fr;
          }
        }

        .hero-banner-card {
          position: relative;
          height: 280px;
          border-radius: 16px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 24px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        /* Dark Gradient overlay to make text highly readable */
        .hero-banner-card::before {
          content: '';
          position: absolute;
          top:0; left:0; right:0; bottom:0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.1) 100%);
          z-index: 1;
        }
        .banner-content-text {
          position: relative;
          z-index: 2;
          color: #ffffff;
        }
        .banner-content-text h3 {
          margin: 0 0 6px 0;
          font-size: 1.6rem;
          font-weight: 700;
        }
        .banner-content-text p {
          margin: 0;
          font-size: 0.95rem;
          opacity: 0.9;
        }

        /* 4 Destination Cities aligned perfectly in a clean row below banners */
        .cities-row-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          clear: both;
        }

        @media (max-width: 992px) {
          .cities-row-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 576px) {
          .cities-row-grid {
            grid-template-columns: 1fr;
          }
        }

        .city-thumbnail-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          border: 1px solid #edf2f7;
          display: flex;
          flex-direction: column;
        }
        .city-image-holder {
          height: 140px;
          background-size: cover;
          background-position: center;
          width: 100%;
        }
        .city-details-meta {
          padding: 14px 16px;
        }
        .city-details-meta h4 {
          margin: 0 0 2px 0;
          font-size: 1.1rem;
          color: #1a202c;
          font-weight: 700;
        }
        .city-details-meta p {
          margin: 0;
          font-size: 0.9rem;
          color: #a0aec0;
        }
      `}</style>

  
      <div className="featured-banners-grid">
        <div className="hero-banner-card" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800')` }}>
          <div className="banner-content-text">
            <h3>Explore the World</h3>
            <p>Best deals on international trips</p>
          </div>
        </div>
        
        <div className="hero-banner-card" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800')` }}>
          <div className="banner-content-text">
            <h3>Mountain Escapes</h3>
            <p>From $99/night</p>
          </div>
        </div>
      </div>

      
      <div className="cities-row-grid">
        {destinations.map((dest) => (
          <div className="city-thumbnail-card" key={dest.id}>
            <div className="city-image-holder" style={{ backgroundImage: `url(${dest.img})` }}></div>
            <div className="city-details-meta">
              <h4>{dest.city}</h4>
              <p>{dest.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}