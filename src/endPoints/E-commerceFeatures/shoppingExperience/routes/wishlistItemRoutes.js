const express = require('express');

const WishListItemController = require('../controllers/wishListItemController');

const WishListItemRouter = express.Router();

// Routes
WishListItemRouter.get('/', WishListItemController.getAllWishListItems);
WishListItemRouter.get('/:id', WishListItemController.getWishListItemById);
WishListItemRouter.get('/cart/:cart_id', WishListItemController.getItemsByWishList);
WishListItemRouter.post('/', WishListItemController.createWishListItem);
WishListItemRouter.put('/:id', WishListItemController.updateWishListItem);
WishListItemRouter.delete('/:id', WishListItemController.deleteWishListItem);
WishListItemRouter.delete('/clear/:cart_id', WishListItemController.clearWishList);

module.exports = WishListItemRouter;