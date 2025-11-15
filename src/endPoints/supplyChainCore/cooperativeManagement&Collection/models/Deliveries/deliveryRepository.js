const db = require('../../../../../config/database');
const Delivery = require('./deliveryClass');

class DeliveryRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM deliveries');
        return rows.map(row => new Delivery(...Object.values(row)));
    }
    

    static async findById(id) {
        const rows = await db.query('SELECT * FROM deliveries WHERE id = $1', [id]);
        return rows.length ? new Delivery(...Object.values(rows[0])) : null;
    }

    static async findByCooperativeId(cooperativeId) {
        const rows = await db.query('SELECT * FROM deliveries WHERE cooperative_id = $1', [cooperativeId]);
        return rows.map(row => new Delivery(...Object.values(row)));
    }

    static async create(deliveryData) {
        const { cooperative_id, batch_id, weight_kg, cherry_grade, delivery_date } = deliveryData;
        const rows = await db.query(
            `INSERT INTO deliveries (cooperative_id, batch_id, weight_kg, cherry_grade, delivery_date)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [cooperative_id, batch_id, weight_kg, cherry_grade, delivery_date || new Date()]
        );
        return new Delivery(...Object.values(rows[0]));
    }

    static async update(id, deliveryData) {
        const { batch_id, weight_kg, cherry_grade, delivery_date } = deliveryData;
        const rows = await db.query(
            `UPDATE deliveries
             SET batch_id = $1, weight_kg = $2, cherry_grade = $3, delivery_date = $4
             WHERE id = $5
             RETURNING *`,
            [batch_id, weight_kg, cherry_grade, delivery_date, id]
        );
        return rows.length ? new Delivery(...Object.values(rows[0])) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM deliveries WHERE id = $1', [id]);
        return { message: `Delivery with ID ${id} deleted successfully.` };
    }
}

module.exports = DeliveryRepository;
