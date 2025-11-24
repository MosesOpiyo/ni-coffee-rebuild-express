const express = require('express');

const CartItemController = require('../controllers/cartItemController');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware');
const { verifyToken, verifyRole } = require('../../../../middleware/authMiddleware');

const ROLES = require('../../../auth/middleware/roles');

const CartItemRoutes = express.Router();

// Routes
CartItemRouter.post('/:cartId/items', CartItemController.checkProductStockBeforeAddToCart, CartItemController.addToCart);
CartItemRouter.delete('/:cartItemId', CartItemController.removeFromCart);
CartItemRouter.put('/:cartItemId', CartItemController.updateCartItem);
CartItemRouter.get('/:cartId/items', CartItemController.getCartItems);

module.exports = CartItemRoutes;