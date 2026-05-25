'use client'

import React from 'react'
import './styles/footer.css'

export default function Footer() {
  return (
    <footer className="slim-centered-footer">
      {/* Structured information block stacked perfectly in center order */}
      <div className="footer-info-stack">
        
        {/* 1. Logo Name */}
        <h3 className="footer-logo-text">Ethereal Escapes</h3>

       
        <p className="footer-trip-paragraph">
          Your trusted global travel partner for effortlessly booking luxury hotels, budget flights, and unforgettable getaways. Explore the wonders of nature and organize your next dream destination with absolute ease.
        </p>

        {/* 3. Contact Email */}
        <a href="mailto:sbsoujanyasbsb@gmail.com" className="footer-email-link">
          sbsoujanyasbsb@gmail.com
        </a>

      </div>
    </footer>
  )
}
