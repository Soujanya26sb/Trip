const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userEmail: { 
    type: String, 
    required: true,
    default: 'guest@example.com' 
  },
  category: { 
    type: String, 
    required: true,
    // UPDATED: Added all of your actual frontend category strings exactly as they appear
    enum: [
      'Flight', 
      'Hotel', 
      'Hotels & Homes', 
      'Car', 
      'Cars',
      'Tour', 
      'Private Tours', 
      'Group tours', 
      'Attractions & Tours', 
      'Flight + Hotel'
    ], 
    default: 'Flight'
  },
  itemName: { 
    type: String, 
    required: true,
    default: 'Standard Reservation'
  },
  details: { 
    type: String,
    default: 'Standard Booking Reservation'
  },
  amountPaid: { 
    type: Number, 
    required: true,
    default: 0
  },
  transactionId: { 
    type: String, 
    required: true,
    unique: true, 
    default: () => 'TXN-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase()
  },
  bookedAtUtc: {
    type: Date,
    default: Date.now
  },
  bookedAtLocal: {
    type: String,
    default: ''
  },
  bookedAtTimezone: {
    type: String,
    default: 'Asia/Kolkata'
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
