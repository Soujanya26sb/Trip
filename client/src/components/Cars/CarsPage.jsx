'use client'

import { useState, useEffect } from 'react'
import { createBooking } from '@/utils/createBooking'
import API from '@/utils/api'
import { 
  FaCar, FaGasPump, FaCogs, FaUserAlt, FaSuitcase, FaFilter, 
  FaHeart, FaChevronLeft, FaChevronRight, FaStar, FaCheckCircle, 
  FaShieldAlt, FaTachometerAlt, FaBuilding, FaTimes, FaCreditCard, FaCalendarDay
} from 'react-icons/fa'
import './CarsPage.css'

const createTransactionId = () =>
  'TXN-' +
  Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()

const carFleet = [
  {
    id: "c1",
    name: "Maruti Swift / Hyundai i20 Fleet",
    category: "Hatchback",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 5,
    bags: 2,
    mileage: "Unlimited Kms",
    supplier: "ZoomCar Prime",
    rating: 4.4,
    reviewsCount: 312,
    pricePerDay: 1950,
    oldPrice: 2800,
    images: [
      "/18.jpg", 
      "/19.jpg",
      "/20.jpg"
    ],
    tags: ["Best Seller", "Fuel Efficient"]
  },
  {
    id: "c2",
    name: "Honda City / Hyundai Verna",
    category: "Sedan",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    bags: 3,
    mileage: "Unlimited Kms",
    supplier: "Avis India",
    rating: 4.7,
    reviewsCount: 185,
    pricePerDay: 3800,
    oldPrice: 4500,
    images: [
      "/20.jpg",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600"
    ],
    tags: ["Top Choice", "Instant Booking"]
  },
  {
    id: "c3",
    name: "Mahindra Scorpio-N / XUV700",
    category: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 7,
    bags: 4,
    mileage: "Up to 500 Kms/day",
    supplier: "MyChoize Rentals",
    rating: 4.8,
    reviewsCount: 429,
    pricePerDay: 5490,
    oldPrice: 6800,
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600"
    ],
    tags: ["Trending", "All-Terrain"]
  },
  {
    id: "c4",
    name: "Toyota Fortuner Legender 4x4",
    category: "Luxury",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 7,
    bags: 5,
    mileage: "Unlimited Kms",
    supplier: "Sudarshan Executive",
    rating: 4.9,
    reviewsCount: 96,
    pricePerDay: 9200,
    oldPrice: 11500,
    images: [
      "https://images.unsplash.com/photo-1582639590011-f5a8c20d6300?w=600",
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600"
    ],
    tags: ["Premium Tier", "Chauffeur Optional"]
  },
  {
    id: "c5",
    name: "BMW 5 Series Executive Sedan",
    category: "Luxury",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    bags: 3,
    mileage: "Unlimited Kms",
    supplier: "Hertz Prestige",
    rating: 4.9,
    reviewsCount: 64,
    pricePerDay: 14500,
    oldPrice: 18000,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600"
    ],
    tags: ["Elite Class", "Zero Deposit"]
  },
  {
    id: "c6",
    name: "Kia Carens / Maruti Ertiga",
    category: "MUV",
    transmission: "Manual",
    fuel: "CNG / Petrol",
    seats: 7,
    bags: 3,
    mileage: "Up to 300 Kms/day",
    supplier: "ZoomCar Prime",
    rating: 4.3,
    reviewsCount: 192,
    pricePerDay: 3200,
    oldPrice: 4000,
    images: [
      "https://images.unsplash.com/photo-1632245889027-ea226ed1c15c?w=600",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600"
    ],
    tags: ["Great Value", "Family Car"]
  },
  {
    id: "c7",
    name: "Tata Nexon EV Max",
    category: "SUV",
    transmission: "Automatic",
    fuel: "Electric",
    seats: 5,
    bags: 3,
    mileage: "Full Range Included",
    supplier: "BluSmart Fleet",
    rating: 4.6,
    reviewsCount: 114,
    pricePerDay: 4100,
    oldPrice: 5200,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=600"
    ],
    tags: ["Eco-Friendly", "Quiet Drive"]
  }
];

