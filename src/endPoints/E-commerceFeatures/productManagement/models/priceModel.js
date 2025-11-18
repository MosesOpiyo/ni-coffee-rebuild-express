const BaseModel = require('../../../../config/basemodel/baseModel');

const PriceModel = new BaseModel('price',[
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'price_per_kg FLOAT NOT NULL',
    'currency VARCHAR(10) NOT NULL',
    'is_active BOOLEAN DEFAULT TRUE',
    'created_at TIMESTAMP DEFAULT NOW()',]);

module.exports = PriceModel;