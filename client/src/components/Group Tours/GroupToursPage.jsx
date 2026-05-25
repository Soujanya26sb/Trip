'use client'

import { useState, useEffect } from 'react'
import API from '@/utils/api'
import { createBooking } from '@/utils/createBooking'
import { 
  FaBus, FaHotel, FaUtensils, FaFilter, FaStar, 
  FaHeart, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, 
  FaUsers, FaCalendarAlt, FaCheckCircle, FaTags 
} from 'react-icons/fa'
import './GroupToursPage.css'

const clusterTours = [
  { 
    id: "g1", 
    title: "Gems of Kerala Scenic Routes & Backwaters Expedition", 
    duration: "6 Days / 5 Nights", 
    region: 'South India', 
    rating: 4.8,
    reviewsCount: 340,
    price: 13875, 
    oldPrice: 18500,
    discount: "25% OFF",
    cohortSize: 20,
    filledSeats: 14,
    departureDate: "Oct 12, 2026",
    images: [
      "/30.jpg",
      "/31.jpg"
    ],
    tags: ["Best Seller", "Community Pick"],
    itineraryHighlight: "Covers Munnar Tea Gardens, Alleppey Houseboat Cruise, and Cochin local heritage markets."
  },
  { 
    id: "g2", 
    title: "Golden Triangle Cultural Group Tour & Taj Mahal Odyssey", 
    duration: "5 Days / 4 Nights", 
    region: 'North India', 
    rating: 4.7,
    reviewsCount: 198,
    price: 11200, 
    oldPrice: 14900,
    discount: "24% OFF",
    cohortSize: 25,
    filledSeats: 21,
    departureDate: "Oct 18, 2026",
    images: [
      "/32.jpg",
      "/33.jpg"
    ],
    tags: ["Historical", "Instant Confirmation"],
    itineraryHighlight: "Complete guided access across historical monuments in Delhi, Agra, and the pink city of Jaipur."
  },
  { 
    id: "g3", 
    title: "Leh-Ladakh High Altitude Bike Cohort Adventure", 
    duration: "8 Days / 7 Nights", 
    region: 'North India', 
    rating: 4.9,
    reviewsCount: 112,
    price: 24500, 
    oldPrice: 32000,
    discount: "23% OFF",
    cohortSize: 15,
    filledSeats: 12,
    departureDate: "Sep 05, 2026",
    images: [
      "/34.jpg",
      "/35.jpg"
    ],
    tags: ["Adventure", "Trending Class"],
    itineraryHighlight: "Cross Khardung La Pass, pristine Pangong Tso Lake borders, and rugged terrain tracks."
  },
  { 
    id: "g4", 
    title: "Wonders of North-East & Sikkim Pristine Valleys Hubs", 
    duration: "7 Days / 6 Nights", 
    region: 'East India', 
    rating: 4.6,
    reviewsCount: 88,
    price: 19800, 
    oldPrice: 25000,
    discount: "20% OFF",
    cohortSize: 18,
    filledSeats: 8,
    departureDate: "Nov 02, 2026",
    images: [
      "/28.jpg",
      "/29.jpg"
    ],
    tags: ["Nature Eco", "Limited Spaces"],
    itineraryHighlight: "Explore Gangtok panoramas, high altitude Tsomgo lake points, and premium tea estate vistas."
  }
];

