const db = require('../../../../config/database');
const User = require('../authClasses');

class UserRepository {

    static async findById(id) {
        const rows = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows.length ? new User(rows[0]) : null;
    }

    static async findByRole(role) {
        const rows = await db.query('SELECT * FROM users WHERE role = $5', [role]);
        return rows.length ? new User(rows[0]) : null;
    }

    static async create(userData) {
        const { id, email, phone_number, full_name, role } = userData;
        const rows = await db.query(
            `INSERT INTO users (id, email, phone_number, full_name, role, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
             RETURNING *`,
            [id, email, phone_number, full_name, role]
        );
        return new User(rows[0]);
    }

    static async update(id, userData) {
        const { email, phone_number, full_name, role } = userData;
        const rows = await db.query(
            `UPDATE users
             SET email = $1, phone_number = $2, full_name = $3, role = $4, updated_at = NOW()
             WHERE id = $5
             RETURNING *`,
            [email, phone_number, full_name, role, id]
        );
        return rows.length ? new User(rows[0]) : null;
    }
}

module.exports = UserRepository;
