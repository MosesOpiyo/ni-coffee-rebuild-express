class Order {
  constructor (
    id,
    buyer_id,
    quantity,
    total_price,
    status,
    created_at
  ) {
    this.id = id,
    this.buyer_id = buyer_id,
    this.quantity = quantity,
    this.total_price = total_price,
    this.status = status,
    this.created_at = created_at
  }
}

module.exports = Order