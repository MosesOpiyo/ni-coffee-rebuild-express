const BaseRepository = require('../../../../config/baseRepository/baseRepository');
const PriceModel = require('../models/priceModel');

class PriceRepository extends BaseRepository{
    constructor() {
        super('price', PriceModel);
    }

}

module.exports =  new PriceRepository();