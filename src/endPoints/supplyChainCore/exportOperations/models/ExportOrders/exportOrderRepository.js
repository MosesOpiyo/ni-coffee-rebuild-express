const db = require('../../../../../config/database');
const ExportOrder = require('./exportOrderClass');

class ExportOrderRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM export_orders');
        return rows.map(row => new ExportOrder(...Object.values(row)));
    };
    
    static async findByBatchId(id) {
        const rows = await db.query('SELECT * FROM export_orders WHERE batch_id = $1', [id]);
        return rows.length ? new ExportOrder(...Object.values(row)) : null;
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM export_orders WHERE id = $1', [id]);
        return rows.length ? new ExportOrder(...Object.values(rows[0])) : null;
    }

    static async create(exportOrderData) {
        const { batch_id, export_date, destination, quantity_kg, status } = exportOrderData;
        const rows = await db.query(
            `INSERT INTO export_orders (batch_id, export_date, destination, quantity_kg, status, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
             RETURNING *`,
            [batch_id, export_date || new Date(), destination, quantity_kg, status || 'pending']
        );
        return new ExportOrder(...Object.values(rows[0]));
    }

    static async update(id, exportOrderData) {
        const { batch_id, export_date, destination, quantity_kg, status } = exportOrderData;
        const rows = await db.query(
            `UPDATE export_orders
             SET batch_id = $1, export_date = $2, destination = $3, quantity_kg = $4, status = $5, updated_at = NOW()
             WHERE id = $6
             RETURNING *`,
            [batch_id, export_date, destination, quantity_kg, status, id]
        );
        return rows.length ? new ExportOrder(...Object.values(rows[0])) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM export_orders WHERE id = $1', [id]);
        return { message: `Export Order with ID ${id} deleted successfully.` };
    }

}

module.exports = ExportOrderRepository;