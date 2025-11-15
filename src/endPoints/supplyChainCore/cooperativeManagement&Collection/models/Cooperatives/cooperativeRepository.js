const db = require('../../../../../config/database');
const Cooperative = require('./cooperativeClass');

class CooperativeRepository {
    static async finsdAll() {
        const rows = await db.query('SELECT * FROM cooperatives');
        return rows.map(row => new Cooperative(...Object.values(row)));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM cooperatives WHERE id = $1', [id]);
        return rows.length ? new Cooperative(...Object.values(rows[0])) : null;
    }

    static async findAll() {
        const rows = await db.query('SELECT * FROM cooperatives');
        return rows.map(row => new Cooperative(...Object.values(row)));
    }

    static async create(cooperativeData) {
        const { name, cooperative_type, location, farmer_count } = cooperativeData;
        const rows = await db.query(
            `INSERT INTO cooperatives (name, cooperative_type, location, farmer_count, created_at)
             VALUES ($1, $2, $3, $4, NOW())
             RETURNING *`,
            [name, cooperative_type, location, farmer_count]
        );
        return new Cooperative(...Object.values(rows[0]));
    }

    static async update(id, cooperativeData) {
        const { name, cooperative_type, location, farmer_count } = cooperativeData;
        const rows = await db.query(
            `UPDATE cooperatives
             SET name = $1, cooperative_type = $2, location = $3, farmer_count= $4, updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [name, cooperative_type, location, farmer_count, id]
        );
        return rows.length ? new Cooperative(...Object.values(rows[0])) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM cooperatives WHERE id = $1', [id]);
        return { message: `Cooperative with ID ${id} deleted successfully.` };
    }
}

module.exports = CooperativeRepository;
