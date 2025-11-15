const BaseModel = require('../../../../../config/basemodel/baseModel');

const DeliveryModel = new BaseModel('deliveries', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'cooperative_id UUID REFERENCES cooperatives(id) ON DELETE SET NULL',
  'batch_id UUID REFERENCES batches(id) ON DELETE SET NULL',
  'weight_kg FLOAT NOT NULL',
  'cherry_grade VARCHAR(50) NOT NULL',
  'delivery_date TIMESTAMP DEFAULT NOW()',
]);

module.exports = DeliveryModel;