// models/CartItems/cartItem.js
class CartItem {
  constructor(id, cart_id, product_id, quantity, added_at) {
    this.id = id;
    this.cart_id = cart_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.added_at = added_at;
  }
}

module.exports = CartItem;
