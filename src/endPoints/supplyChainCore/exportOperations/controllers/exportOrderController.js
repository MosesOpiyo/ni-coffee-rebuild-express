const exportOrderRepository = require('../models/ExportOrders/exportOrderRepository');

class ExportOrderController {
    async getAllExportOrders (req, res) {
        try {
            const exportOrders = await exportOrderRepository.findAll(); 
            if (!exportOrders) {
                return res.status(404).json({ error: 'No export orders found' });
            } else {
                res.status(200).json(exportOrders);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    
    };
    
    async getExportOrderById (req, res) {
        try {
            const { id } = req.params;
            const exportOrder = await exportOrderRepository.findById(id);
            if (!exportOrder) {
                return res.status(404).json({ error: 'Export order not found' });
            } else {
                res.status(200).json(exportOrder);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createExportOrder (req, res){
        try {
            const exportOrderData = req.body;
            const exportOrder = await exportOrderRepository.create(exportOrderData);
            if (!exportOrder) {
                return res.status(400).json({ error: 'Failed to create export order' });
            } else {
                res.status(201).json(exportOrder);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateExportOrder (req, res){
        try {
            const { id } = req.params;
            const exportOrderData = req.body;
            const exportOrder = await exportOrderRepository.update(id, exportOrderData);
            if (!exportOrder) {
                return res.status(404).json({ error: 'Export order not found' });
            } else {
                res.status(200).json(exportOrder);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async deleteExportOrder (req, res){
        try {
            const { id } = req.params;
            const result = await exportOrderRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
}

module.exports = new ExportOrderController();