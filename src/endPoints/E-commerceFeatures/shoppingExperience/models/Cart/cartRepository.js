const db = require('../../../../../config/database')
const Cart = require('../Cart/cartClass')


class CartRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM carts');
        return rows.map(row => new Cart(row));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM carts WHERE id = $1', [id]);
        return rows.length ? new Cart(rows[0]) : null;
    }

    static async findByBuyerId(buyerId) {
        const rows = await db.query('SELECT * FROM carts WHERE user_id = $1', [buyerId]);
        return rows.map(row => new Cart(row));
    }

    static async create(orderData) {
        const { buyer_id } = orderData;
        const rows = await db.query(
            `INSERT INTO carts (buyer_id, created_at)
             VALUES ($1, NOW())
             RETURNING *`,
            [buyer_id || 'pending']
        );
        return new Cart(rows[0]);
    }

    static async update(id) {
        const rows = await db.query(
            `UPDATE carts
             SET updated_at = NOW()
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return rows.length ? new Cart(rows[0]) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM carts WHERE id = $1', [id]);
        return { message: `Cart with ID ${id} deleted successfully.` };
    }
}

module.exports = CartRepository;