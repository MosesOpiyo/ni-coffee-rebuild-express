const db = require('../../../../config/database');
const Price = require('./priceClass');

class PriceRepository {
    static async getAllPrices() {
        const rows = await db.query('SELECT * FROM price');
        return rows.map(row => new Price(row));
    }

    static async getPriceById(id) {
        const rows = await db.query('SELECT * FROM price WHERE id = $1', [id]);
        return rows.length ? new Price(rows[0]) : null;
    }

    static async createPrice(priceData) {
        const { price_per_kg, currency, is_active } = priceData;
        const rows = await db.query(
            `INSERT INTO price (price_per_kg, currency, is_active, created_at)
             VALUES ($1, $2, $3, NOW())
             RETURNING *`,
            [price_per_kg, currency, is_active]
        );
        return new Price(rows[0]);
    }

    static async updatePrice(id, priceData) {
        const { price_per_kg, currency, is_active } = priceData;
        const rows = await db.query(
            `UPDATE price
             SET price_per_kg = $1, currency = $2, is_active = $3
             WHERE id = $4
             RETURNING *`,
            [price_per_kg, currency, is_active, id]
        );
        return rows.length ? new Price(rows[0]) : null;
    }

    static async deletePrice(id) {
        await db.query('DELETE FROM price WHERE id = $1', [id]);
        return { message: `Price with ID ${id} deleted successfully.` };
    }

}

module.exports = PriceRepository;