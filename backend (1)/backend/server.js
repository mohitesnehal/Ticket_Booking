const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

let bookings = []; // In-memory bookings storage

// Route to check availability
app.get('/api/availability', (req, res) => {
  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  // Hardcoded availability slots
  const availableSlots = [
    { time: '18:00', available: !bookings.find(b => b.date === date && b.time === '18:00') },
    { time: '20:00', available: !bookings.find(b => b.date === date && b.time === '20:00') }
  ];

  console.log('Available Slots:', availableSlots); // Debugging the available slots
  res.json(availableSlots);
});

// Route to create a booking
app.post('/api/book', (req, res) => {
  const { date, time, guests, name, contact } = req.body;
  bookings.push({ date, time, guests, name, contact });
  console.log('New Booking:', { date, time, guests, name, contact });
  res.json({ date, time, guests, name, contact });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
