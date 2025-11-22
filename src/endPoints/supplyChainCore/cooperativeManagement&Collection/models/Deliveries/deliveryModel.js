const BaseModel = require('../../../../../config/basemodel/baseModel');

class DeliveryModel extends BaseModel{
  constructor(data = {}){
    super('deliveries', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'cooperative_id UUID REFERENCES cooperatives(id) ON DELETE SET NULL',
  'batch_id UUID REFERENCES batches(id) ON DELETE SET NULL',
  'weight_kg FLOAT NOT NULL',
  'cherry_grade VARCHAR(50) NOT NULL',
  'delivery_date TIMESTAMP DEFAULT NOW()',
]);
    Object.assign(this, data);
  }
  toJSON(){
    return {
      id: this.id,
      cooperative_id: this.cooperative_id,
      batch_id: this.batch_id,
      weight_kg: this.weight_kg,
      cherry_grade: this.cherry_grade,
      delivery_date: this.delivery_date,
    }
  }
}

module.exports = DeliveryModel;