const db = require('../../../../config/database');
const Product = require('../models/productClass');

class ProductRepository {
    static async getAllProducts() {
        const rows = await db.query('SELECT * FROM products');
        return rows.map(row => new Product(row));
    }

    static async getProductById(id) {
        const rows = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return rows.length ? new Product(rows[0]) : null;
    }

    static async createProduct(productData) {
        const { name, description, price_per_kg, stock, grade, origin, cupping_score } = productData;
        const rows = await db.query(
            `INSERT INTO products (name, description, price_per_kg, stock, grade, origin, cupping_score, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
             RETURNING *`,
            [name, description, price_per_kg, stock, grade, origin, cupping_score]
        );
        return new Product(rows[0]);
    }

    static async updateProduct(id, productData) {
        const { name, description, price_per_kg, stock, grade, origin, cupping_score } = productData;
        const rows = await db.query(
            `UPDATE products
             SET name = $1, description = $2, price_per_kg = $3, stock = $4, grade = $5, origin = $6, cupping_score = $7, updated_at = NOW()
             WHERE id = $8
             RETURNING *`,
            [name, description, price_per_kg, stock, grade, origin, cupping_score, id]
        );
        return rows.length ? new Product(rows[0]) : null;
    }

    static async deleteProduct(id) {
        await db.query('DELETE FROM products WHERE id = $1', [id]);
        return { message: `Product with ID ${id} deleted successfully.` };
    }
}

module.exports = ProductRepository;