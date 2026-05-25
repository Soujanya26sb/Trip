'use client'

import { useState } from 'react'
import { createBooking } from '@/utils/createBooking'
import { 
  FaRoute, FaClock, FaFilter, FaStar, 
  FaHeart, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, 
  FaUserShield, FaCheckCircle, FaSpinner
} from 'react-icons/fa'
import './PrivateToursPage.css'

const privateExperiences = [
  { 
    id: "t1", 
    title: "Heritage & Cultural Splendors of Old Goa Tour", 
    duration: "8 Hours", 
    location: "North Goa", 
    rating: 4.9,
    reviewsCount: 142,
    price: 6800, 
    oldPrice: 8500,
    discount: "20% OFF",
    images: [
      "/21.jpg", // This will now point correctly to your public/1.jpg
      "/22.jpg"
    ],
    tags: ["Best Seller", "Historic Guide"],
    inclusionTitle: "Historic Monuments & Forts Stops",
    inclusionSub: "Visit Reis Magos Fort, Basilica of Bom Jesus, and hidden Indo-Portuguese ancestral homes."
  },
  { 
    id: "t2", 
    title: "Fontainhas Latin Quarter Walking Odyssey & Tasting", 
    duration: "3 Hours", 
    location: "Panaji", 
    rating: 4.8,
    reviewsCount: 96,
    price: 2400, 
    oldPrice: 3200,
    discount: "25% OFF",
    images: [
      "/23.jpg",
      "/24.jpg"
    ],
    tags: ["Top Rated", "Food Tasting Included"],
    inclusionTitle: "Architectural & Local Culinary Exploration",
    inclusionSub: "Navigate dynamic colored lanes, Portuguese colonial estates, and 100-year-old bakeries."
  },
  { 
    id: "t3", 
    title: "Dudhsagar Waterfalls Wilderness Jeep Safari & Trek", 
    duration: "10 Hours", 
    location: "South Goa", 
    rating: 4.7,
    reviewsCount: 218,
    price: 8500, 
    oldPrice: 10500,
    discount: "19% OFF",
    images: [
      "/25.jpg",
      "/26.jpg"
    ],
    tags: ["Adventure", "National Park Pass"],
    inclusionTitle: "Bhagwan Mahavir Sanctuary Entry",
    inclusionSub: "Includes deep jungle 4x4 tracks, refreshing waterfall swimming lagoon, and a spice plantation lunch."
  },
  { 
    id: "t4", 
    title: "Private Luxury Catamaran Sunset Dinner Cruise", 
    duration: "4 Hours", 
    location: "Panaji", 
    rating: 5.0,
    reviewsCount: 64,
    price: 14500, 
    oldPrice: 18000,
    discount: "19% OFF",
    images: [
      "/27.jpg",
      "/28.jpg"
    ],
    tags: ["Premium Luxury", "Romantic Choice"],
    inclusionTitle: "Exclusive Yacht Charter Package",
    inclusionSub: "Live barbecue onboard, premium beverages, personal sound system, and Mandovi River routes."
  }
];

