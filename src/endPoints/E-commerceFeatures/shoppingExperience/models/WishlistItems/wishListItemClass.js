// models/CartItems/cartItem.js
class WistListItem {
  constructor(id, wishlist_id, product_id, quantity, added_at) {
    this.id = id;
    this.wishlist_id = wishlist_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.added_at = added_at;
  }
}

module.exports = WistListItem;
