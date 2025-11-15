const db = require('../../../../../config/database');
const WarehouseInventory = require('./warehouseInventoryClass');

class WarehouseInventoryRepository {
    static async findAll() {
        const rows = await db.query('SELECT * FROM warehouse_inventory');
        return rows.map(row => new WarehouseInventory(...Object.values(row)));
    }

    static async findByShipmentId(id) {
        const rows = await db.query('SELECT * FROM warehouse_inventory WHERE shipment_id = $1', [id]);
        return rows.map(row => new WarehouseInventory(...Object.values(row)));
    }
    
    static async findByProductId(id) {
        const rows = await db.query('SELECT * FROM warehouse_inventory WHERE product_id = $1', [id]);
        return rows.map(row => new WarehouseInventory(...Object.values(row)));
    }

    static async findById(id) {
        const rows = await db.query('SELECT * FROM warehouse_inventory WHERE id = $1', [id]);
        return rows.length ? new WarehouseInventory(...Object.values(rows[0])) : null;
    }

    static async create(inventoryData) {
        const { shipment_id, product_id, quantity, location, status } = inventoryData;
        const rows = await db.query(
            `INSERT INTO warehouse_inventory (shipment_id, product_id, quantity, location, status, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
             RETURNING *`,
            [shipment_id, product_id, quantity, location, status || 'in_stock']
        );
        return new WarehouseInventory(...Object.values(rows[0]));
    }

    static async update(id, inventoryData) {
        const { shipment_id, product_id, quantity, location, status } = inventoryData;
        const rows = await db.query(
            `UPDATE warehouse_inventory
             SET shipment_id = $1, product_id = $2, quantity = $3, location = $4, status = $5, updated_at = NOW()
             WHERE id = $6
             RETURNING *`,
            [shipment_id, product_id, quantity, location, status, id]
        );
        return rows.length ? new WarehouseInventory(...Object.values(rows[0])) : null;
    }

    static async delete(id) {
        await db.query('DELETE FROM warehouse_inventory WHERE id = $1', [id]);
        return { message: `Warehouse Inventory with ID ${id} deleted successfully.` };
    }
}