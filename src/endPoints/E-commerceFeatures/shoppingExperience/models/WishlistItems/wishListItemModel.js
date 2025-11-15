const BaseModel = require('../../../../../config/basemodel/baseModel');

const WishListItemModel = new BaseModel('wishlist_items', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE',
  'product_id UUID REFERENCES products(id) ON DELETE CASCADE',
  'price FLOAT NOT NULL',
  'quantity FLOAT NOT NULL',
  'added_at TIMESTAMP DEFAULT NOW()'
]);

module.exports = WishListItemModel;