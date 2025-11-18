const baseRepository = require('../../../../../config/baseRepository/baseRepository')
const Cart = require('../Cart/cartClass')


class CartRepository extends baseRepository {
    constructor() {
        super('carts', Cart);
    }
}

module.exports = new CartRepository();