const express = require('express');

const WishListItemController = require('../controllers/wishListItemController');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const WishListItemRouter = express.Router();

// Routes
WishListItemRouter.get('/', limiter, WishListItemController.getAllWishListItems);
WishListItemRouter.get('/:id', limiter, WishListItemController.getWishListItemById);
WishListItemRouter.get('/wishlist/:wishListId', limiter, WishListItemController.getItemsByWishList);
WishListItemRouter.post('/', limiter, WishListItemController.createWishListItem);
WishListItemRouter.put('/:id', limiter, WishListItemController.updateWishListItem);
WishListItemRouter.delete('/:id', limiter, WishListItemController.deleteWishListItem);
WishListItemRouter.delete('/clear/:wishListId', limiter, WishListItemController.clearWishList);
WishListItemRouter.post('/move-to-cart/:cartId/:id', limiter, WishListItemController.moveToCart);

module.exports = WishListItemRouter;