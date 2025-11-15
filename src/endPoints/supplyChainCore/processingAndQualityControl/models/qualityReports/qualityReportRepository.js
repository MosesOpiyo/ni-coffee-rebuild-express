const db = require('../../../../../config/database');
const QualityReport = require('./qualityReportClass');

class QualityReportRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM quality_reports');
        return rows.map(row => new QualityReport(...Object.values(row)));
    }
    static async findByBatchId() {
        const rows = await db.query('SELECT * FROM quality_reports WHERE batch_id = $1', [batchId]);
        return rows.map(row => new QualityReport(...Object.values(row)));
    }
    static async findById(id) {
        const rows = await db.query('SELECT * FROM quality_reports WHERE id = $1', [id]);
        return rows.length ? new QualityReport(...Object.values(rows[0])) : null;
    }
    static async create(reportData) {
        const { batch_id, parameter, value, report_date } = reportData;
        const rows = await db.query(
            `INSERT INTO quality_reports (batch_id, parameter, value, report_date)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [batch_id, parameter, value, report_date || new Date()]
        );
        return new QualityReport(...Object.values(rows[0]));
    }
}

module.exports = QualityReportRepository;