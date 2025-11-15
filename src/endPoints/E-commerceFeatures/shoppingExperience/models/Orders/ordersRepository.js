const db = require('../../../../../config/database')
const Order = require('../Orders/ordersClass')

class OrderRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM orders');
        return rows.map(row => new Order(row));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
        return rows.length ? new Order(rows[0]) : null;
    }

    static async findByBuyerId(buyerId) {
        const rows = await db.query('SELECT * FROM orders WHERE cooperative_id = $1', [buyerId]);
        return rows.map(row => new Order(row));
    }

    static async create(orderData) {
        const { buyer_id, quantity, total_price, status } = orderData;
        const rows = await db.query(
            `INSERT INTO orders (buyer_id, quantity, total_price, status, created_at)
             VALUES ($1, $2, $3, $4, NOW())
             RETURNING *`,
            [buyer_id, quantity, total_price, status || 'pending']
        );
        return new Order(rows[0]);
    }

    static async update(id, orderData) {
        const { quantity, total_price, status } = orderData;
        const rows = await db.query(
            `UPDATE orders
             SET quantity = $1, total_price = $2, status = $3, updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [quantity, total_price, status, id]
        );
        return rows.length ? new Order(rows[0]) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM orders WHERE id = $1', [id]);
        return { message: `Order with ID ${id} deleted successfully.` };
    }
}

module.exports = OrderRepository