const BaseModel = require('../../../../../config/basemodel/baseModel');

const OrderModel = new BaseModel('orders', [
   'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
   'buyer_id UUID REFERENCES users(id) on DELETE SET NULL',
   'quantity FLOAT NOT NULL',
   'full_price FLOAT NOT NULL',
   'status TEXT DEFAULT \'pending\'',
   'created_at TIMESTAMP DEFAULT NOW()'
])

module.exports = OrderModel