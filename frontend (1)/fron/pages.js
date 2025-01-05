import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    contact: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingSummary, setBookingSummary] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send booking data to the backend
      const response = await axios.post('http://localhost:5000/api/book', formData);
      setBookingSummary(response.data);
    } catch (error) {
      console.error('Error booking table:', error);
    }
  };

  const checkAvailability = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/availability?date=${formData.date}`);
      setAvailableSlots(data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  return (
    <div>
      <h1>Restaurant Table Booking</h1>
      {!bookingSummary ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <label>Time:</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </div>
          <div>
            <label>Guests:</label>
            <input type="number" name="guests" value={formData.guests} onChange={handleChange} required />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Contact:</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>
          <button type="button" onClick={checkAvailability}>Check Availability</button>
          <button type="submit">Book Table</button>
        </form>
      ) : (
        <div>
          <h2>Booking Confirmed!</h2>
          <p>Date: {bookingSummary.date}</p>
          <p>Time: {bookingSummary.time}</p>
          <p>Guests: {bookingSummary.guests}</p>
          <p>Name: {bookingSummary.name}</p>
          <p>Contact: {bookingSummary.contact}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
