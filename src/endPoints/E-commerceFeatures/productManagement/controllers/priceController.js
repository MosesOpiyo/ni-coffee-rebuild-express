const PriceRepository = require('../models/priceRepository');

class PriceController {
    async getAllPrices(req, res) {
        try {
            const prices = await PriceRepository.findAll();
            if (!prices) {
                return res.status(404).json({ error: 'No prices found' });
            } else {
                res.status(200).json(prices);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPriceById(req, res) {
        try {
            const { id } = req.params;
            const price = await PriceRepository.findById(id);
            if (!price) {
                return res.status(404).json({ error: 'Price not found' });
            } else {
                res.status(200).json(price);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPrice(req, res) {
        try {
            const priceData = req.body;
            const price = await PriceRepository.create(priceData);
            if (!price) {
                return res.status(400).json({ error: 'Failed to create price' });
            } else {
                res.status(201).json(price);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePrice(req, res) {
        try {
            const { id } = req.params;
            const priceData = req.body;
            const price = await PriceRepository.update(id, priceData);
            if (!price) {
                return res.status(404).json({ error: 'Price not found' });
            } else {
                res.status(200).json(price);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePrice(req, res) {
        try {
            const { id } = req.params;
            const result = await PriceRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new PriceController();