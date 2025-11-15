const db = require('../../../../../config/database')
const OCartItem = require('./cartItemModel');
const CartItem = require('./cartItemClass');

class CartItemRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM cart_items');
        return rows.map(row => new CartItem(row));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM cart_items WHERE id = $1', [id]);
        return rows.length ? new CartItem(rows[0]) : null;
    }

    static async findByBuyerId(buyerId) {
        const rows = await db.query('SELECT * FROM cart_items WHERE cooperative_id = $1', [buyerId]);
        return rows.map(row => new CartItem(row));
    }

    static async findByCartId(cartId) {
        const rows = await db.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId]);
        return rows.map(row => new CartItem(row));
    }

    static async create(orderData) {
        const { buyer_id, quantity, total_price, } = orderData;
        const rows = await db.query(
            `INSERT INTO cart_items (buyer_id, quantity, price, created_at)
             VALUES ($1, $2, $3, NOW())
             RETURNING *`,
            [buyer_id, quantity, total_price || 'pending']
        );
        return new CartItem(rows[0]);
    }

    static async update(id, orderData) {
        const { quantity, price } = orderData;
        const rows = await db.query(
            `UPDATE cart_items
             SET quantity = $1, price = $2, updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [quantity, total_price, id]
        );
        return rows.length ? new CartItem(rows[0]) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM cart_items WHERE id = $1', [id]);
        return { message: `CartItem with ID ${id} deleted successfully.` };
    }

    static async clearCart(cartId) {
        const rows = await db.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId]);
        return rows.map(row => db.query('DELETE FROM cart_items WHERE id = $1', [row.id]));
    }
}

module.exports = CartItemRepository;