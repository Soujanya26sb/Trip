'use client'

import { useState } from 'react'
import { createBooking } from '@/utils/createBooking'
import { FaHotel, FaPlane, FaFilter, FaCheckCircle, FaSpinner, FaLock } from 'react-icons/fa'
import './FlightHotelPage.css'

const bundlePackages = [
  { id: "b1", title: "Premium Escape: Goa Coastal Combo Pack", duration: "5 Days / 4 Nights", salePrice: 24999, type: 'Beachfront', rating: '4.8', hotelName: "Grand Hyatt Resort & Waterfront", flightInfo: "IndiGo Roundtrip Airfare", img: "/13.jpg" },
  { id: "b2", title: "Luxury Himalayan Solace Sanctuary Retreat", duration: "4 Days / 3 Nights", salePrice: 18450, type: 'Mountain', rating: '4.7', hotelName: "Ananda Spa Residency Hills", flightInfo: "Air India Regional Flights", img: "/14.jpg" },
  { id: "b3", title: "Heritage Palaces Royal Jaipur Journey", duration: "3 Days / 2 Nights", salePrice: 12900, type: 'Heritage', rating: '4.6', hotelName: "Rambagh Heritage Manor", flightInfo: "SpiceJet Flight Transfers", img: "/15.jpg" },
  { id: "b4", title: "Kerala Backwaters Houseboat Combo Experience", duration: "6 Days / 5 Nights", salePrice: 31200, type: 'Beachfront', rating: '4.9', hotelName: "Kumarakom Premium Lagoon Villa", flightInfo: "Vistara Direct Connections", img: "/16.jpg" }
];

export default function FlightHotelPage({ onBackToHome }) {
  const [themeType, setThemeType] = useState('All');
  const [maxBudget, setMaxBudget] = useState(35000);
  
  // Payment Gate States
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('idle'); 

  const filteredBundles = bundlePackages.filter(p => {
    return (themeType === 'All' || p.type === themeType) && p.salePrice <= maxBudget;
  });

  const handleBookNow = async (pkg) => {

  try {

    setSelectedPkg(pkg)
    setPaymentStatus('processing')

    await createBooking({
      itemName: pkg.title,
      price: pkg.salePrice,
      category: 'Flight + Hotel',
      details: JSON.stringify({
        duration: pkg.duration,
        hotelName: pkg.hotelName,
        flightInfo: pkg.flightInfo,
        packageType: pkg.type
      })
    })

    setPaymentStatus('success')

  } catch (error) {

    console.error(error)

    alert('Booking failed. Please try again.')

    setPaymentStatus('idle')
  }
}

  const closePaymentModal = () => {
    setPaymentStatus('idle');
    setSelectedPkg(null);
  };

  return (
    <div className="flight-hotel-root">
      <div className="flight-hotel-header">
        <span onClick={onBackToHome} className="flight-hotel-back-link">&lt; Home</span>
        <h1 className="flight-hotel-title">Vacation Bundles (Flight + Hotel)</h1>
      </div>

      <div className="flight-hotel-layout">
        <aside className="flight-hotel-sidebar">
          <h3 className="flight-hotel-filter-heading"><FaFilter /> Bundle Filter Suite</h3>

          <div className="flight-hotel-filter-group">
            <h4 className="flight-hotel-filter-label">Destination Theme</h4>
            {['All', 'Beachfront', 'Mountain', 'Heritage'].map((theme) => (
              <label key={theme} className="flight-hotel-radio-label">
                <input
                  type="radio"
                  name="theme"
                  checked={themeType === theme}
                  onChange={() => setThemeType(theme)}
                  className="flight-hotel-radio-input"
                />
                <span>{theme} Escapes</span>
              </label>
            ))}
          </div>

          <div className="flight-hotel-sidebar-divider">
            <h4 className="flight-hotel-filter-label">Total Package Cost</h4>
            <input
              type="range"
              min="10000"
              max="35000"
              step="1000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="flight-hotel-range-input"
            />
            <div className="flight-hotel-range-meta">
              <span>Limit:</span>
              <span className="flight-hotel-range-value">₹{Number(maxBudget).toLocaleString()}</span>
            </div>
          </div>
        </aside>

        <main className="flight-hotel-main">
          {filteredBundles.map((pkg) => (
            <div key={pkg.id} className="bundle-card">
              <div>
                <div className="bundle-image">
                  <img src={pkg.img} alt="" />
                  <span className="bundle-badge">{pkg.duration}</span>
                  <span className="bundle-rating">★ {pkg.rating}</span>
                </div>
                <div className="bundle-content">
                  <h3 className="bundle-title">{pkg.title}</h3>
                  <div className="bundle-details">
                    <div className="bundle-detail-item"><FaHotel className="bundle-detail-icon" /> <span>{pkg.hotelName}</span></div>
                    <div className="bundle-detail-item"><FaPlane className="bundle-detail-icon" /> <span>{pkg.flightInfo}</span></div>
                  </div>
                </div>
              </div>

              <div className="bundle-price-row">
                <span className="bundle-deal-pill"><FaCheckCircle /> Protected Deal</span>
                <div>
                  <div className="bundle-price">₹{pkg.salePrice.toLocaleString()}</div>
                  <button onClick={() => handleBookNow(pkg)} className="bundle-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      {paymentStatus !== 'idle' && (
        <div className="flight-hotel-modal-backdrop">
          <div className="flight-hotel-modal">
            {paymentStatus === 'processing' && (
              <div>
                <FaSpinner className="spinner-loader" />
                <h3>Processing Secure Payment</h3>
                <p>Please hold tight. We are executing your booking credentials with partner airlines and hoteliers safely.</p>
                <div className="flight-hotel-note"><FaLock size={11} /> 256-Bit Encrypted Secure checkout</div>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div>
                <div className="modal-icon-circle">
                  <FaCheckCircle className="flight-hotel-success-icon" />
                </div>
                <h3>Booking Confirmed!</h3>
                <p className="flight-hotel-success-copy">Payment Received: ₹{selectedPkg?.salePrice.toLocaleString()}</p>

                <div className="flight-hotel-success-card">
                  <div className="flight-hotel-success-row">
                    <span className="flight-hotel-success-label">{selectedPkg?.title}</span>
                  </div>
                  <div className="flight-hotel-success-row"><span>Stay:</span> <strong>{selectedPkg?.hotelName}</strong></div>
                  <div className="flight-hotel-success-row"><span>Transit:</span> <strong>{selectedPkg?.flightInfo}</strong></div>
                </div>

                <button onClick={closePaymentModal} className="confirm-button">Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
