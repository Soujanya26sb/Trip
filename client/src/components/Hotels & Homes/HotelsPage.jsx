'use client'

import { useState, useEffect } from 'react'
import API from '@/utils/api'
import { FaStar, FaMapMarkerAlt, FaFilter, FaWifi, FaSwimmingPool, FaCoffee, FaSpa, FaHeart, FaChevronLeft, FaChevronRight, FaFire, FaCocktail, FaConciergeBell, FaTv, FaCreditCard, FaLock, FaCheckCircle, FaTimes } from 'react-icons/fa'
import './HotelsPage.css'

// Local hardcoded fallback data updated to use 4.jpg through 12.jpg exclusively
const hotelListings = [
  {
    id: "hotel-1",
    name: "The Grand Regal Luxury Resort & Urban Spa",
    location: "Connaught Place, New Delhi",
    zone: "Central Delhi",
    rating: 4.8,
    stars: 5,
    reviewsCount: 1240,
    basePrice: 6499,
    salePrice: 5199,
    stockLeft: 2,
    images: ["/4.jpg", "/5.jpg", "/6.jpg"],
    amenities: ["Free WiFi", "Infinity Pool", "Wellness Spa", "Artisan Breakfast"]
  },
  {
    id: "hotel-2",
    name: "Radisson Blu Elite Suites & Atrium",
    location: "Aerocity, New Delhi",
    zone: "Airport Zone",
    rating: 4.5,
    stars: 5,
    reviewsCount: 890,
    basePrice: 8200,
    salePrice: 7100,
    stockLeft: 4,
    images: ["/7.jpg", "/8.jpg", "/9.jpg"],
    amenities: ["Free WiFi", "Atrium Pool", "Artisan Breakfast"]
  },
  {
    id: "hotel-3",
    name: "The Bloom boutique Residency",
    location: "Saket, New Delhi",
    zone: "South Delhi",
    rating: 4.2,
    stars: 4,
    reviewsCount: 412,
    basePrice: 4800,
    salePrice: 3950,
    stockLeft: 1,
    images: ["/10.jpg", "/11.jpg", "/12.jpg"],
    amenities: ["Free WiFi", "Cafe Bar", "Gym Access"]
  },
  {
    id: "hotel-4",
    name: "Taj Palace Heritage Manor",
    location: "Chanakyapuri, New Delhi",
    zone: "Central Delhi",
    rating: 4.9,
    stars: 5,
    reviewsCount: 2310,
    basePrice: 14000,
    salePrice: 11500,
    stockLeft: 3,
    images: ["/4.jpg", "/8.jpg", "/12.jpg"],
    amenities: ["24/7 Butler", "Royal Spa", "Fine Dining", "Valet Parking"]
  },
  {
    id: "hotel-5",
    name: "Hyatt Regency Urban Oasis",
    location: "Bhikaji Cama Place, New Delhi",
    zone: "South Delhi",
    rating: 4.6,
    stars: 5,
    reviewsCount: 1675,
    basePrice: 9500,
    salePrice: 8200,
    stockLeft: 5,
    images: ["/5.jpg", "/7.jpg", "/9.jpg"],
    amenities: ["Free WiFi", "Olympic Pool", "Club Lounge"]
  }
];

