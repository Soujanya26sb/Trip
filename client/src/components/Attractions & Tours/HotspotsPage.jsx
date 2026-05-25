'use client'

import { useState } from 'react'
import { createBooking } from '@/utils/createBooking'
import { 
  FaMapMarkerAlt, FaSearch, FaChevronLeft, FaStar,
  FaComments, FaHeart, FaPhone, FaClock,
  FaTicketAlt, FaCheckCircle
} from 'react-icons/fa'
import './HotspotsPage.css'

const tajMahalImage = "/35%20%282%29.jpg"

const attractionsData = [
  { 
    id: 1, 
    name: "Taj Mahal Complex", 
    location: "Agra, Uttar Pradesh", 
    category: "Historic Heritage", 
    rating: 4.9,
    reviews: ["Breathtaking at sunrise!", "Crowded but absolutely essential.", "The guide tracking system worked flawlessly."], 
    tags: ["Monument", "Photography"],
    description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the Yamuna river in Agra, India. It is considered one of the seven wonders of the world.",
    visitingHours: "6:00 AM - 7:00 PM",
    entryFee: "₹250 - ₹600",
    contact: "+91-562-2226431",
    image: tajMahalImage
  },
  { 
    id: 2, 
    name: "Gateway of India Waterfront", 
    location: "Mumbai, Maharashtra", 
    category: "Coastal Landmark", 
    rating: 4.7,
    reviews: ["Amazing sea breeze.", "Great starting point for the harbor tours."], 
    tags: ["Waterfront", "Iconic"],
    description: "An iconic arch-monument built in the early twentieth century in the city of Bombay, India. It faces the Arabian Sea at the Apollo Bunder area.",
    visitingHours: "Open 24 Hours",
    entryFee: "Free Entry",
    contact: "+91-22-22044040",
    image: "/36.jpg"
  },
  { 
    id: 3, 
    name: "Amber Palace Foothills", 
    location: "Jaipur, Rajasthan", 
    category: "Historic Heritage", 
    rating: 4.8,
    reviews: ["Incredible architecture!", "The elephant pathway and sheesh mahal were stunning."], 
    tags: ["Fort", "Palace"],
    description: "Located high on a hill, Amer Fort is the principal tourist attraction in Jaipur. The town of Amer was originally built by Meenas and later it was ruled by Raja Man Singh I.",
    visitingHours: "8:00 AM - 5:30 PM",
    entryFee: "₹100 - ₹500",
    contact: "+91-141-2530264",
    image: "/41.jpg"
  },
  { 
    id: 4, 
    name: "Qutub Minar Archaeological Area", 
    location: "South Delhi, Delhi", 
    category: "Historic Heritage", 
    rating: 4.6,
    reviews: ["Beautiful historical complex.", "Stunning stone carvings and green lawns."], 
    tags: ["Monument", "UNESCO Site"],
    description: "The Qutub Minar is a minaret and 'victory tower' that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of New Delhi.",
    visitingHours: "7:00 AM - 5:00 PM",
    entryFee: "₹40 - ₹600",
    contact: "+91-11-24698431",
    image: "/39.jpg"
  },
  { 
    id: 5, 
    name: "Munnar Tea Valley Estates", 
    location: "Munnar, Kerala", 
    category: "Nature Escape", 
    rating: 4.9,
    reviews: ["Serene and refreshing landscapes.", "The estate museum tour was wonderful."], 
    tags: ["Hill Station", "Greenery"],
    description: "Munnar is a town and hill station located in the Idukki district of the southwestern Indian state of Kerala, renowned for its rolling hills dotted with tea plantations.",
    visitingHours: "9:00 AM - 6:00 PM",
    entryFee: "₹150 Entry Ticket",
    contact: "+91-486-5230355",
    image: "/38.jpg"
  },
  { 
    id: 6, 
    name: "Hampi Ruins Complex", 
    location: "Hampi, Karnataka", 
    category: "Historic Heritage", 
    rating: 4.8,
    reviews: ["Like stepping onto ancient ground.", "The stone chariot looks magical during dusk."], 
    tags: ["Archaeology", "Temples"],
    description: "Hampi was the capital of the Vijayanagara Empire in the 14th century. It is a UNESCO World Heritage Site, filled with numerous ruined temple complexes and historical relics.",
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: "₹40 - ₹500",
    contact: "+91-839-4241223",
    image: "/37.jpg"
  },
  { 
    id: 7, 
    name: "Dal Lake Waterfront Promenade", 
    location: "Srinagar, Jammu & Kashmir", 
    category: "Coastal Landmark", 
    rating: 4.7,
    reviews: ["Shikara rides at dusk are unmatched.", "Floating markets were an incredible sight."], 
    tags: ["Lake", "Scenic View"],
    description: "Dal Lake is a lake in Srinagar, the summer capital of Jammu and Kashmir. It is an urban lake, which is the second-largest in the union territory, and integral to tourism.",
    visitingHours: "Open 24 Hours",
    entryFee: "Free Entry (Shikara Extra)",
    contact: "+91-194-2502272",
    image: "/40.jpg"
  }
]

