const CooperativeRepository = require('../models/Cooperatives/cooperativeRepository');

class CooperativeController {
    async getAllCooperatives (req, res) {
        try {
            const cooperatives = await CooperativeRepository.findAll();
            if (!cooperatives) {
                return res.status(404).json({ error: 'No cooperatives found' });
            } else {
                res.status(200).json(cooperatives);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async getCooperativeById (req, res) {
        try {
            const { id } = req.params;
            const cooperative = await CooperativeRepository.findById(id);
            if (!cooperative) {
                return res.status(404).json({ error: 'Cooperative not found' });
            }else {
                res.status(200).json(cooperative);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
         }
    }
    async createCooperative (req, res){
        try {
            const cooperativeData = req.body;
            const cooperative = await CooperativeRepository.create(cooperativeData);
            if (!cooperative) {
                return res.status(400).json({ error: 'Failed to create cooperative' });
            }else {
                res.status(201).json(cooperative);
            }
        } catch (error) { 
            res.status(500).json({ error: error.message });
         }
    }
    async updateCooperative (req, res){
        try {
            const { id } = req.params;
            const cooperativeData = req.body;
            const cooperative = await CooperativeRepository.update(id, cooperativeData);
            if (!cooperative) {
                return res.status(404).json({ error: 'Cooperative not found' });
            }else {
                res.status(200).json(cooperative);
            }
        } catch (error) { 
            res.status(500).json({ error: error.message });
         }
    };
    async deleteCooperative (req, res){
        try {
            const { id } = req.params;
            const result = await CooperativeRepository.delete(id);
            res.status(200).json(result);
        } catch (error) { 
            res.status(500).json({ error: error.message });
         }
    };

}

module.exports = new CooperativeController();