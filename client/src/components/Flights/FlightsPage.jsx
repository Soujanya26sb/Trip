'use client'

import { useState, useEffect } from 'react'
import API from '@/utils/api'
import { FaPlane, FaClock, FaFilter, FaSuitcase, FaUserCheck, FaChevronDown, FaCreditCard, FaLock, FaTimes, FaCheckCircle } from 'react-icons/fa'
import './FlightsPage.css'

const flightOffers = [
  { id: "f1", airline: "IndiGo Airways", flightNo: "6E-2134", depart: "06:15", arrive: "08:30", duration: "2h 15m", type: "Non-stop", price: 5999, stops: 0, cabin: "Economy Classic" },
  { id: "f2", airline: "Air India Elite", flightNo: "AI-805", depart: "09:00", arrive: "11:15", duration: "2h 15m", type: "Non-stop", price: 6450, stops: 0, cabin: "Economy Meal Plus" },
  { id: "f3", airline: "SpiceJet Premium", flightNo: "SG-342", depart: "13:45", arrive: "17:00", duration: "3h 15m", type: "1 Stop (Jaipur)", price: 4899, stops: 1, cabin: "Economy Saver" },
  { id: "f4", airline: "Vistara Luxury", flightNo: "UK-981", depart: "18:30", arrive: "20:45", duration: "2h 15m", type: "Non-stop", price: 8900, stops: 0, cabin: "Premium Club Class" },
  { id: "f5", airline: "Akasa Air Saver", flightNo: "QP-112", depart: "21:15", arrive: "23:40", duration: "2h 25m", type: "Non-stop", price: 5200, stops: 0, cabin: "Standard Economy" }
];

