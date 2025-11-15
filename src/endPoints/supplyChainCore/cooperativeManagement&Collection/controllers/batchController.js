const BatchRepository = require('../models/Batches/batchRepository');

class BatchController {
    async getAllBatches (req, res) {
        try {
            const batches = await BatchRepository.findAll();
            if (!batches) {
                return res.status(404).json({ error: 'No batches found' });
            } else {
                res.status(200).json(batches);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getBatchById (req, res) {
        try {
            const { id } = req.params;
            const batch = await BatchRepository.findById(id);
            if (!batch) {
                return res.status(404).json({ error: 'Batch not found' });
            }
            res.status(200).json(batch);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createBatch (req, res){
        try {
            const batchData = req.body;
            const batch = await BatchRepository.create(batchData);
            res.status(201).json(batch);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateBatch (req, res){
        try {
            const { id } = req.params;
            const batchData = req.body;
            const batch = await BatchRepository.update(id, batchData);
            if (!batch) {
                return res.status(404).json({ error: 'Batch not found' });
            }else {
                res.status(200).json(batch);
            };} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async deleteBatch (req, res){
        try {
            const { id } = req.params;
            const result = await BatchRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}


module.exports = new BatchController();
