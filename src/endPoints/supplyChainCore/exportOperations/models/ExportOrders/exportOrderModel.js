const BaseModel = require('../../../../../config/basemodel/baseModel');

const ExportOrderModel = new BaseModel('export_orders', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'batch_id UUID REFERENCES batches(id) ON DELETE SET NULL',
    'quantity_kg FLOAT NOT NULL',
    'destination VARCHAR(255) NOT NULL',
    'export_date TIMESTAMP DEFAULT NOW()',
    'status VARCHAR(50) DEFAULT \'pending\'',
    'created_at TIMESTAMP DEFAULT NOW()',
    'updated_at TIMESTAMP DEFAULT NOW()',
]);

module.exports = ExportOrderModel;