export default function FlightsPage({ onBackToHome }) {
  const [selectedCarrier, setSelectedCarrier] = useState('All');
  const [stopFilter, setStopFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);

  // Payment states
  const [activeCheckoutFlight, setActiveCheckoutFlight] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'success'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [txnId, setTxnId] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredFlights = flights.filter(f => {
    return (selectedCarrier === 'All' || f.airline === selectedCarrier) &&
           (stopFilter === 'All' || (stopFilter === '0' && f.stops === 0) || (stopFilter === '1' && f.stops > 0)) &&
           f.price <= maxPrice;
  });

  // Handle opening the payment checkout modal
  const handleInitiatePayment = (flight) => {
    setActiveCheckoutFlight(flight);
    setPaymentStep('form');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      alert('Please populate all payment credential inputs.');
      return;
    }
    setIsProcessingPayment(true);

    const txnGeneratedId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    const activeUserEmail = sessionStorage.getItem('trip_user_email') || 'anonymous@trip.com';

    try {
      await API.post('/api/bookings', {
  email: activeUserEmail,
  itemName: `${activeCheckoutFlight.airline} (${activeCheckoutFlight.flightNo})`,
  price: activeCheckoutFlight.price,
  category: 'Flight',
  details: `Cabin: ${activeCheckoutFlight.cabin} | Route: ${activeCheckoutFlight.depart} - ${activeCheckoutFlight.arrive}`,
  transactionId: txnGeneratedId
});

      setTxnId(txnGeneratedId);
      setPaymentStep('success');
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || 'Booking failed.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  useEffect(() => {
    async function fetchLiveFlights() {
      try {
        setLoading(true);
        const response = await API.get('/api/flights');
        setFlights(response.data);
      } catch (err) {
        console.error('Failed fetching live flights:', err);
        setFlights(flightOffers);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveFlights();
  }, []);

  if (loading) {
    return (
      <div className="flights-loading">
        Loading flight inventory from backend...
      </div>
    );
  }

  return (
    <div className="flights-root">
      <div className="flights-header">
        <span onClick={onBackToHome} className="flights-back-link">&lt; Home</span>
        <h1 className="flights-title">Air Fleet Departures</h1>
      </div>

      <div className="flights-layout">
        
        {/* COMPREHENSIVE FLIGHT SIDEBAR SUITE */}
        <aside className="flights-sidebar">
          <h3 className="flights-filter-heading"><FaFilter /> Refine Flight Fleet</h3>
          
          {/* Filter 1: Airline Carriers */}
          <div className="flights-filter-section">
            <h4 className="flights-filter-label">Air Carriers</h4>
            {['All', 'IndiGo Airways', 'Air India Elite', 'Vistara Luxury'].map(carrier => (
              <label key={carrier} className="flights-radio-option">
                <input type="radio" name="carrier" checked={selectedCarrier === carrier} onChange={() => setSelectedCarrier(carrier)} className="flights-radio-input" />
                <span>{carrier}</span>
              </label>
            ))}
          </div>

          {/* Filter 2: Stops Routine */}
          <div className="flights-filter-section flights-filter-divider">
            <h4 className="flights-filter-label">Route Nodes</h4>
            <label className="flights-radio-option">
              <input type="radio" name="stops" checked={stopFilter === 'All'} onChange={() => setStopFilter('All')} className="flights-radio-input" />
              <span>All Routings</span>
            </label>
            <label className="flights-radio-option">
              <input type="radio" name="stops" checked={stopFilter === '0'} onChange={() => setStopFilter('0')} className="flights-radio-input" />
              <span>Non-stop flights Only</span>
            </label>
            <label className="flights-radio-option">
              <input type="radio" name="stops" checked={stopFilter === '1'} onChange={() => setStopFilter('1')} className="flights-radio-input" />
              <span>1 or More Connecting Stops</span>
            </label>
          </div>

          {/* Filter 3: Budget Range Pricing */}
          <div className="flights-filter-section flights-filter-divider">
            <h4 className="flights-filter-label">Max Fare Threshold</h4>
            <input type="range" min="4500" max="10000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="flights-range-input" />
            <div className="flights-range-values">
              <span>Max Limit:</span>
              <span className="flights-range-value">₹{Number(maxPrice).toLocaleString()}</span>
            </div>
          </div>
        </aside>

        {/* FLIGHT RETAIL CARD GRID */}
        <main className="flights-main-grid">
          {filteredFlights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div>
                <div className="flight-card-header">
                  <div>
                    <h3 className="flight-name">{flight.airline}</h3>
                    <span className="flight-card-number">{flight.flightNo}</span>
                  </div>
                  <span className="flight-card-badge">{flight.cabin}</span>
                </div>

                {/* Route Vector Map */}
                <div className="flight-route">
                  <div className="flight-route-leg">
                    <span className="flight-label">{flight.depart}</span>
                    <small className="flight-meta">DEL</small>
                  </div>
                  <div className="flight-info">
                    <span className="flight-meta"><FaClock /> {flight.duration}</span>
                    <div className="flight-progress">
                      <FaPlane className="flight-progress-plane" />
                    </div>
                    <span className="flight-meta" style={{ color: flight.stops === 0 ? '#16a34a' : '#ea580c', fontWeight: 600 }}>{flight.type}</span>
                  </div>
                  <div className="flight-route-leg flight-route-arrival">
                    <span className="flight-label">{flight.arrive}</span>
                    <small className="flight-meta">BOM</small>
                  </div>
                </div>
              </div>

              <div className="flight-footer">
                <div>
                  <span className="flight-subtext">One-way Fare</span>
                  <div className="flight-price">₹{flight.price.toLocaleString()}</div>
                </div>
                <button 
                  onClick={() => handleInitiatePayment(flight)}
                  className="btn-primary"
                >
                  Select Seat
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* FULL SCREEN SECURE CHECKOUT & PAYMENT MODAL OVERLAY */}
      {activeCheckoutFlight && (
        <div className="flight-modal-wrapper">
          <div className="flight-modal">
            
            {/* Modal Header */}
            <div className="flight-modal-header">
              <div className="flight-modal-title-row">
                <FaLock className="flight-modal-lock" />
                <span className="flight-modal-title">Secure Air Checkout</span>
              </div>
              <button onClick={() => setActiveCheckoutFlight(null)} className="flight-modal-close">
                <FaTimes />
              </button>
            </div>

            {paymentStep === 'form' ? (
              <form onSubmit={handleConfirmPayment} className="flight-modal-body">
                {/* Micro Itinerary Summary */}
                <div className="flight-modal-summary">
                  <div className="flight-modal-summary-header">
                    <strong>{activeCheckoutFlight.airline}</strong>
                    <span className="flight-modal-flightno">{activeCheckoutFlight.flightNo}</span>
                  </div>
                  <div className="flight-modal-summary-meta">
                    <span>DEL ({activeCheckoutFlight.depart}) → BOM ({activeCheckoutFlight.arrive})</span>
                    <span>•</span>
                    <span>{activeCheckoutFlight.cabin}</span>
                  </div>
                </div>

                {/* Pricing Fare Matrix Breakdown */}
                <div className="flight-modal-pricing">
                  <div className="flight-modal-pricing-row">
                    <span>Base Ticket Fare</span>
                    <span>₹{(activeCheckoutFlight.price - 350).toLocaleString()}</span>
                  </div>
                  <div className="flight-modal-pricing-row">
                    <span>Integrated Fuel & Seat Opt Fee</span>
                    <span>₹350</span>
                  </div>
                  <div className="flight-modal-pricing-row flight-modal-pricing-total">
                    <span>Total Billable Amount</span>
                    <span className="flight-modal-pricing-value">₹{activeCheckoutFlight.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Mock Card Credentials Form Inputs */}
                <div className="flight-modal-field">
                  <label>Cardholder Number</label>
                  <div className="flight-modal-input-group">
                    <input 
                      type="text" 
                      placeholder="4321 •••• •••• 9876" 
                      maxLength="19"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="flight-modal-input flight-modal-input-icon"
                    />
                    <FaCreditCard className="flight-modal-input-icon-svg" />
                  </div>
                </div>

                <div className="flight-modal-field-grid">
                  <div className="flight-modal-field">
                    <label>Expiry (MM/YY)</label>
                    <input 
                      type="text" 
                      placeholder="11/29" 
                      maxLength="5"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      className="flight-modal-input"
                    />
                  </div>
                  <div className="flight-modal-field">
                    <label>CVV Code</label>
                    <input 
                      type="password" 
                      placeholder="•••" 
                      maxLength="3"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      required
                      className="flight-modal-input"
                    />
                  </div>
                </div>

                {/* Submit Payment Trigger Button */}
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className={isProcessingPayment ? 'flight-modal-submit disabled' : 'flight-modal-submit'}
                >
                  {isProcessingPayment ? (
                    <span>Authorizing Transactions...</span>
                  ) : (
                    <>
                      <FaLock size={12} /> Pay ₹{activeCheckoutFlight.price.toLocaleString()} & Confirm Seat
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Transaction Payment Success Notification Screen */
              <div className="flight-modal-success">
                <FaCheckCircle className="flight-modal-success-icon" />
                <h2>Booking Confirmed!</h2>
                <p>Your seat selection on <strong>{activeCheckoutFlight.airline} ({activeCheckoutFlight.flightNo})</strong> has been successfully registered and billed.</p>
                {txnId && (
                  <p className="flight-modal-txn">Transaction ID: <strong>{txnId}</strong></p>
                )}
                <button
                  onClick={() => setActiveCheckoutFlight(null)}
                  className="btn-primary"
                >
                  Back to Boarding Fleet
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
