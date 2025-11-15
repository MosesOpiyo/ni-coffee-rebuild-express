const DocumentRepository = require('../models/Documents/documentRepository');

class DocumentController {
    async getAllDocuments (req, res) {
        try {
            const documents = await DocumentRepository.findAll();
            if (!documents) {
                return res.status(404).json({ error: 'No documents found' });
            } else {
                res.status(200).json(documents);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getDocumentsByExportId (req, res) {
        try {
            const { exportId } = req.params;
            const documents = await DocumentRepository.FindByExportId(exportId); 
            if (!documents || documents.length === 0) {
                return res.status(404).json({ error: 'No documents found for this export' });
            }
            res.status(200).json(documents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }};

    async getDocumentById (req, res) {
        try {
            const { id } = req.params;
            const document = await DocumentRepository.findById(id);
            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            } else {
                res.status(200).json(document);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createDocument (req, res){
        try {
            const documentData = req.body;
            const document = await DocumentRepository.create(documentData);
            if (!document) {
                return res.status(400).json({ error: 'Failed to create document' });
            } else {
                res.status(201).json(document);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }};

    async updateDocument (req, res){
        try {
            const { id } = req.params;  
            const documentData = req.body;
            const document = await DocumentRepository.update(id, documentData); 
            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            } else {
                res.status(200).json(document);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }};
    
    async deleteDocument (req, res){
        try {
            const { id } = req.params;
            const result = await DocumentRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new DocumentController();