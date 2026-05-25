'use client'

import React from 'react'

export default function BannerSection() {
  return (
    <div className="banner-section-container">
      <style>{`
        .banner-section-container {
          max-width: 1240px;
          margin: 30px auto;
          padding: 0 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* Forces exactly 3 items to stay side-by-side in 1 row */
        .banners-grid-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }

        /* Responsive scaling for tablet displays */
        @media (max-width: 992px) {
          .banners-grid-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Responsive scaling for mobile phones */
        @media (max-width: 600px) {
          .banners-grid-wrapper {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .promo-banner-card {
          position: relative;
          height: 240px; /* Adjusted height so 3 in a row scales beautifully */
          border-radius: 16px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
          transition: transform 0.25s ease;
        }

        .promo-banner-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        /* Vignette overlay makes white typography incredibly readable */
        .promo-banner-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%);
          z-index: 1;
        }

        .banner-text-info {
          position: relative;
          z-index: 2;
          color: #ffffff;
        }

        .banner-text-info h3 {
          margin: 0 0 4px 0;
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.3px;
        }

        .banner-text-info p {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.9;
          font-weight: 500;
        }
      `}</style>

   
      <div className="banners-grid-wrapper">
        
      
        <div 
          className="promo-banner-card" 
          style={{ backgroundImage: "url('/1.jpg')" }}
        >
          <div className="banner-text-info">
            <h3>Explore the World</h3>
            <p>Best deals on international trips</p>
          </div>
        </div>
        
      
        <div 
          className="promo-banner-card" 
          style={{ backgroundImage: "url('/2.jpg')" }}
        >
          <div className="banner-text-info">
            <h3>Beach Getaways</h3>
            <p>Up to 40% off</p>
          </div>
        </div>

       
        <div 
          className="promo-banner-card" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800')" }}
        >
          <div className="banner-text-info">
            <h3>Mountain Escapes</h3>
            <p>From $99 / night</p>
          </div>
        </div>

      </div>
    </div>
  )
}