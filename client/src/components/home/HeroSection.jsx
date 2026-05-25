'use client'

import SearchTabs from './SearchTabs'

export default function HeroSection() {
  return (
    <div className="hero-wrapper">
      <div className="hero-banner">
        <div className="hero-overlay">
          <h1>Your Trip Starts Here</h1>
          <div className="hero-sub">
            <span>✔ Secure payment</span>
            <span>|</span>
            <span>✔ Support in approx. 30s</span>
          </div>
        </div>
      </div>
      <SearchTabs />
    </div>
  )
}
