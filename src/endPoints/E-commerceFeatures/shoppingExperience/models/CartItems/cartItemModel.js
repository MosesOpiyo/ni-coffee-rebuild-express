const BaseModel = require('../../../../../config/basemodel/baseModel');

class CartItemModel extends BaseModel{
  constructor(data={}){
    super('cart_items', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'cart_id UUID REFERENCES carts(id) ON DELETE CASCADE',
    'product_id UUID REFERENCES products(id) ON DELETE CASCADE',
    'price FLOAT NOT NULL',
    'quantity FLOAT NOT NULL',
    'added_at TIMESTAMP DEFAULT NOW()'
  ]);

  Object.assign(this, data);
  }

  toJSON(){
    return {
      id: this.id,
      cart_id: this.cart_id,
      product_id: this.product_id,
      price: this.price,
      quantity: this.quantity,
      added_at: this.added_at
    }
  }
}

module.exports = CartItemModel;