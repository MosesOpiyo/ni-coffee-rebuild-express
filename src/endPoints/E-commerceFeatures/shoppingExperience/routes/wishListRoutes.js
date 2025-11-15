const express = require('express');
const wishListController = require('../controllers/wishListController');

const wishListrouter = express.Router();

// Routes
wishListrouter.get('/', wishListController.getAllWishLists);
wishListrouter.get('/:id', wishListController.getWishListById);
wishListrouter.get('/user/:user_id', wishListController.getWishListByUser);
wishListrouter.post('/', wishListController.createWishList);
wishListrouter.put('/:id', wishListController.updateWishList);
wishListrouter.delete('/:id', wishListController.deleteWishList);

module.exports = wishListrouter;
