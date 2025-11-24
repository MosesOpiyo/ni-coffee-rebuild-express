const WishlistItems = require('../WishlistItems/wishListItemModel');
const BaseReposistory = require('../../../../../config/baseRepository/baseRepository')


class WishListItemRepository extends BaseReposistory {
    constructor() {
        super('wishlist_items', WishlistItems);
    }
}

module.exports = new WishListItemRepository();