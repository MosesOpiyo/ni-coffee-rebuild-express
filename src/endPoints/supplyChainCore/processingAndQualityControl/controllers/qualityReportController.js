const QualityReportRepository = require('../models/qualityReports/qualityReportRepository');

class QualityreportController {
    async getAllQualityReports(req, res) {
        try {
            const qualityReports = await QualityReportRepository.findAll();
            if (!qualityReports) {
                return res.status(404).json({ error: 'No quality reports found' });
            } else {
                res.status(200).json(qualityReports);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getQualityReportByBatchId(req, res) {
        try {
            const { batchId } = req.params;
            const qualityReports = await QualityReportRepository.findByBatchId(batchId);
            if (!qualityReports) {
                return res.status(404).json({ error: 'No quality reports found for this batch' });
            } else {
                res.status(200).json(qualityReports);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getQualityReportById(req, res) {
        try {
            const { id } = req.params;
            const qualityReport = await QualityReportRepository.findById(id);
            if (!qualityReport) {
                return res.status(404).json({ error: 'Quality report not found' });
            } else {
                res.status(200).json(qualityReport);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createQualityReport(req, res) {
        try {
            const reportData = req.body;
            const qualityReport = await QualityReportRepository.create(reportData);
            if (!qualityReport) {
                return res.status(400).json({ error: 'Failed to create quality report' });
            } else {
                res.status(201).json(qualityReport);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateQualityReport(req, res) {
        try {
            const { id } = req.params;
            const reportData = req.body;
            const qualityReport = await QualityReportRepository.update(id, reportData); 
            if (!qualityReport) {
                return res.status(404).json({ error: 'Quality report not found' });
            } else {
                res.status(200).json(qualityReport);
            }} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async deleteQualityReport(req, res) {
        try {
            const { id } = req.params;
            const result = await QualityReportRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }    
    };
}

module.exports = new QualityreportController();