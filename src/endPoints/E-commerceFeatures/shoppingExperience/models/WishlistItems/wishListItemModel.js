const BaseModel = require('../../../../../config/basemodel/baseModel');

class WishListItemModel extends BaseModel{
  constructor(data={}){
    super('wishlist_items', [
      'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
      'user_id UUID REFERENCES users(id) ON DELETE SET NULL',
      'wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE',
      'product_id UUID REFERENCES products(id) ON DELETE CASCADE',
      'price FLOAT NOT NULL',
      'quantity FLOAT NOT NULL',
      'added_at TIMESTAMP DEFAULT NOW()'
    ]);
    Object.assign(this, data);
    }

  toJSON(){
    return{
      id: this.id,
      wishlist_id: this.wishlist_id,
      product_id: this.product_id,
      price: this.price,
      quantity: this.quantity,
      added_at: this.added_at
    }
  }
}

module.exports = WishListItemModel;