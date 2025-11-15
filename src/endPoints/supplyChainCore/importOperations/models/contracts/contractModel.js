const BaseModel = require('../../../../../config/basemodel/baseModel');

const ContractModel = new BaseModel('contracts',[
    'contract_id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL',
    'product_id UUID REFERENCES products(id) ON DELETE SET NULL',
    'quantity INTEGER NOT NULL',
    'price DECIMAL(10, 2) NOT NULL',
    'currency VARCHAR(3) NOT NULL',
    'start_date TIMESTAMP NOT NULL',
    'end_date TIMESTAMP NOT NULL',
    'status VARCHAR(50) DEFAULT \'active\'',
    'created_at TIMESTAMP DEFAULT NOW()',
    'updated_at TIMESTAMP DEFAULT NOW()'
])

module.exports = ContractModel;