const express = require('express');
const CartController = require('../controllers/cartController');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const cartRouter = express.Router();

// Routes
cartRouter.get('/:id', limiter, CartController.getCartById);
cartRouter.get('/user/:user_id', limiter, CartController.getCartByUserId);
cartRouter.post('/', limiter, CartController.createCart);
cartRouter.put('/:id', limiter, CartController.updateCart);
cartRouter.delete('/clear/:id', limiter, CartController.clearCart);
cartRouter.delete('/:id', limiter, CartController.deleteCart);

module.exports = cartRouter;
