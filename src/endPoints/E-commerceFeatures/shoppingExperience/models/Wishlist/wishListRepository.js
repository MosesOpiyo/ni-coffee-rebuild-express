const db = require('../../../../../config/database');
const WishList = require('./wishListClass');


class WishListRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM wishlists');
        return rows.map(row => new WishList(row));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM wishlists WHERE id = $1', [id]);
        return rows.length ? new WishList(rows[0]) : null;
    }

    static async findByBuyerId(buyerId) {
        const rows = await db.query('SELECT * FROM wishlists WHERE user_id = $1', [buyerId]);
        return rows.map(row => new WishList(row));
    }

    static async create(orderData) {
        const { buyer_id } = orderData;
        const rows = await db.query(
            `INSERT INTO wishlists (buyer_id, created_at)
             VALUES ($1, NOW())
             RETURNING *`,
            [buyer_id || 'pending']
        );
        return new WishList(rows[0]);
    }

    static async update(id) {
        const rows = await db.query(
            `UPDATE wishlists
             SET updated_at = NOW()
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return rows.length ? new WishList(rows[0]) : null;
    }

    static async clearWishList(wishListId) {
            const rows = await db.query('SELECT * FROM wishList_items WHERE cart_id = $1', [wishListId]);
            return rows.map(row => db.query('DELETE FROM wishList_items WHERE id = $1', [row.id]));
    }

    static async delete(id) {
        await db.query('DELETE FROM wishlists WHERE id = $1', [id]);
        return { message: `WishList with ID ${id} deleted successfully.` };
    }
}

module.exports = WishListRepository;