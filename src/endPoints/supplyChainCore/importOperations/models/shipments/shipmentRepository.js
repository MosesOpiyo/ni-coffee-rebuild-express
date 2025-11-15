const db = require('../../../../../config/database');
const Shipment = require('./shipmentClass');

class ShipmentRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM shipments');
        return rows.map(row => new Shipment(...Object.values(row)));
    }

    static async findByExportId(id) {
        const rows = await db.query('SELECT * FROM shipments WHERE export_id = $1', [id]);
        return rows.map(row => new Shipment(...Object.values(row)));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM shipments WHERE id = $1', [id]);
        return rows.length ? new Shipment(...Object.values(rows[0])) : null;
    }

    static async create(shipmentData) {
        const { export_id, status, tracking_number, estimated_arrival } = shipmentData;
        const rows = await db.query(
            `INSERT INTO shipments (export_id, status, tracking_number, estimated_arrival, created_at)
             VALUES ($1, $2, $3, $4, NOW())
             RETURNING *`,
            [export_id, status || 'in_transit', tracking_number, estimated_arrival]
        );
        return new Shipment(...Object.values(rows[0]));
    }

    static async update(id, shipmentData) { 
        const { status, tracking_number, estimated_arrival } = shipmentData;
        const rows = await db.query(
            `UPDATE shipments
             SET status = $1, tracking_number = $2, estimated_arrival = $3, updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [status, tracking_number, estimated_arrival, id]
        );
        return rows.length ? new Shipment(...Object.values(rows[0])) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM shipments WHERE id = $1', [id]);
        return { message: `Shipment with ID ${id} deleted successfully.` };
    }
}

module.exports = ShipmentRepository;