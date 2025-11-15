const BaseModel = require('../../../../../config/basemodel/baseModel');

const PaymentModel = new BaseModel('payments', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'order_id UUID REFERENCES orders(id) ON DELETE CASCADE',
  'amount FLOAT NOT NULL',
  'currency TEXT NOT NULL',
  'status TEXT NOT NULL', // e.g., pending, completed, failed
  'payment_method TEXT NOT NULL', // e.g., stripe, wire_transfer
  'provider_payment_id TEXT UNIQUE',
  'created_at TIMESTAMP DEFAULT NOW()',
  'updated_at TIMESTAMP DEFAULT NOW()'
]);

module.exports = PaymentModel;
