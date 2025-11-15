const BaseModel = require('../../../../../config/basemodel/baseModel');


const WishListModel = new BaseModel('wishlists', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE',
  'created_at TIMESTAMP DEFAULT NOW()',
  'updated_at TIMESTAMP DEFAULT NOW()'
]);

module.exports = WishListModel;