export default function GroupToursPage({ onBackToHome }) {
  const [regionFilter, setRegionFilter] = useState('All');
  const [maxBudget, setMaxBudget] = useState(35000);
  const [imgIndexes, setImgIndexes] = useState({});
  const [groupTours, setGroupTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fix Event Handler: Added event listener to successfully catch the gateway checkout dispatch logic

  const handleNextImg = (e, id, max) => {
    e.stopPropagation();
    setImgIndexes(prev => ({ ...prev, [id]: ((prev[id] || 0) + 1) % max }));
  };

  const handlePrevImg = (e, id, max) => {
    e.stopPropagation();
    setImgIndexes(prev => ({ ...prev, [id]: ((prev[id] || 0) - 1 + max) % max }));
  };

  useEffect(() => {
    async function loadLiveGroupTours() {
      try {
        setLoading(true);
        const response = await API.get('/api/group-tours');
        setGroupTours(response.data);
      } catch (err) {
        console.error('Failed fetching live group tours:', err);
        setGroupTours(clusterTours);
      } finally {
        setLoading(false);
      }
    }

    loadLiveGroupTours();
  }, []);

  const filteredGroups = groupTours.filter(g => 
    (regionFilter === 'All' || g.region === regionFilter) && g.price <= maxBudget
  );

  if (loading) {
    return (
      <div className="group-tours-loading">
        Hydrating group tour inventory...
      </div>
    );
  }

  return (
    <div className="group-tours-root">
      <div className="group-tours-header">
        <div>
          <span onClick={onBackToHome} className="group-tours-back-link">&lt; Home</span>
          <h1 className="group-tours-title">Fixed Departure Group Cohorts</h1>
        </div>
        <div className="group-tours-summary">
          Active Clusters: <strong>{filteredGroups.length} Departure Frameworks</strong>
        </div>
      </div>

      <div className="group-tours-layout">
        <aside className="group-tours-sidebar">
          <div className="group-tours-filter-panel">
            <FaFilter className="group-tours-filter-icon" />
            <h3>Refine Group Search</h3>
          </div>

          <div className="group-tour-fieldset">
            <h4 className="group-tour-filter-title">Max Budget Per Ticket</h4>
            <input
              type="range"
              min="10000"
              max="35000"
              step="500"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="group-tour-range"
            />
            <div className="group-tour-range-summary">
              <span>₹10,000</span>
              <span className="group-tour-highlight">Under ₹{maxBudget.toLocaleString()}</span>
            </div>
          </div>

          <div className="group-tour-divider">
            <h4 className="group-tour-filter-title">Destination Territories</h4>
            {['All', 'North India', 'South India', 'East India'].map(reg => (
              <label key={reg} className="group-tour-radio-row">
                <input
                  type="radio"
                  name="reg"
                  checked={regionFilter === reg}
                  onChange={() => setRegionFilter(reg)}
                  className="group-tour-radio"
                />
                <span className={`group-tour-radio-label ${regionFilter === reg ? 'active' : ''}`}>
                  {reg === 'All' ? 'All Indian Regions' : reg}
                </span>
              </label>
            ))}
          </div>
        </aside>

        <main className="group-tours-main">
          {filteredGroups.map((group) => {
            const currentImgIdx = imgIndexes[group.id] || 0;
            const openSeats = group.cohortSize - group.filledSeats;

            return (
              <article key={group.id} className="group-tour-card">
                <div className="group-tour-image">
                  <img src={group.images[currentImgIdx]} alt={group.title} />
                  <div className="group-tour-tags">
                    {group.tags.map((tag, idx) => (
                      <span key={idx} className={`group-tour-tag ${idx === 0 ? 'primary' : 'secondary'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="group-tour-like">
                    <FaHeart size={14} />
                  </button>

                  <button onClick={(e) => handlePrevImg(e, group.id, group.images.length)} className="group-tour-carousel-button left">
                    <FaChevronLeft size={10} />
                  </button>
                  <button onClick={(e) => handleNextImg(e, group.id, group.images.length)} className="group-tour-carousel-button right">
                    <FaChevronRight size={10} />
                  </button>
                </div>

                <div className="group-tour-body">
                  <div>
                    <div className="group-tour-meta-row">
                      <span className="group-tour-location"><FaMapMarkerAlt /> {group.region}</span>
                      <div className="group-tour-rating"><FaStar /> <span>{group.rating}</span> <span>({group.reviewsCount})</span></div>
                    </div>

                    <h3 className="group-tour-title">{group.title}</h3>

                    <div className="group-tour-badges">
                      <span className="group-tour-badge"><FaCalendarAlt /> {group.departureDate}</span>
                      <span className="group-tour-badge"><FaUsers /> {group.duration}</span>
                    </div>

                    <div className="group-tour-tags-inline">
                      <span className="group-tour-tag-pill"><FaBus /> AC Coach Transit</span>
                      <span className="group-tour-tag-pill"><FaHotel /> Premium Stays</span>
                      <span className="group-tour-tag-pill"><FaUtensils /> Map Meals Plan</span>
                    </div>

                    <p className="group-tour-summary">{group.itineraryHighlight}</p>

                    <div className="group-tour-progress">
                      <div className="group-tour-progress-header">
                        <span>Cohort Fill: {group.filledSeats}/{group.cohortSize} Packed</span>
                        <span className={`group-tour-seats ${openSeats <= 4 ? 'low' : 'ok'}`}>{openSeats} Seats Remaining!</span>
                      </div>
                      <div className="group-tour-progress-bar-bg">
                        <div className="group-tour-progress-bar" style={{ width: `${(group.filledSeats / group.cohortSize) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="group-tour-note"><FaCheckCircle /> Dynamic Multi-share Pooling Options Active for Solo Explorers</div>
                  </div>

                  <div className="group-tour-footer">
                    <div>
                      <div className="group-tour-price-row">
                        <span className="group-tour-price-old">₹{group.oldPrice.toLocaleString()}</span>
                        <span className="group-tour-discount-pill"><FaTags size={9} /> {group.discount}</span>
                      </div>
                      <div className="group-tour-price-amount">
                        ₹{group.price.toLocaleString()}
                        <span className="group-tour-price-subtext"> /person</span>
                      </div>
                    </div>
                    <button
                      className="group-tour-book-btn"
                      onClick={async () => {
                        try {
                          await createBooking({
                            itemName: group.title,
                            price: group.price,
                            category: 'Group tours',
                            details: JSON.stringify({
                              duration: group.duration,
                              region: group.region,
                              departureDate: group.departureDate,
                              cohortSize: group.cohortSize,
                              remainingSeats: group.cohortSize - group.filledSeats
                            })
                          })

                          alert('Group tour booking successful!')
                        } catch (error) {
                          console.error(error)
                          alert('Booking failed. Please try again.')
                        }
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </main>
      </div>
    </div>
  )
}
