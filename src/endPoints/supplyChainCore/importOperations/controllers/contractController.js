const contractRepository = require('../models/contracts/contractRepository');

class ContractController {
    async getAllContracts(req, res) {
        try {
            const contracts = await contractRepository.findAll();
            if (!contracts) {
                return res.status(404).json({ error: 'No contracts found' });
            } else {
                res.status(200).json(contracts);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getContractById(req, res) {
        try {
            const { id } = req.params;
            const contract = await contractRepository.findById(id);
            if (!contract) {
                return res.status(404).json({ error: 'Contract not found' });
            } else {
                res.status(200).json(contract);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createContract(req, res) {
        try {
            const contractData = req.body;
            const contract = await contractRepository.create(contractData);
            if (!contract) {
                return res.status(400).json({ error: 'Failed to create contract' });
            } else {
                res.status(201).json(contract);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateContract(req, res) {
        try {
            const { id } = req.params;
            const contractData = req.body;
            const contract = await contractRepository.update(id, contractData);
            if (!contract) {
                return res.status(404).json({ error: 'Contract not found' });
            } else {
                res.status(200).json(contract);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteContract(req, res) {
        try {
            const { id } = req.params;
            const result = await contractRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

module.exports = new ContractController();