export default function HotelsPage({ onBackToHome }) {
  const [priceFilter, setPriceFilter] = useState(12000);
  const [selectedZone, setSelectedZone] = useState('All');
  const [minStars, setMinStars] = useState(0);
  const [imgIndexes, setImgIndexes] = useState({});
  
  // Payment states
  const [selectedPaymentHotel, setSelectedPaymentHotel] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNextImg = (e, id, max) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndexes(prev => {
      const currentIndex = prev[id] || 0;
      const nextIndex = (currentIndex + 1) % max;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handlePrevImg = (e, id, max) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndexes(prev => {
      const currentIndex = prev[id] || 0;
      const prevIndex = (currentIndex - 1 + max) % max;
      return { ...prev, [id]: prevIndex };
    });
  };

  const handleBookNow = (hotel) => {
    setSelectedPaymentHotel(hotel);
    setPaymentSuccess(false);
    setIsProcessing(false);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const payload = {
  email: localStorage.getItem('trip_user_email') || 'anonymous@trip.com',
  itemName: selectedPaymentHotel.name,
  price: Math.round(selectedPaymentHotel.salePrice * 1.12),
  category: 'Hotel',
  details: JSON.stringify({
    location: selectedPaymentHotel.location,
    zone: selectedPaymentHotel.zone
  })
}

      const response = await API.post('/api/bookings', payload);
      if (response.status === 201 || response.status === 200) {
        setPaymentSuccess(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Transaction authorization failed. Verify database connectivity.');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    async function fetchLiveHotels() {
      try {
        setLoading(true);
        const response = await API.get('/api/hotels');
        
        const checkedData = response.data.map((hotel, index) => {
          // Dynamic loop mapping exclusively across your local 4.jpg to 12.jpg pool
          const availablePool = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];
          
          let img1 = `/${availablePool[(index * 3) % availablePool.length]}.jpg`;
          let img2 = `/${availablePool[((index * 3) + 1) % availablePool.length]}.jpg`;
          let img3 = `/${availablePool[((index * 3) + 2) % availablePool.length]}.jpg`;

          return {
            ...hotel,
            // Force interface to connect with your local images pool
            images: [img1, img2, img3]
          };
        });

        setHotels(checkedData);
      } catch (err) {
        console.error('Error connecting to inventory backend, using default assets:', err);
        setHotels(hotelListings);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveHotels();
  }, []);

  const filteredHotels = hotels.filter(h => {
    return h.salePrice <= priceFilter && 
           (selectedZone === 'All' || h.zone === selectedZone) &&
           (minStars === 0 || h.stars === minStars);
  });

  if (loading) {
    return (
      <div className="hotels-loading">
        Searching Live Database Clusters...
      </div>
    );
  }

  return (
    <div className="hotels-root">
      <div className="hotels-header">
        <div>
          <span onClick={onBackToHome} className="hotels-back-link">&lt; Home</span>
          <h1 className="hotels-title">Premium Stays & Curated Residences</h1>
        </div>
        <div className="hotels-meta-box">
          Showing <span className="hotels-meta-count">{filteredHotels.length} Properties</span>
        </div>
      </div>

      <div className="hotels-layout">
        <aside className="hotels-sidebar">
          <h3 className="hotels-filter-heading"><FaFilter color="#0066cc" /> Filter Workspaces</h3>
          
          <div className="hotels-filter-section">
            <h4 className="hotels-filter-label">Max Nightly Budget</h4>
            <input type="range" min="3000" max="15000" step="500" value={priceFilter} onChange={(e) => setPriceFilter(Number(e.target.value))} className="hotels-range-input" />
            <div className="hotels-filter-range-values"><span>₹3,000</span><span className="hotels-filter-range-current">Up to ₹{priceFilter.toLocaleString()}</span></div>
          </div>

          <div className="hotels-filter-section">
            <h4 className="hotels-filter-label">Metropolitan District Zone</h4>
            {['All', 'Central Delhi', 'Airport Zone', 'South Delhi'].map(zone => (
              <label key={zone} className="hotels-radio-option">
                <input type="radio" name="zone" checked={selectedZone === zone} onChange={() => setSelectedZone(zone)} className="hotels-radio-input" />
                <span>{zone}</span>
              </label>
            ))}
          </div>

          <div className="hotels-filter-section">
            <h4 className="hotels-filter-label">Hotel Tier Rating</h4>
            {[0, 5, 4].map(stars => (
              <label key={stars} className="hotels-radio-option">
                <input type="radio" name="stars" checked={minStars === stars} onChange={() => setMinStars(stars)} className="hotels-radio-input" />
                <span>{stars === 0 ? 'All Star Tiers' : `${stars} Star Luxury`}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="hotels-main-grid">
          {filteredHotels.map((hotel) => {
            const currentImgIdx = imgIndexes[hotel.id] || 0;
            const hasMultipleImages = hotel.images && hotel.images.length > 1;

            return (
              <div key={hotel.id} className="hotel-card">
                <div className="hotel-card-image">
                  <img src={hotel.images[currentImgIdx]} alt={hotel.name} className="hotel-image" />
                  {hotel.stockLeft <= 2 && <span className="hotel-stock-tag"><FaFire /> Only {hotel.stockLeft} Left!</span>}
                  
                  {hasMultipleImages && (
                    <>
                      <button onClick={(e) => handlePrevImg(e, hotel.id, hotel.images.length)} className="hotel-carousel-button left"><FaChevronLeft size={10} /></button>
                      <button onClick={(e) => handleNextImg(e, hotel.id, hotel.images.length)} className="hotel-carousel-button right"><FaChevronRight size={10} /></button>
                      
                      {/* Interactive slide tracker dots */}
                      <div className="hotel-carousel-dots">
                        {hotel.images.map((_, i) => (
                          <div key={i} className={"hotel-carousel-dot" + (i === currentImgIdx ? ' active' : '')} />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="hotel-card-body">
                  <div>
                    <div className="hotel-card-title-row">
                      <h3 className="hotel-name">{hotel.name}</h3>
                    </div>
                    <p className="hotel-location"><FaMapMarkerAlt color="#94a3b8" /> {hotel.location}</p>
                    <div className="hotel-amenities">
                      {hotel.amenities && hotel.amenities.map((amenity, idx) => (
                        <span key={idx} className="hotel-amenity-pill">{amenity}</span>
                      ))}
                    </div>
                  </div>

                  <div className="hotel-card-footer">
                    <div>
                      <span className="hotel-compare-price">₹{(hotel.basePrice || hotel.salePrice * 1.2).toLocaleString()}</span>
                      <div className="hotel-price">₹{hotel.salePrice.toLocaleString()}<span className="hotel-price-unit">/nt</span></div>
                    </div>
                    <button 
                      onClick={() => handleBookNow(hotel)}
                      className="hotel-book-button"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {/* SECURE CHECKOUT & PAYMENT MODAL GATEWAY */}
      {selectedPaymentHotel && (
        <div className="modal-overlay">
          <div className="modal-container">
            
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-row">
                <FaLock color="#16a34a" />
                <h2 className="modal-title">Secure Checkout</h2>
              </div>
              <button onClick={() => setSelectedPaymentHotel(null)} className="modal-close-button"><FaTimes size={18} /></button>
            </div>

            {/* Modal Body Content */}
            {!paymentSuccess ? (
              <form onSubmit={handlePaymentSubmit} className="modal-content">
                {/* Summary Box */}
                <div className="modal-summary">
                  <h4>{selectedPaymentHotel.name}</h4>
                  <p>{selectedPaymentHotel.location}</p>
                  <div className="modal-summary-row">
                    <span>Room Rate (1 Night)</span>
                    <span>₹{selectedPaymentHotel.salePrice.toLocaleString()}</span>
                  </div>
                  <div className="modal-summary-row modal-summary-line">
                    <span>Integrated CGST & Luxury Tax</span>
                    <span>₹{Math.round(selectedPaymentHotel.salePrice * 0.12).toLocaleString()}</span>
                  </div>
                  <div className="modal-summary-row modal-summary-total">
                    <span>Total Amount</span>
                    <span className="modal-summary-total-value">₹{Math.round(selectedPaymentHotel.salePrice * 1.12).toLocaleString()}</span>
                  </div>
                </div>

                {/* Mock Card Form Fields */}
                <div className="modal-field">
                  <label>Cardholder Name</label>
                  <input required type="text" placeholder="John Doe" className="modal-input" />
                </div>

                <div className="modal-field">
                  <label>Card Number</label>
                  <div className="modal-input-group">
                    <input required type="text" maxLength="19" placeholder="4532 •••• •••• 8824" className="modal-input modal-input-icon" />
                    <FaCreditCard className="modal-input-icon-svg" />
                  </div>
                </div>

                <div className="modal-two-column">
                  <div className="modal-field">
                    <label>Expiration Date</label>
                    <input required type="text" placeholder="MM/YY" maxLength="5" className="modal-input modal-input-center" />
                  </div>
                  <div className="modal-field">
                    <label>Security Code (CVV)</label>
                    <input required type="password" placeholder="•••" maxLength="3" className="modal-input modal-input-center" />
                  </div>
                </div>

                {/* Submit Action Button */}
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className={isProcessing ? 'modal-submit-button disabled' : 'modal-submit-button'}
                >
                  {isProcessing ? 'Authorizing Assets...' : `Pay ₹${Math.round(selectedPaymentHotel.salePrice * 1.12).toLocaleString()} Securely`}
                </button>
              </form>
            ) : (
              /* Success Message Layout View */
              <div className="modal-success-panel">
                <FaCheckCircle size={56} color="#16a34a" className="modal-success-icon" />
                <h3>Booking Confirmed!</h3>
                <p>Your stay at <strong>{selectedPaymentHotel.name}</strong> has been successfully locked in. An itinerary receipt has been dispatched to your email.</p>
                <button 
                  onClick={() => setSelectedPaymentHotel(null)}
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
