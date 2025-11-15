class Payment {
  constructor(
    id,
    order_id,
    amount,
    currency,
    status,
    payment_method,
    provider_payment_id,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.order_id = order_id;
    this.amount = amount;
    this.currency = currency;
    this.status = status;
    this.payment_method = payment_method;
    this.provider_payment_id = provider_payment_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = Payment;
