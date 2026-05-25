'use client'

export default function AppBanner() {
  return (
    <div className="section app-banner-section">
      <div className="app-banner">
        <div className="app-banner-text">
          <h2>Get the Trip.com App</h2>
          <p>Book on the go. Get exclusive app-only deals and manage your trips anywhere.</p>
          <div className="app-buttons">
            <button className="app-btn" suppressHydrationWarning>App Store</button>
            <button className="app-btn" suppressHydrationWarning>Google Play</button>
          </div>
        </div>
        <div className="app-banner-img">
          <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400" alt="App" />
        </div>
      </div>
    </div>
  )
}
