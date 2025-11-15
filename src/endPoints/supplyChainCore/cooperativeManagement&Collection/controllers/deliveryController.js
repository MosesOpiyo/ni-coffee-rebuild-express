const DeliveryRepository = require('../models/Deliveries/deliveryRepository');

class DeliveryController {
    async getAllDeliveries (req, res) {
        try {
            const deliveries = await DeliveryRepository.findAll();
            if (!deliveries) {
                return res.status(404).json({ error: 'No deliveries found' });
            } else {
                res.status(200).json(deliveries);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getDeliveriesByCooperativeId (req, res) {
        try {
            const { cooperativeId } = req.params;
            const deliveries = await DeliveryRepository.findByCooperativeId(cooperativeId); 
            if (!deliveries || deliveries.length === 0) {
                return res.status(404).json({ error: 'No deliveries found for this cooperative' });
            }
            res.status(200).json(deliveries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getDeliveryById (req, res) {
        try {
            const { id } = req.params;
            const delivery = await DeliveryRepository.findById(id);
            if (!delivery) {
                return res.status(404).json({ error: 'Delivery not found' });
            } else {
                res.status(200).json(delivery);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createDelivery (req, res){
        try {
            const deliveryData = req.body;
            const delivery = await DeliveryRepository.create(deliveryData);
            if (!delivery) {
                return res.status(400).json({ error: 'Failed to create delivery' });
            } else {
                res.status(201).json(delivery);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateDelivery (req, res){
        try {
            const { id } = req.params;
            const deliveryData = req.body;
            const delivery = await DeliveryRepository.update(id, deliveryData);
            if (!delivery) {
                return res.status(404).json({ error: 'Delivery not found' });
            } else {
                res.status(200).json(delivery);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async deleteDelivery (req, res){
        try {
            const { id } = req.params;
            const result = await DeliveryRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }};
}

module.exports = new DeliveryController();