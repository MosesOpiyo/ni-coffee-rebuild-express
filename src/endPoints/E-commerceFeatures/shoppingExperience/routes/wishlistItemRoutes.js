const express = require('express');

const WishListItemController = require('../controllers/wishListItemController');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const WishListItemRouter = express.Router();

// Routes
WishListItemRouter.get('/',limiter, WishListItemController.getAllWishListItems);
WishListItemRouter.get('/:id',limiter, WishListItemController.getWishListItemById);
WishListItemRouter.get('/cart/:cart_id',limiter, WishListItemController.getItemsByWishList);
WishListItemRouter.post('/',limiter, WishListItemController.createWishListItem);
WishListItemRouter.put('/:id',limiter, WishListItemController.updateWishListItem);
WishListItemRouter.delete('/:id',limiter, WishListItemController.deleteWishListItem);
WishListItemRouter.delete('/clear/:cart_id',limiter, WishListItemController.clearWishList);

module.exports = WishListItemRouter;