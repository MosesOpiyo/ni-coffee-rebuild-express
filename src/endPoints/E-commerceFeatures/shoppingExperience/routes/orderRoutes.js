const express = require('express');
const OrderController = require('../controllers/orderController');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const orderRoutes = express.Router();

// Routes
orderRoutes.get('/', limiter, OrderController.getAllOrders);
orderRoutes.get('/:id', limiter, OrderController.getOrderById);
orderRoutes.post('/', limiter, OrderController.createOrder);
orderRoutes.put('/:id', limiter, OrderController.updateOrder);
orderRoutes.delete('/:id', limiter, OrderController.deleteOrder);

module.exports = orderRoutes;