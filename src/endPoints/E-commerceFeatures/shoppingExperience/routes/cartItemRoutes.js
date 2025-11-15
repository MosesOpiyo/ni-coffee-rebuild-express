const express = require('express');

const CartItemController = require('../controllers/cartItemController');

const CartItemRoutes = express.Router();

// Routes
CartItemRoutes.get('/', CartItemController.getAllCartItems);
CartItemRoutes.get('/:id', CartItemController.getCartItemById);
CartItemRoutes.get('/cart/:cart_id', CartItemController.getItemsByCart);
CartItemRoutes.post('/', CartItemController.createCartItem);
CartItemRoutes.put('/:id', CartItemController.updateCartItem);
CartItemRoutes.delete('/:id', CartItemController.deleteCartItem);
CartItemRoutes.delete('/clear/:cart_id', CartItemController.clearCart);

module.exports = CartItemRoutes;