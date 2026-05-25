'use client'

import React, { useState } from 'react'
import { coupons } from '@/data/dummyData'

export default function CouponCards() {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }).catch(err => {
      console.error('Failed to copy code:', err)
    })
  }

  // Pure CSS Theme Mapping for modern accents
  const getThemeColors = (title) => {
    const t = title.toLowerCase()
    if (t.includes('hotel')) return { bg: '#e8f0fe', text: '#1a73e8', icon: '📋' }
    if (t.includes('flight')) return { bg: '#e1f5fe', text: '#0288d1', icon: '✈️' }
    if (t.includes('attraction') || t.includes('tour')) return { bg: '#e8f5e9', text: '#2e7d32', icon: '🎟️' }
    return { bg: '#fffde7', text: '#f57f17', icon: '🚗' }
  }

  return (
    <div className="coupon-container">
      <style>{`
        .coupon-container {
          max-width: 1400px; /* Increased width to perfectly fit 4 cards in a row */
          margin: 60px auto;
          padding: 0 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .coupon-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .coupon-badge {
          background-color: #ffebeb;
          color: #ff3333;
          padding: 6px 16px;
          border-radius: 50px;
          font-weight: bold;
          font-size: 0.85rem;
          display: inline-block;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }
        .coupon-header h2 {
          font-size: 2.2rem;
          color: #1a1a1a;
          margin: 0 0 10px 0;
          font-weight: 700;
        }
        .coupon-header p {
          color: #666;
          margin: 0;
          font-size: 1.05rem;
        }
        
        /* Forces all 4 columns into exactly 1 row on desktops */
        .coupon-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); 
          gap: 20px;
        }

        /* Responsive safety: Switch to stacked layout on smaller screens or mobile */
        @media (max-width: 992px) {
          .coupon-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 576px) {
          .coupon-grid {
            grid-template-columns: 1fr;
          }
        }

        .custom-ticket {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
          border: 1px solid #f0f0f0;
        }
        .custom-ticket:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
        }
        .icon-badge {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
          font-size: 1.8rem;
        }
        .ticket-title {
          font-size: 1.1rem;
          color: #333;
          margin: 0 0 4px 0;
          font-weight: 600;
        }
        .ticket-discount {
          font-size: 1.5rem;
          color: #1a1a1a;
          margin: 0 0 24px 0;
          font-weight: 800;
        }
        
        /* Dashed Internal Voucher Box */
        .coupon-box {
          background-color: #f8f9fa;
          border: 2px dashed #dee2e6;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .coupon-code-text {
          font-family: 'Courier New', Courier, monospace;
          font-size: 1.1rem;
          font-weight: bold;
          color: #222;
          letter-spacing: 1px;
        }
        .copy-action-btn {
          background-color: #1a1a1a;
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: background-color 0.2s ease;
          white-space: nowrap;
        }
        .copy-action-btn:hover {
          background-color: #333333;
        }
        .copy-action-btn.copied {
          background-color: #6c757d;
        }
        
        /* Ticket Voucher Semi-Circle Edge Cutouts */
        .custom-ticket::before, .custom-ticket::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: #f8f9fa; 
          border-radius: 50%;
          bottom: 31px;
        }
        .custom-ticket::before { left: -8px; }
        .custom-ticket::after { right: -8px; }
      `}</style>

      {/* Header Container Layout */}
      <div className="coupon-header">
        <span className="coupon-badge">LIMITED TIME OFFERS</span>
        <h2>Exclusive Deals & Coupons</h2>
        <p>Apply these promo codes at checkout to unlock massive savings on your next itinerary.</p>
      </div>

    
      <div className="coupon-grid">
        {coupons.map((c) => {
          const theme = getThemeColors(c.title)
          return (
            <div className="custom-ticket" key={c.id}>
              <div>
                
                <div className="icon-badge" style={{ backgroundColor: theme.bg }}>
                  {theme.icon}
                </div>
                <h5 className="ticket-title">{c.title}</h5>
                <h3 className="ticket-discount">{c.discount}</h3>
              </div>
              
            
              <div className="coupon-box">
                <span className="coupon-code-text">{c.code}</span>
                <button 
                  className={`copy-action-btn ${copiedId === c.id ? 'copied' : ''}`}
                  onClick={() => handleCopy(c.code, c.id)}
                >
                  {copiedId === c.id ? '📋 Copied!' : '✂️ Copy'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}