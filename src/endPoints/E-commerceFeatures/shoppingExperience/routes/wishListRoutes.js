const express = require('express');
const wishListController = require('../controllers/wishListController');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const wishListrouter = express.Router();

// Routes
wishListrouter.get('/',limiter, wishListController.getAllWishLists);
wishListrouter.get('/:id',limiter, wishListController.getWishListById);
wishListrouter.get('/user/:user_id',limiter, wishListController.getWishListByUser);
wishListrouter.post('/',limiter, wishListController.createWishList);
wishListrouter.put('/:id',limiter, wishListController.updateWishList);
wishListrouter.delete('/:id',limiter, wishListController.deleteWishList);

module.exports = wishListrouter;
