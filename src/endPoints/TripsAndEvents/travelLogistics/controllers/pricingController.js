const PricingRepository = require('../models/Pricing/pricingRepository');

class PricingController {
  async getAllPricing(req, res) {
    try {
      const pricing = await PricingRepository.findAll();
      if (!pricing.length) return res.status(404).json({ error: 'No pricing records found' });
      res.status(200).json(pricing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPricingByTrip(req, res) {
    try {
      const { trip_id } = req.params;
      const pricing = await PricingRepository.findByTripId(trip_id);
      if (!pricing.length) return res.status(404).json({ error: 'No pricing found for this trip' });
      res.status(200).json(pricing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createPricing(req, res) {
    try {
      const data = req.body;
      const pricing = await PricingRepository.create(data);
      res.status(201).json(pricing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePricing(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const pricing = await PricingRepository.update(id, data);
      if (!pricing) return res.status(404).json({ error: 'Pricing not found' });
      res.status(200).json(pricing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePricing(req, res) {
    try {
      const { id } = req.params;
      const result = await PricingRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PricingController();
