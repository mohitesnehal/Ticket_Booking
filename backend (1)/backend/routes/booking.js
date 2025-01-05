const express = require('express');
const router = express.Router();

// Sample data for available slots (could be replaced with a database)
const availableSlots = [
  { date: '2025-01-05', time: '18:00' },
  { date: '2025-01-05', time: '19:00' },
  { date: '2025-01-06', time: '18:00' }
];

let bookings = [];

router.get('/availability', (req, res) => {
  const { date } = req.query;
  const slots = availableSlots.filter(slot => slot.date === date);
  res.json(slots);
});

router.post('/book', (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  // Check if the slot is already booked
  const isBooked = bookings.some(
    (booking) => booking.date === date && booking.time === time
  );

  if (isBooked) {
    return res.status(400).json({ message: 'This time slot is already booked.' });
  }

  // Save the booking
  const newBooking = { date, time, guests, name, contact };
  bookings.push(newBooking);

  res.status(200).json(newBooking);
});

module.exports = router;
