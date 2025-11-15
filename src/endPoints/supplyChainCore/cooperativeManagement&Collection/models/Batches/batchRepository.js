const db = require('../../../../../config/database');
const Batch = require('./batchClass');

class BatchRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM batches');
        return rows.map(row => new Batch(row));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM batches WHERE id = $1', [id]);
        return rows.length ? new Batch(rows[0]) : null;
    }

    static async findByCooperativeId(cooperativeId) {
        const rows = await db.query('SELECT * FROM batches WHERE cooperative_id = $1', [cooperativeId]);
        return rows.map(row => new Batch(row));
    }

    static async create(batchData) {
        const { cooperative_id, batch_code, grade, weight_kg, status } = batchData;
        const rows = await db.query(
            `INSERT INTO batches (cooperative_id, batch_code, grade, weight_kg, status, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
             RETURNING *`,
            [cooperative_id, batch_code, grade, weight_kg, status || 'pending']
        );
        return new Batch(rows[0]);
    }

    static async update(id, batchData) {
        const { grade, weight_kg, status } = batchData;
        const rows = await db.query(
            `UPDATE batches
             SET grade = $1, weight_kg = $2, status = $3, updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [grade, weight_kg, status, id]
        );
        return rows.length ? new Batch(rows[0]) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM batches WHERE id = $1', [id]);
        return { message: `Batch with ID ${id} deleted successfully.` };
    }
}

module.exports = BatchRepository;
