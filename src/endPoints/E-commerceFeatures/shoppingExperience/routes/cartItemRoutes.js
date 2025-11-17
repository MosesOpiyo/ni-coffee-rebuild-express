const express = require('express');

const CartItemController = require('../controllers/cartItemController');
const limiter = require('../../../../middleware/rateLimitingMiddleware');
const { verifyToken, verifyRole } = require('../../../../middleware/authMiddleware');

const ROLES = require('../../../auth/middleware/roles');

const CartItemRoutes = express.Router();

// Routes
CartItemRoutes.get('/', limiter, CartItemController.getAllCartItems);
CartItemRoutes.get('/:id', limiter, CartItemController.getCartItemById);
CartItemRoutes.get('/cart/:cart_id', limiter, CartItemController.getItemsByCart);
CartItemRoutes.post('/', limiter, CartItemController.createCartItem);
CartItemRoutes.put('/:id', limiter, CartItemController.updateCartItem);
CartItemRoutes.delete('/:id', limiter, CartItemController.deleteCartItem);
CartItemRoutes.delete('/clear/:cart_id', limiter, CartItemController.clearCart);

module.exports = CartItemRoutes;