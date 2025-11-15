const db = require('../../../../../config/database')
const Review = require('../Reviews/reviewsClass')

class ReviewRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM reviews');
        return rows.map(row => new Review(row));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM reviews WHERE id = $1', [id]);
        return rows.length ? new Review(rows[0]) : null;
    }

    static async findByProductId(productId) {
        const rows = await db.query('SELECT * FROM reviews WHERE product_id = $1', [productId]);
        return rows.map(row => new Review(row));
    }

    static async findByBuyerId(buyerId) {
        const rows = await db.query('SELECT * FROM reviews WHERE cooperative_id = $1', [buyerId]);
        return rows.map(row => new Review(row));
    }

    static async create(reviewData) {
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'product_id UUID REFERENCES products(id) ON DELETE SET NULL',
        'buyer_id UUID REFERENCES users(is) on DELETE SET NULL',
        'rating FLOAT NOT NULL',
        'review_text TEXT NOT NULL',
        'created_at TIMESTAMP DEFAULT NOW()'
        const { product_id, buyer_id, rating, review_text } = reviewData;
        const rows = await db.query(
            `INSERT INTO reviews (product_id, buyer_id, rating, review_text, created_at)
             VALUES ($1, $2, $3, $4, NOW())
             RETURNING *`,
            [product_id, buyer_id, rating, review_text  || 'pending']
        );
        return new Review(rows[0]);
    }

    static async update(id, reviewData) {
        const { rating, review_text } = reviewData;
        const rows = await db.query(
            `UPDATE reviews
             SET rating = $1, review_text = $2
             WHERE id = $3
             RETURNING *`,
            [grade, weight_kg, id]
        );
        return rows.length ? new Review(rows[0]) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM reviews WHERE id = $1', [id]);
        return { message: `Review with ID ${id} deleted successfully.` };
    }
}

module.exports = ReviewRepository