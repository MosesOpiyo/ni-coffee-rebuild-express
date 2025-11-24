const BaseRepository = require('../../../../../config/baseRepository/baseRepository')
const OrderModel = require('../Orders/ordersModel')

class OrderRepository extends BaseRepository {
    constructor() {
        super('orders', OrderModel);
    }
}

module.exports = new OrderRepository();