export default function CarsPage({ onBackToHome }) {
  const [transmissionType, setTransmissionType] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [imgIndexes, setImgIndexes] = useState({});
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCar, setSelectedCar] = useState(null);
  const [rentalDays, setRentalDays] = useState(3);
  const [paymentStatus, setPaymentStatus] = useState('idle'); 
  const [txnId, setTxnId] = useState('');

  const handleNextImg = (e, id, max) => {
    e.stopPropagation();
    setImgIndexes(prev => {
      const currentIndex = prev[id] !== undefined ? prev[id] : 0;
      return { 
        ...prev, 
        [id]: (currentIndex + 1) % max 
      };
    });
  };

  const handlePrevImg = (e, id, max) => {
    e.stopPropagation();
    setImgIndexes(prev => {
      const currentIndex = prev[id] !== undefined ? prev[id] : 0;
      return { 
        ...prev, 
        [id]: (currentIndex - 1 + max) % max 
      };
    });
  };

  const handleSelectThumbnail = (e, carId, index) => {
    e.stopPropagation();
    setImgIndexes(prev => ({ ...prev, [carId]: index }));
  };

  const openCheckout = (car) => {
    setSelectedCar(car);
    setRentalDays(3);
    setPaymentStatus('idle');
    setTxnId('');
  };

  const executeSimulatedPayment = async () => {

  try {

    setPaymentStatus('processing')

    const generatedTxn = createTransactionId()

    await createBooking({
      itemName: selectedCar.name,
      price: finalPayable,
      category: 'Cars',
      details: JSON.stringify({
        rentalDays,
        transmission: selectedCar.transmission,
        fuel: selectedCar.fuel,
        supplier: selectedCar.supplier,
        seats: selectedCar.seats
      })
    })

    setTxnId(generatedTxn)

    setPaymentStatus('success')

  } catch (error) {

    console.error(error)

    alert('Car booking failed. Please try again.')

    setPaymentStatus('idle')
  }
}

  useEffect(() => {
    async function fetchLiveCars() {
      try {
        setLoading(true);
        const response = await API.get('/api/cars');
        setCars(response.data);
      } catch (err) {
        console.error('Failed fetching car inventory:', err);
        setCars(carFleet);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveCars();
  }, []);

  const filteredCars = cars.filter(car => {
    return (transmissionType === 'All' || car.transmission === transmissionType) &&
           (categoryFilter === 'All' || car.category === categoryFilter) &&
           (fuelFilter === 'All' || car.fuel.includes(fuelFilter)) &&
           car.pricePerDay <= maxPrice;
  });

  const baseTotal = selectedCar ? selectedCar.pricePerDay * rentalDays : 0;
  const gstAmount = Math.round(baseTotal * 0.18);
  const securityDeposit = selectedCar ? (selectedCar.tags.includes('Zero Deposit') ? 0 : 3000) : 0;
  const finalPayable = baseTotal + gstAmount + securityDeposit;

  if (loading) {
    return (
      <div className="cars-loading">Loading live car inventory...</div>
    );
  }

  return (
    <div className="cars-root">
      <div className="cars-header">
        <div>
          <span onClick={onBackToHome} className="cars-back-link">&lt; Home</span>
          <h1 className="cars-title">Self-Drive Rental Fleets</h1>
        </div>
        <div className="cars-summary">
          Available Fleets: <span className="cars-meta">{filteredCars.length} Models matched</span>
        </div>
      </div>

      <div className="cars-layout">
        <aside className="cars-sidebar">
          <div className="cars-filter-heading">
            <FaFilter className="cars-filter-icon" />
            <h3 className="cars-filter-title">Refine Fleet Search</h3>
          </div>

          <div className="cars-filter-section">
            <h4 className="cars-filter-label">Daily Rental Matrix</h4>
            <input
              type="range"
              min="1500"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="cars-range-input"
            />
            <div className="cars-range-meta">
              <span>₹1,500</span>
              <span className="cars-summary-pill">Under ₹{maxPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="cars-sidebar-divider">
            <h4 className="cars-filter-label">Transmission System</h4>
            {['All', 'Manual', 'Automatic'].map((gear) => (
              <label key={gear} className="cars-radio-label">
                <input
                  type="radio"
                  name="gear"
                  checked={transmissionType === gear}
                  onChange={() => setTransmissionType(gear)}
                  className="cars-radio-input"
                />
                <span>{gear} Engines</span>
              </label>
            ))}
          </div>

          <div className="cars-sidebar-divider">
            <h4 className="cars-filter-label">Vehicle Category Class</h4>
            {['All', 'Hatchback', 'Sedan', 'SUV', 'Luxury', 'MUV'].map((cat) => (
              <label key={cat} className="cars-radio-label">
                <input
                  type="radio"
                  name="cat"
                  checked={categoryFilter === cat}
                  onChange={() => setCategoryFilter(cat)}
                  className="cars-radio-input"
                />
                <span>{cat} Blueprint</span>
              </label>
            ))}
          </div>

          <div className="cars-sidebar-divider">
            <h4 className="cars-filter-label">Engine Fuel Core</h4>
            {['All', 'Petrol', 'Diesel', 'Electric'].map((fuel) => (
              <label key={fuel} className="cars-radio-label">
                <input
                  type="radio"
                  name="fuel"
                  checked={fuelFilter === fuel}
                  onChange={() => setFuelFilter(fuel)}
                  className="cars-radio-input"
                />
                <span>{fuel === 'All' ? 'All Fuel Options' : fuel}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="cars-main-grid">
          {filteredCars.map((car) => {
            const currentImgIdx = imgIndexes[car.id] || 0;
            return (
              <div key={car.id} className="car-card">
                <div className="car-image-wrapper">
                  <img src={car.images[currentImgIdx]} alt={car.name} className="car-image" />

                  <div className="car-tag-list">
                    {car.tags.map((tag, idx) => (
                      <span key={idx} className={`car-tag ${idx === 0 ? 'car-tag-primary' : 'car-tag-secondary'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="car-wishlist-button">
                    <FaHeart size={14} />
                  </button>

                  <button onClick={(e) => handlePrevImg(e, car.id, car.images.length)} className="car-action-button left">
                    <FaChevronLeft size={10} />
                  </button>
                  <button onClick={(e) => handleNextImg(e, car.id, car.images.length)} className="car-action-button right">
                    <FaChevronRight size={10} />
                  </button>
                </div>

                <div className="car-thumb-row">
                  {car.images.map((imgUrl, thumbIdx) => (
                    <div
                      key={thumbIdx}
                      onClick={(e) => handleSelectThumbnail(e, car.id, thumbIdx)}
                      className={`car-thumb ${currentImgIdx === thumbIdx ? 'selected' : ''}`}
                    >
                      <img src={imgUrl} alt="" className="car-thumb-image" />
                    </div>
                  ))}
                </div>

                <div className="car-card-body">
                  <div>
                    <div className="car-card-header">
                      <span className="car-category">{car.category} Class</span>
                      <div className="car-rating-pill">
                        <FaStar className="car-rating-icon" />
                        <span>{car.rating}</span>
                      </div>
                    </div>

                    <h3 className="car-name">{car.name}</h3>

                    <div className="car-specs">
                      <span className="car-spec"><FaCogs className="car-spec-icon" /> {car.transmission}</span>
                      <span className="car-spec"><FaGasPump className="car-spec-icon" /> {car.fuel}</span>
                      <span className="car-spec"><FaUserAlt className="car-spec-icon" /> {car.seats} Seats</span>
                      <span className="car-spec"><FaSuitcase className="car-spec-icon" /> {car.bags} Boot Bags</span>
                    </div>

                    <div className="car-benefits">
                      <div className="car-benefit-text"><FaTachometerAlt className="car-benefit-icon" /> {car.mileage} Allowance Plan</div>
                      <div className="car-benefit-text car-benefit-supplier"><FaBuilding className="car-benefit-icon" /> Fleet Partner: <strong>{car.supplier}</strong></div>
                    </div>
                  </div>

                  <div className="car-card-footer">
                    <div>
                      <span className="car-old-price">₹{car.oldPrice.toLocaleString()}</span>
                      <div className="car-price">
                        ₹{car.pricePerDay.toLocaleString()}
                        <span className="car-price-note">/day</span>
                      </div>
                    </div>
                    <button onClick={() => openCheckout(car)} className="car-cta">
                      Book Ride
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {selectedCar && (
        <div className="car-modal-backdrop">
          <div className="car-modal">
            {paymentStatus !== 'processing' && (
              <button onClick={() => setSelectedCar(null)} className="car-modal-close">
                <FaTimes size={12} />
              </button>
            )}

            {paymentStatus === 'idle' && (
              <div>
                <h2 className="car-modal-title">Confirm Reservation</h2>
                <p className="car-modal-copy">Review pricing and configuration options before payment validation.</p>

                <div className="car-modal-summary">
                  <img src={selectedCar.images[imgIndexes[selectedCar.id] || 0]} alt="" className="car-modal-image" />
                  <div>
                    <h4 className="car-modal-name">{selectedCar.name}</h4>
                    <span className="car-modal-subtitle">{selectedCar.transmission} • {selectedCar.fuel}</span>
                  </div>
                </div>

                <div className="car-modal-field">
                  <label className="car-modal-field-label">
                    <FaCalendarDay className="car-modal-icon" /> Duration Choice (Days)
                  </label>
                  <select
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Number(e.target.value))}
                    className="car-modal-select"
                  >
                    {[1, 2, 3, 4, 5, 7, 10, 14].map((day) => (
                      <option key={day} value={day}>{day} {day === 1 ? 'Day Rental' : 'Days Rental'}</option>
                    ))}
                  </select>
                </div>

                <div className="car-modal-totals">
                  <div className="car-modal-row">
                    <span>Base Rent (₹{selectedCar.pricePerDay.toLocaleString()} × {rentalDays} days)</span>
                    <span className="car-modal-detail">₹{baseTotal.toLocaleString()}</span>
                  </div>
                  <div className="car-modal-row">
                    <span>Statutory Transportation GST (18%)</span>
                    <span className="car-modal-detail">₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="car-modal-row">
                    <span>Refundable Security Deposit</span>
                    <span className={`car-modal-detail ${securityDeposit === 0 ? 'car-modal-success-text' : ''}`}>
                      {securityDeposit === 0 ? 'Zero Deposit' : `₹${securityDeposit.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="car-modal-total-row">
                    <span>Total Amount Payable</span>
                    <span className="car-modal-total-amount">₹{finalPayable.toLocaleString()}</span>
                  </div>
                </div>

                <button onClick={executeSimulatedPayment} className="car-modal-submit">
                  <FaCreditCard /> Proceed to Secure Checkout
                </button>
              </div>
            )}

            {paymentStatus === 'processing' && (
              <div className="car-modal-status">
                <h3>Authorizing Transaction</h3>
                <p>Communicating with secure core payment gateways. Do not reload.</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="car-modal-success">
                <div className="car-modal-success-icon">
                  <FaCheckCircle size={32} />
                </div>
                <h3 className="car-modal-success-title">Booking Confirmed!</h3>
                <p className="car-modal-success-copy">Your ride allocation receipt and instructions have been provisioned.</p>

                <div className="car-modal-success-card">
                  <div className="car-modal-row">
                    <span>Reference ID:</span>
                    <strong>{txnId}</strong>
                  </div>
                  <div className="car-modal-row">
                    <span>Assigned Fleet:</span>
                    <strong>{selectedCar.name}</strong>
                  </div>
                  <div className="car-modal-row">
                    <span>Total Paid:</span>
                    <strong className="car-modal-success-text">₹{finalPayable.toLocaleString()}</strong>
                  </div>
                  <div className="car-modal-row">
                    <span>Provider Supplier:</span>
                    <strong>{selectedCar.supplier}</strong>
                  </div>
                </div>

                <button onClick={() => setSelectedCar(null)} className="car-modal-success-button">
                  Dismiss Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

