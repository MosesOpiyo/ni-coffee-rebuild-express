const BaseModel = require('../../../../../config/basemodel/baseModel');

const BatchModel = new BaseModel('batches', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'cooperative_id UUID REFERENCES cooperatives(id) ON DELETE SET NULL',
    'batch_code VARCHAR(100) UNIQUE NOT NULL',
    'grade VARCHAR(50) NOT NULL',
    'weight_kg FLOAT NOT NULL',
    'status VARCHAR(50) DEFAULT \'pending\'',
    'created_at TIMESTAMP DEFAULT NOW()',
    'updated_at TIMESTAMP DEFAULT NOW()'
]);

module.exports = BatchModel;