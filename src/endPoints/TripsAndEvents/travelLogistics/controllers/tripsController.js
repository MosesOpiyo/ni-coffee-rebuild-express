const TripRepository = require('../models/Trips/tripsRepository');

class TripController {
  async getAllTrips(req, res) {
    try {
      const trips = await TripRepository.findAll();
      if (!trips.length) return res.status(404).json({ error: 'No trips found' });
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTripById(req, res) {
    try {
      const { id } = req.params;
      const trip = await TripRepository.findById(id);
      if (!trip) return res.status(404).json({ error: 'Trip not found' });
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTrip(req, res) {
    try {
      const tripData = req.body;
      const trip = await TripRepository.create(tripData);
      res.status(201).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTrip(req, res) {
    try {
      const { id } = req.params;
      const tripData = req.body;
      const trip = await TripRepository.update(id, tripData);
      if (!trip) return res.status(404).json({ error: 'Trip not found' });
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTrip(req, res) {
    try {
      const { id } = req.params;
      const result = await TripRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TripController();
