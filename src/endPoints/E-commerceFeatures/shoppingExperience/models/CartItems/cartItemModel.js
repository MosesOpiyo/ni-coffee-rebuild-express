const BaseModel = require('../../../../../config/basemodel/baseModel');

const CartItemModel = new BaseModel('cart_items', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'cart_id UUID REFERENCES carts(id) ON DELETE CASCADE',
  'product_id UUID REFERENCES products(id) ON DELETE CASCADE',
  'price FLOAT NOT NULL',
  'quantity FLOAT NOT NULL',
  'added_at TIMESTAMP DEFAULT NOW()'
]);

module.exports = CartItemModel;