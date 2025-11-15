const BaseModel = require('../../../../../config/basemodel/baseModel');

const WarehouseInventoryModel = new BaseModel('warehouse_inventory', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'shipment_id UUID REFERENCES shipments(id) ON DELETE SET NULL',
    'product_id UUID REFERENCES products(id) ON DELETE SET NULL',
    'quantity FLOAT NOT NULL',
    'location TEXT NOT NULL',
    'status TEXT DEFAULT \'available\'',
]);

module.exports = WarehouseInventoryModel;