const BaseRepository = require('../../../../../config/baseRepository/baseRepository');
const WishListModel = require('./wishListModel');


class WishListRepository extends BaseRepository {
    constructor() {
        super('wishlists', WishListModel);
    }
}

module.exports = new WishListRepository();