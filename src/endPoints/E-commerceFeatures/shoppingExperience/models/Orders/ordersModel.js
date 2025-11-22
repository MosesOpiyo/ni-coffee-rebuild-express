const BaseModel = require('../../../../../config/basemodel/baseModel');

class OrderModel extends BaseModel{
   constructor(data={}){
      super('orders', [
         'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
         'buyer_id UUID REFERENCES users(id) on DELETE SET NULL',
         'quantity FLOAT NOT NULL',
         'full_price FLOAT NOT NULL',
         'status TEXT DEFAULT \'pending\''
         ]);
         Object.assign(this, data);
      }

      toJSON(){
         return {
            id: this.id,
            buyer_id: this.buyer_id,
            quantity: this.quantity,
            full_price: this.full_price,
            status: this.status,
         }
      }
}

module.exports = OrderModel