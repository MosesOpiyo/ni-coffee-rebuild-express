const db = require('../../../../../config/database');
const Contract = require('./contractClass');

class ContractRepository {
    static async create(contractData) {
        const { supplier_id, product_id, quantity, price, currency, start_date, end_date, status } = contractData;
        const rows = await db.query(
            `INSERT INTO contracts (supplier_id, product_id, quantity, price, currency, start_date, end_date, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [supplier_id, product_id, quantity, price, currency, start_date, end_date, status]
        );
        return new Contract(...Object.values(rows[0]));
    }

    static async findAll() {
        const rows = await db.query('SELECT * FROM contracts');
        return rows.map(row => new Contract(...Object.values(row)));
    }

    static async findById(contract_id) {
        const rows = await db.query('SELECT * FROM contracts WHERE contract_id = $1', [contract_id]);
        return rows.length ? new Contract(...Object.values(rows[0])) : null;
    }

    static async update(contract_id, contractData) {
        const { supplier_id, product_id, quantity, price, currency, start_date, end_date, status } = contractData;
        const rows = await db.query(
            `UPDATE contracts
             SET supplier_id = $1, product_id = $2, quantity = $3, price = $4, currency = $5, 
                 start_date = $6, end_date = $7, status = $8, updated_at = NOW()
             WHERE contract_id = $9
             RETURNING *`,
            [supplier_id, product_id, quantity, price, currency, start_date, end_date, status, contract_id]
        );
        return rows.length ? new Contract(...Object.values(rows[0])) : null;
    }

    static async delete(contract_id) {
        await db.query('DELETE FROM contracts WHERE contract_id = $1', [contract_id]);
        return { message: `Contract with ID ${contract_id} deleted successfully.` };
    }
}

module.exports = ContractRepository;