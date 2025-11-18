const BaseRepository = require('../../../../config/baseRepository/baseRepository');
const ProductModel = require('../models/productModel');

class ProductRepository extends BaseRepository {
    constructor() {
        super('products', ProductModel);
    }
}

module.exports = new ProductRepository();