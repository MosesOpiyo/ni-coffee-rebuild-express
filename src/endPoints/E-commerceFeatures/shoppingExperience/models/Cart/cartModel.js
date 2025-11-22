const BaseModel = require('../../../../../config/basemodel/baseModel');


class CartModel extends BaseModel{
  constructor(data={}){
    super('carts', [
      'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
      'user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE',
    ]);
    Object.assign(this, data);
  }

  toJSON(){
    return {
      id: this.id,
      user_id: this.user_id,
    }
  }
}

module.exports = CartModel;
