const express = require('express');
const CartController = require('../controllers/cartController');

const cartRouter = express.Router();

// Routes
cartRouter.get('/', CartController.getAllCarts);
cartRouter.get('/:id', CartController.getCartById);
cartRouter.get('/user/:user_id', CartController.getCartByUser);
cartRouter.post('/', CartController.createCart);
cartRouter.put('/:id', CartController.updateCart);
cartRouter.delete('/:id', CartController.deleteCart);

module.exports = cartRouter;
