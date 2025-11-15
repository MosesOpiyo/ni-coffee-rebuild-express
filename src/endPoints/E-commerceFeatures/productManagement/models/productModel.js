const BaseModel = require("../../../../config/basemodel/baseModel");

const ProductModel = new BaseModel('products', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'name VARCHAR(255) NOT NULL',
    'description TEXT',
    'price_per_kg FLOAT NOT NULL',
    'stock FLOAT NOT NULL',
    'grade VARCHAR(100)',
    'origin VARCHAR(100)',
    'cupping_score FLOAT',
    'created_at TIMESTAMP DEFAULT NOW()',
    'updated_at TIMESTAMP DEFAULT NOW()'
]);

module.exports = ProductModel;