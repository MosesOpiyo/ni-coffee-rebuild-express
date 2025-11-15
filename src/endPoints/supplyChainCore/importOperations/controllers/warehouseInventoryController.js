const WarehouseInventoryRepository = require('../models/warehouseInventory/warehouseInventoryRepository');

class WarehouseInventoryController {
    async getAllInventoryItems (req, res) {
        try {
            const items = await WarehouseInventoryRepository.findAll();
            if (!items) {
                return res.status(404).json({ error: 'No inventory items found' });
            } else {
                res.status(200).json(items);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getInventoryItemById (req, res) {
        try {
            const { id } = req.params;  
            const item = await WarehouseInventoryRepository.findById(id);
            if (!item) {
                return res.status(404).json({ error: 'Inventory item not found' });
            } else {
                res.status(200).json(item);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createInventoryItem (req, res){
        try {
            const itemData = req.body;
            const item = await WarehouseInventoryRepository.create(itemData);
            if (!item) {
                return res.status(400).json({ error: 'Failed to create inventory item' });
            } else {
                res.status(201).json(item);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateInventoryItem (req, res){
        try {
            const { id } = req.params;
            const itemData = req.body;
            const item = await WarehouseInventoryRepository.update(id, itemData);
            if (!item) {
                return res.status(404).json({ error: 'Inventory item not found' });
            } else {
                res.status(200).json(item);
            }    } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async deleteInventoryItem (req, res){
        try {
            const { id } = req.params;  
            const result = await WarehouseInventoryRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

}

module.exports = new WarehouseInventoryController();