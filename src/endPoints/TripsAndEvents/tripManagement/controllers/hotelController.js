const HotelRepository = require('../models/Hotels/hotelRepository');

class HotelController {
  async getAllHotels(req, res) {
    try {
      const hotels = await HotelRepository.findAll();
      if (!hotels.length) return res.status(404).json({ error: 'No hotels found' });
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getHotelsByTrip(req, res) {
    try {
      const { trip_id } = req.params;
      const hotels = await HotelRepository.findByTripId(trip_id);
      if (!hotels.length) return res.status(404).json({ error: 'No hotels found for this trip' });
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createHotel(req, res) {
    try {
      const data = req.body;
      const hotel = await HotelRepository.create(data);
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateHotel(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const hotel = await HotelRepository.update(id, data);
      if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteHotel(req, res) {
    try {
      const { id } = req.params;
      const result = await HotelRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new HotelController();
