const BaseRepository = require('../../../../../config/baseRepository/baseRepository');
const PaymentModel = require('./models/paymentsModel');

class PaymentRepository extends BaseRepository {
    constructor() {
        super('payments', PaymentModel);
    }
}

module.exports = new PaymentRepository();
