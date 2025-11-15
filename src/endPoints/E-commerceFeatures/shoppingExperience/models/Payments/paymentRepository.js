const db = require('../../../../../config/database');
const Payment = require('./paymentsClass');

class PaymentRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM payments ORDER BY created_at DESC');
        return rows.map(row => new Payment(row));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
        return rows.length ? new Payment(rows[0]) : null;
    }

    static async findByOrderId(orderId) {
        const rows = await db.query('SELECT * FROM payments WHERE order_id = $1', [orderId]);
        return rows.map(row => new Payment(row));
    }

    static async create(paymentData) {
        const { order_id, amount, currency, status, payment_method, provider_payment_id } = paymentData;
        const rows = await db.query(
            `INSERT INTO payments (order_id, amount, currency, status, payment_method, provider_payment_id, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
             RETURNING *`,
            [order_id, amount, currency, status || 'pending', payment_method, provider_payment_id]
        );
        return new Payment(rows[0]);
    }

    static async update(id, paymentData) {
        const { amount, currency, status, payment_method, provider_payment_id } = paymentData;
        const rows = await db.query(
            `UPDATE payments
             SET amount = $1, currency = $2, status = $3, payment_method = $4, provider_payment_id = $5, updated_at = NOW()
             WHERE id = $6
             RETURNING *`,
            [amount, currency, status, payment_method, provider_payment_id, id]
        );
        return rows.length ? new Payment(rows[0]) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM payments WHERE id = $1', [id]);
        return { message: `Payment with ID ${id} deleted successfully.` };
    }
}

module.exports = PaymentRepository;
