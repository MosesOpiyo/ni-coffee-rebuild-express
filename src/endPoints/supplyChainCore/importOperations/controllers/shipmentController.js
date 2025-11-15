const ShipmentRepository = require('../models/shipments/shipmentRepository');

class ShipmentController {
    async getAllShipments (req, res) {
        try {
            const shipments = await ShipmentRepository.findAll();
            if (!shipments) {
                return res.status(404).json({ error: 'No shipments found' });
            } else {
                res.status(200).json(shipments);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getShipmentByExportId (req, res) {
        try {
            const { exportId } = req.params;
            const shipment = await ShipmentRepository.findByExportId(exportId);
            if (!shipment || shipment.length === 0) {
                return res.status(404).json({ error: 'No shipments found for this export ID' });
            } else {
                res.status(200).json(shipment);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getShipmentById (req, res) {
        try {
            const { id } = req.params;
            const shipment = await ShipmentRepository.findById(id);
            if (!shipment) {
                return res.status(404).json({ error: 'Shipment not found' });
            } else {
                res.status(200).json(shipment);
            }       } catch (error) {
            res.status(500).json({ error: error.message });
        }};

    async createShipment (req, res){
        try {
            const shipmentData = req.body;
            const shipment = await ShipmentRepository.create(shipmentData);
            if (!shipment) {
                return res.status(400).json({ error: 'Failed to create shipment' });
            } else {
                res.status(201).json(shipment);
            }       } catch (error) {
            res.status(500).json({ error: error.message });
        }};

    async updateShipment (req, res){
        try {
            const { id } = req.params;
            const shipmentData = req.body;
            const shipment = await ShipmentRepository.update(id, shipmentData);
            if (!shipment) {
                return res.status(404).json({ error: 'Shipment not found' });
            } else {
                res.status(200).json(shipment);
            }       } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async deleteShipment (req, res){
        try {
            const { id } = req.params;
            const result = await ShipmentRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
}

module.exports = new ShipmentController();