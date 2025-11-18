const baseRepository = require('../../../../../config/baseRepository/baseRepository')
const CartItem = require('./cartItemModel');


class CartItemRepository extends baseRepository {
    constructor() {
        super('cart_items', CartItem);
    }
}

module.exports = new CartItemRepository();