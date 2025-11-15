const OverlandTravelRepository = require('../models/OverLandTravels/overLandTravelRepository');

class OverlandTravelController {
  async getAllTravel(req, res) {
    try {
      const records = await OverlandTravelRepository.findAll();
      if (!records.length) return res.status(404).json({ error: 'No travel routes found' });
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTravelByTrip(req, res) {
    try {
      const { trip_id } = req.params;
      const records = await OverlandTravelRepository.findByTripId(trip_id);
      if (!records.length) return res.status(404).json({ error: 'No travel data for this trip' });
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTravel(req, res) {
    try {
      const data = req.body;
      const record = await OverlandTravelRepository.create(data);
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTravel(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const record = await OverlandTravelRepository.update(id, data);
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTravel(req, res) {
    try {
      const { id } = req.params;
      const result = await OverlandTravelRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OverlandTravelController();
