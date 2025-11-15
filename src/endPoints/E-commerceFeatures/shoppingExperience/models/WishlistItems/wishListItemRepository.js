const db = require('../../../../../config/database')
const WishListItem = require('./wishListItemClass');

class WishListItemRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM wishlist_items');
        return rows.map(row => new WishListItem(row));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM wishlist_items WHERE id = $1', [id]);
        return rows.length ? new WishListItem(rows[0]) : null;
    }

    static async findByWishListId(wishListId) {
        const rows = await db.query('SELECT * FROM wishlist_items WHERE wishlist_id = $1', [wishListId]);
        return rows.map(row => new WishListItem(row));
    }

    static async create(itemData) {
        const { buyer_id, quantity, price } = itemData;
        const rows = await db.query(
            `INSERT INTO wishlist_items (buyer_id, quantity, price, created_at)
             VALUES ($1, $2, $3, NOW())
             RETURNING *`,
            [buyer_id, quantity, price || 'pending']
        );
        return new WishListItem(rows[0]);
    }

    static async update(id, itemData) {
        const { quantity, price } = itemData;
        const rows = await db.query(
            `UPDATE wishlist_items
             SET quantity = $1, price = $2, updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [quantity, price, id]
        );
        return rows.length ? new WishListItem(rows[0]) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM wishlist_items WHERE id = $1', [id]);
        return { message: `WishListItem with ID ${id} deleted successfully.` };
    }

    static async clearWishList(wishListId) {
            const rows = await db.query('SELECT * FROM wishlist_items WHERE cart_id = $1', [wishListId]);
            return rows.map(row => db.query('DELETE FROM wishlist_items WHERE id = $1', [row.id]));
    }
}

module.exports = WishListItemRepository;