const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');

const BOOKING_TIMEZONE = 'Asia/Kolkata';

function formatBookingTimeIST(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: BOOKING_TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date);
}


// CREATE BOOKING
router.post('/', async (req, res) => {
  try {
    const {
      itemName,
      price,
      category,
      details,
      transactionId
    } = req.body;
    const email = req.headers['x-user-email'] || req.body.email;
    const bookedAtUtc = new Date();

    const booking = new Booking({
      userEmail: email,
      itemName,
      amountPaid: price,
      category,
      details,
      transactionId,
      bookedAtUtc,
      bookedAtLocal: formatBookingTimeIST(bookedAtUtc),
      bookedAtTimezone: BOOKING_TIMEZONE
    });

    await booking.save();

    return res.status(201).json({
      success: true,
      booking: {
        ...booking.toObject(),
        bookedAtLocal: booking.bookedAtLocal,
        bookedAtTimezone: booking.bookedAtTimezone,
        bookedAtUtc: booking.bookedAtUtc
      }
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack
    });
  }
});


// GET BOOKINGS
router.get('/', async (req, res) => {
  try {

    const { email } = req.query;

    const queryCondition = email
      ? { userEmail: email }
      : {};

    const history = await Booking.find(queryCondition)
      .lean()
      .sort({ bookedAtUtc: -1 });

    return res.status(200).json(
      history.map((booking) => ({
        ...booking,
        bookedAtUtc: booking.bookedAtUtc,
        bookedAtLocal: booking.bookedAtLocal || formatBookingTimeIST(booking.bookedAtUtc),
        bookedAtTimezone: booking.bookedAtTimezone || BOOKING_TIMEZONE
      }))
    );

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// UPDATE BOOKING
router.put('/:id', async (req, res) => {

  try {

    const updatedBooking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )

    res.status(200).json(updatedBooking)

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// DELETE BOOKING
router.delete('/:id', async (req, res) => {

  try {

    await Booking.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Booking deleted'
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router;
