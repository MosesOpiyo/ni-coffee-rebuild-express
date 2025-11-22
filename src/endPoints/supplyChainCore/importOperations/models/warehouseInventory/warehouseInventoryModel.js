const BaseModel = require('../../../../../config/basemodel/baseModel');

class WarehouseInventoryModel extends BaseModel{
    constructor(data) {
        super('warehouse_inventory', [
            'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
            'shipment_id UUID REFERENCES shipments(id) ON DELETE SET NULL',
            'product_id UUID REFERENCES products(id) ON DELETE SET NULL',
            'quantity FLOAT NOT NULL',
            'location TEXT NOT NULL',
            'status TEXT DEFAULT \'available\'',
        ]);
        Object.assign(this, data);
    }

    toJSON() {
        return {
            id: this.id,
            shipment_id: this.shipment_id,
            product_id: this.product_id,
            quantity: this.quantity,
            location: this.location,
            status: this.status,
        }
    }
}

module.exports = WarehouseInventoryModel;