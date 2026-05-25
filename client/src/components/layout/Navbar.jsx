'use client'

import React from 'react'
import './styles/navbar.css'

export default function Navbar({ onLogout }) {

  return (
    <nav className="custom-premium-navbar">
      <div className="navbar-brand-logo-container">
        <div className="bird-icon-wrapper">
          <svg width="38" height="38" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
           
            <ellipse cx="32" cy="36" rx="13" ry="8" fill="#4c1d95"/>
           
            <path d="M19 34 C10 26, 4 30, 6 38 C10 35, 16 36, 19 38 Z" fill="#6d28d9"/>
           
            <path d="M45 34 C54 26, 60 30, 58 38 C54 35, 48 36, 45 38 Z" fill="#6d28d9"/>
         
            <circle cx="43" cy="30" r="6" fill="#4c1d95"/>
           
            <path d="M49 29 L54 31 L49 33 Z" fill="#7c3aed"/>
           
            <circle cx="45" cy="29" r="1.2" fill="#e9d5ff"/>
           
            <path d="M19 38 C14 42, 10 46, 8 44 C12 40, 16 40, 19 38 Z" fill="#5b21b6"/>
          </svg>
        </div>
        <div className="brand-text-wrap">
          <span className="brand-text-primary">Ethereal</span>
          <span className="brand-text-secondary">Escapes</span>
        </div>
      </div>

    
      <button className="navbar-logout-button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}
