const BaseModel = require('../../../../../config/basemodel/baseModel');

class PaymentModel extends BaseModel{
  constructor(data={}){
    super('payments', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'order_id UUID REFERENCES orders(id) ON DELETE CASCADE',
    'amount FLOAT NOT NULL',
    'currency TEXT NOT NULL',
    'status TEXT NOT NULL', // e.g., pending, completed, failed
    'payment_method TEXT NOT NULL', // e.g., stripe, wire_transfer
    'provider_payment_id TEXT UNIQUE',
  ]);
  Object.assign(this, data);
  }

  toJSON(){
    return {
      id: this.id,
      order_id: this.order_id,
      amount: this.amount,
      currency: this.currency,
      status: this.status,
      payment_method: this.payment_method,
      provider_payment_id: this.provider_payment_id,
    }
  }
}

module.exports = PaymentModel;