export default function HotspotsPage({ onBackToHome }) {
  const [selectedSpot, setSelectedSpot] = useState(attractionsData[0])
  const [searchQuery, setSearchQuery] = useState('')

  // Q5 FIX: Dynamic Payment Module Checkout Trigger Simulation
  const handlePaymentCheckout = async (spot) => {
  try {
    await createBooking({
      itemName: spot.name,
      price: 499,
      category: 'Attractions & Tours',
      details: JSON.stringify({
        location: spot.location,
        category: spot.category
      })
    })

    alert('Booking successful')
  } catch (err) {
    alert('Payment failed')
  }
}

  const filteredSpots = attractionsData.filter(spot => 
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCategoryClass = (cat) => {
    if (cat === 'Historic Heritage') return 'historic'
    if (cat === 'Nature Escape') return 'nature'
    return 'coastal'
  }

  return (
    <div className="hotspots-root">
      <button onClick={onBackToHome} className="hotspots-back-button">
        <span className="hotspots-back-text">&lt; Home</span>
      </button>

      <div className="hotspots-hero">
        <h1 className="hotspots-hero-title">🎯 Explore Top Attractions & Hotspots</h1>
      </div>

      <div className="hotspots-grid">
        <div className="hotspots-card">
          <div className="hotspots-image">
            <img
              src={selectedSpot.image}
              alt={selectedSpot.name}
              onError={(e) => {
                if (selectedSpot.id === 1) e.currentTarget.src = tajMahalImage
              }}
            />
            <span className={`hotspots-category-badge ${getCategoryClass(selectedSpot.category)}`}>
              {selectedSpot.category}
            </span>
          </div>

          <div className="hotspots-card-body">
            <div className="hotspots-title-row">
              <div>
                <h2 className="hotspots-title">{selectedSpot.name}</h2>
                <p className="hotspots-meta-row">
                  <FaMapMarkerAlt className="hotspots-meta-icon location" />
                  {selectedSpot.location}
                </p>
                <p className="hotspots-meta-row">
                  <FaPhone className="hotspots-meta-icon phone" />
                  Helpline: {selectedSpot.contact}
                </p>
              </div>

              <div className="hotspots-rating-pill">
                <FaStar className="hotspots-rating-icon" />
                <span className="hotspots-rating-value">{selectedSpot.rating}</span>
              </div>
            </div>

            <p className="hotspots-story">{selectedSpot.description}</p>

            <div className="hotspots-tag-list">
              {selectedSpot.tags.map((tag, idx) => (
                <span key={idx} className="hotspots-tag">#{tag}</span>
              ))}
            </div>

            <div className="hotspots-booking-row">
              <div>
                <span className="hotspots-booking-label">Booking entry rates from</span>
                <div className="hotspots-booking-price">{selectedSpot.entryFee}</div>
              </div>
              <button onClick={() => handlePaymentCheckout(selectedSpot)} className="hotspots-booking-btn">
                <FaTicketAlt /> Book Tour Passes Now
              </button>
            </div>
          </div>
        </div>

        <div className="hotspots-sidebar">
          <div className="hotspots-filter-box">
            <FaSearch className="hotspots-search-icon" />
            <input
              type="text"
              placeholder="Filter hotspots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hotspots-search-input"
            />
          </div>

          <div className="hotspots-list">
            {filteredSpots.map((spot) => (
              <button
                type="button"
                key={spot.id}
                onClick={() => setSelectedSpot(spot)}
                className={`hotspots-spot-card ${selectedSpot.id === spot.id ? 'selected' : ''}`}
              >
                <span className={`hotspots-spot-status ${selectedSpot.id === spot.id ? 'active' : ''}`} />
                <div className="hotspots-spot-info">
                  <h4 className="hotspots-spot-title">{spot.name}</h4>
                  <p className="hotspots-spot-location">{spot.location}</p>
                </div>
              </button>
            ))}

            {filteredSpots.length === 0 && (
              <p className="hotspots-empty">No hotspots match your criteria.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
