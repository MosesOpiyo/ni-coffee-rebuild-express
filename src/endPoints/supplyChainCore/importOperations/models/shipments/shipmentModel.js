const BaseModel = require('../../../../../config/basemodel/baseModel');

const ShipmentModel = new BaseModel('shipments', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'export_id UUID REFERENCES export_orders(id) ON DELETE SET NULL',
    'status VARCHAR(50) DEFAULT \'in_transit\'',
    'tracking_number VARCHAR(100) UNIQUE NOT NULL',
    'estimated_arrival TIMESTAMP',
    'created_at TIMESTAMP DEFAULT NOW()',
]);

module.exports = ShipmentModel;