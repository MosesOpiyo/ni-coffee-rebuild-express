const BookingRepository = require('../models/Bookings/bookingRepository');

class BookingController {
  async getAllBookings(req, res) {
    try {
      const bookings = await BookingRepository.findAll();
      if (!bookings.length) return res.status(404).json({ error: 'No bookings found' });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await BookingRepository.findById(id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createBooking(req, res) {
    try {
      const data = req.body;
      const booking = await BookingRepository.create(data);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const booking = await BookingRepository.update(id, data);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      const result = await BookingRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BookingController();
