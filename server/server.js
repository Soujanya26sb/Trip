const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const bookingRoutes = require('./routes/bookings');

const flightOffers = [
  { id: 'f1', airline: 'IndiGo Airways', flightNo: '6E-2134', depart: '06:15', arrive: '08:30', duration: '2h 15m', type: 'Non-stop', price: 5999, stops: 0, cabin: 'Economy Classic' },
  { id: 'f2', airline: 'Air India Elite', flightNo: 'AI-805', depart: '09:00', arrive: '11:15', duration: '2h 15m', type: 'Non-stop', price: 6450, stops: 0, cabin: 'Economy Meal Plus' },
  { id: 'f3', airline: 'SpiceJet Premium', flightNo: 'SG-342', depart: '13:45', arrive: '17:00', duration: '3h 15m', type: '1 Stop (Jaipur)', price: 4899, stops: 1, cabin: 'Economy Saver' },
  { id: 'f4', airline: 'Vistara Luxury', flightNo: 'UK-981', depart: '18:30', arrive: '20:45', duration: '2h 15m', type: 'Non-stop', price: 8900, stops: 0, cabin: 'Premium Club Class' },
  { id: 'f5', airline: 'Akasa Air Saver', flightNo: 'QP-112', depart: '21:15', arrive: '23:40', duration: '2h 25m', type: 'Non-stop', price: 5200, stops: 0, cabin: 'Standard Economy' }
];

const hotelListings = [
  { id: 'h1', name: 'The Grand Regal Luxury Resort & Urban Spa', location: 'Connaught Place, New Delhi', zone: 'Central Delhi', rating: 4.8, stars: 5, reviewsCount: 1240, basePrice: 6499, salePrice: 5199, stockLeft: 2, images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'], amenities: ['Free WiFi', 'Infinity Pool', 'Wellness Spa', 'Artisan Breakfast'] },
  { id: 'h2', name: 'Radisson Blu Elite Suites & Atrium', location: 'Aerocity, New Delhi', zone: 'Airport Zone', rating: 4.5, stars: 5, reviewsCount: 890, basePrice: 8200, salePrice: 7100, stockLeft: 4, images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600'], amenities: ['Free WiFi', 'Atrium Pool', 'Artisan Breakfast'] },
  { id: 'h3', name: 'The Bloom boutique Residency', location: 'Saket, New Delhi', zone: 'South Delhi', rating: 4.2, stars: 4, reviewsCount: 412, basePrice: 4800, salePrice: 3950, stockLeft: 1, images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600'], amenities: ['Free WiFi', 'Cafe Bar', 'Gym Access'] }
];

const carFleetInventory = [
  { id: 'c1', name: 'Maruti Swift / Hyundai i20 Fleet', category: 'Hatchback', transmission: 'Manual', fuel: 'Petrol', seats: 5, bags: 2, mileage: 'Unlimited Kms', supplier: 'ZoomCar Prime', rating: 4.4, reviewsCount: 312, pricePerDay: 1950, oldPrice: 2800, images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600'], tags: ['Best Seller', 'Fuel Efficient'] },
  { id: 'c2', name: 'Honda City / Hyundai Verna', category: 'Sedan', transmission: 'Automatic', fuel: 'Petrol', seats: 5, bags: 3, mileage: 'Unlimited Kms', supplier: 'Avis India', rating: 4.7, reviewsCount: 185, pricePerDay: 3800, oldPrice: 4500, images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600'], tags: ['Top Choice', 'Instant Booking'] }
];

const groupTourInventory = [
  { id: 'g1', title: 'Gems of Kerala Scenic Routes & Backwaters Expedition', duration: '6 Days / 5 Nights', region: 'South India', rating: 4.8, reviewsCount: 340, price: 13875, oldPrice: 18500, discount: '25% OFF', cohortSize: 20, filledSeats: 14, departureDate: 'Oct 12, 2026', images: ['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600'], tags: ['Best Seller', 'Community Pick'], itineraryHighlight: 'Covers Munnar Tea Gardens, Alleppey Houseboat Cruise, and Cochin local heritage markets.' },
  { id: 'g2', title: 'Golden Triangle Cultural Group Tour & Taj Mahal Odyssey', duration: '5 Days / 4 Nights', region: 'North India', rating: 4.7, reviewsCount: 198, price: 11200, oldPrice: 14900, discount: '24% OFF', cohortSize: 25, filledSeats: 21, departureDate: 'Oct 18, 2026', images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600'], tags: ['Historical', 'Instant Confirmation'], itineraryHighlight: 'Complete guided access across historical monuments in Delhi, Agra, and the pink city of Jaipur.' }
];

dotenv.config()
connectDB()

const app = express()
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001'
].filter(Boolean)

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/bookings', bookingRoutes);

// Mount Sub-Route Files Here
app.use('/api/auth', require('./routes/auth'))

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/api/cars', (req, res) => {
  try {
    return res.status(200).json(carFleetInventory)
  } catch (err) {
    console.error('Cars route error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load car inventory.' })
  }
})

app.get('/api/group-tours', (req, res) => {
  try {
    return res.status(200).json(groupTourInventory)
  } catch (err) {
    console.error('Group tours route error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load group tour inventory.' })
  }
})

app.get('/api/hotels', (req, res) => {
  try {
    return res.status(200).json(hotelListings)
  } catch (err) {
    console.error('Hotels route error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load hotel inventory.' })
  }
})

app.get('/api/flights', (req, res) => {
  try {
    return res.status(200).json(flightOffers)
  } catch (err) {
    console.error('Flight route error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load flight inventory.' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