export default function PrivateToursPage({ onBackToHome }) {
  const [selectedLoc, setSelectedLoc] = useState('All');
  const [maxBudget, setMaxBudget] = useState(15000);
  const [imgIndexes, setImgIndexes] = useState({});
  const [bookingStatus, setBookingStatus] = useState({ loading: false, success: false, currentTour: null });

  const handleNextImg = (e, id, max) => {
    e.stopPropagation();
    setImgIndexes(prev => ({ ...prev, [id]: ((prev[id] || 0) + 1) % max }));
  };

  const handlePrevImg = (e, id, max) => {
    e.stopPropagation();
    setImgIndexes(prev => ({ ...prev, [id]: ((prev[id] || 0) - 1 + max) % max }));
  };

  // Mock Payment & Checkout Processor Function
  const handleBooking = async (tour) => {
    setBookingStatus({ loading: true, success: false, currentTour: tour });
    
    // Simulate API connection verification and secure payment gateway handshakes
    try {
  await createBooking({
    itemName: tour.title,
    price: tour.price,
    category: 'Private Tours',
    details: JSON.stringify({
      duration: tour.duration,
      region: tour.region,
      departureDate: tour.departureDate
    })
  })

  setBookingStatus({
    loading: false,
    success: true,
    currentTour: tour
  })

} catch (error) {

  console.error(error)

  alert('Booking failed. Please try again.')

  setBookingStatus({
    loading: false,
    success: false,
    currentTour: null
  })
}
  };

  const filteredTours = privateExperiences.filter(t => 
    (selectedLoc === 'All' || t.location === selectedLoc) && t.price <= maxBudget
  );

  return (
    <div className="private-tours-root">
      <div className="private-tours-header">
        <div>
          <span onClick={onBackToHome} className="private-tours-back-link">&lt; Home</span>
          <h1 className="private-tours-title">Private Curated Tours & Experiences</h1>
        </div>
        <div className="private-tours-summary">
          Available Paths: <strong>{filteredTours.length} Experiences loaded</strong>
        </div>
      </div>

      <div className="private-tours-layout">
        <aside className="private-tours-sidebar">
          <div className="private-tours-filter-heading">
            <FaFilter />
            <h3>Refine Your Journey</h3>
          </div>

          <div className="private-tours-field-group">
            <h4 className="private-tours-filter-title">Max Price Per Group</h4>
            <input
              type="range"
              min="2000"
              max="15000"
              step="500"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="private-tours-range"
            />
            <div className="private-tours-range-summary">
              <span>₹2,000</span>
              <span className="private-tours-highlight">Under ₹{maxBudget.toLocaleString()}</span>
            </div>
          </div>

          <div className="private-tours-divider">
            <h4 className="private-tours-filter-title">Excursion Hub Hubs</h4>
            {['All', 'North Goa', 'South Goa', 'Panaji'].map(loc => (
              <label key={loc} className="private-tours-radio-row">
                <input
                  type="radio"
                  name="loc"
                  checked={selectedLoc === loc}
                  onChange={() => setSelectedLoc(loc)}
                  className="private-tours-radio"
                />
                <span className={`private-tours-radio-label ${selectedLoc === loc ? 'active' : ''}`}>
                  {loc === 'All' ? 'All Locations' : loc}
                </span>
              </label>
            ))}
          </div>
        </aside>

        <main className="private-tours-main">
          {filteredTours.map((tour) => {
            const currentImgIdx = imgIndexes[tour.id] || 0;
            const isTourProcessing = bookingStatus.loading && bookingStatus.currentTour?.id === tour.id;

            return (
              <article key={tour.id} className="private-tours-card">
                <div className="private-tours-image-wrapper">
                  <img src={tour.images[currentImgIdx]} alt={tour.title} />
                  <div className="private-tours-tags">
                    {tour.tags.map((tag, idx) => (
                      <span key={idx} className={`private-tours-tag ${idx === 0 ? 'primary' : 'secondary'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="private-tours-like">
                    <FaHeart size={14} />
                  </button>
                  <button onClick={(e) => handlePrevImg(e, tour.id, tour.images.length)} className="private-tours-carousel-button left">
                    <FaChevronLeft size={10} />
                  </button>
                  <button onClick={(e) => handleNextImg(e, tour.id, tour.images.length)} className="private-tours-carousel-button right">
                    <FaChevronRight size={10} />
                  </button>
                </div>

                <div className="private-tours-body">
                  <div>
                    <div className="private-tours-meta-top">
                      <span className="private-tours-location"><FaMapMarkerAlt /> {tour.location}</span>
                      <div className="private-tours-rating">
                        <FaStar />
                        <span>{tour.rating}</span>
                        <span>({tour.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="private-tours-card-title">{tour.title}</h3>

                    <div className="private-tours-badges">
                      <span className="private-tours-badge"><FaClock /> {tour.duration} Bound</span>
                      <span className="private-tours-badge private-tours-group-badge"><FaUserShield /> Private Group</span>
                    </div>

                    <div className="private-tours-inclusion">
                      <div className="private-tours-inclusion-title">
                        <FaRoute /> {tour.inclusionTitle}
                      </div>
                      <div className="private-tours-inclusion-text">
                        {tour.inclusionSub}
                      </div>
                    </div>

                    <div className="private-tours-note"><FaCheckCircle /> Dedicated Local Chauffeur & Expert Specialist Guide Included</div>
                  </div>

                  <div className="private-tours-footer">
                    <div>
                      <div className="private-tours-price-row">
                        <span className="private-tours-price-old">₹{tour.oldPrice.toLocaleString()}</span>
                        <span className="private-tours-discount-pill">{tour.discount}</span>
                      </div>
                      <div className="private-tours-price-amount">
                        ₹{tour.price.toLocaleString()}
                        <span className="private-tours-price-subtext"> /group</span>
                      </div>
                    </div>
                    <button
                      className={`private-tours-cta ${isTourProcessing ? 'loading' : ''}`}
                      disabled={bookingStatus.loading}
                      onClick={() => handleBooking(tour)}
                    >
                      {isTourProcessing ? (
                        <>
                          <FaSpinner className="animate-spin" /> Processing...
                        </>
                      ) : (
                        'Book Now'
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </main>
      </div>

      {bookingStatus.success && (
        <div className="private-tours-modal-backdrop">
          <div className="private-tours-modal">
            <div className="private-tours-modal-icon">
              <FaCheckCircle size={32} />
            </div>
            <h2 className="private-tours-modal-title">Payment Confirmed!</h2>
            <p className="private-tours-modal-desc">
              Your reservation request for <strong>{bookingStatus.currentTour?.title}</strong> has been secured for your custom private group hub.
            </p>
            <div className="private-tours-modal-actions">
              <button
                className="private-tours-modal-primary"
                onClick={() => setBookingStatus({ loading: false, success: false, currentTour: null })}
              >
                Explore More Private Trips
              </button>
              <button className="private-tours-modal-secondary" onClick={onBackToHome}>
                Go to Main Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
