const express = require('express');
const OrderController = require('../controllers/orderController');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const orderRoutes = express.Router();

// Routes
orderRoutes.get('/', limiter, OrderController.getAllOrders);
orderRoutes.get('/:id', limiter, OrderController.getOrderById);
orderRoutes.post('/', limiter, OrderController.createOrder);
orderRoutes.post('/create-from-cart/:cartId', limiter, OrderController.createOrderFromCart);
orderRoutes.get('/summary/:userId', limiter, OrderController.getOrderSummary);
orderRoutes.delete('/cancel/:orderId', limiter, OrderController.cancelOrder);
orderRoutes.put('/:id', limiter, OrderController.updateOrder);
orderRoutes.delete('/:id', limiter, OrderController.deleteOrder);

module.exports = orderRoutes;