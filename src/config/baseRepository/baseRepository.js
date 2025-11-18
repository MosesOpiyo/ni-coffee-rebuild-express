const db = require('../database');

class BaseRepository {
    constructor(table, ModelClass) {
        this.table = table;
        this.ModelClass = ModelClass;
    }

    async findAll() {
        const rows = await db.query(`SELECT * FROM ${this.table}`);
        return rows.map(row => new this.ModelClass(row));
    }

    async findById(id) {
        const rows = await db.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
        return rows.length ? new this.ModelClass(rows[0]) : null;
    }

    async findOne(whereClause = "", params = []) {
        const rows = await db.query(
            `SELECT * FROM ${this.table} ${whereClause ? "WHERE " + whereClause : ""} LIMIT 1`,
            params
        );
        return rows.length ? new this.ModelClass(rows[0]) : null;
    }

    async findMany(whereClause = "", params = []) {
        const rows = await db.query(
            `SELECT * FROM ${this.table} ${whereClause ? "WHERE " + whereClause : ""}`,
            params
        );
        return rows.map(row => new this.ModelClass(row));
    }

    async create(data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(", ");

        const query = `
            INSERT INTO ${this.table} (${keys.join(", ")}, created_at, updated_at)
            VALUES (${placeholders}, NOW(), NOW())
            RETURNING *
        `;

        const rows = await db.query(query, values);
        return new this.ModelClass(rows[0]);
    }

    async update(id, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const setClause = keys
            .map((key, idx) => `${key} = $${idx + 1}`)
            .join(", ");

        const query = `
            UPDATE ${this.table}
            SET ${setClause}, updated_at = NOW()
            WHERE id = $${keys.length + 1}
            RETURNING *
        `;

        const rows = await db.query(query, [...values, id]);
        return rows.length ? new this.ModelClass(rows[0]) : null;
    }

    async delete(id) {
        const rows = await db.query(
            `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`,
            [id]
        );
        return rows.length ? new this.ModelClass(rows[0]) : null;
    }

    async rawQuery(query, params = []) {
        const rows = await db.query(query, params);
        return rows;
    }
}

module.exports = BaseRepository;
