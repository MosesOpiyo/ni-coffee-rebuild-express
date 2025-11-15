const express = require('express');
const OrderController = require('../controllers/orderController');

const orderRoutes = express.Router();

// Routes
orderRoutes.get('/', OrderController.getAllOrders);
orderRoutes.get('/:id', OrderController.getOrderById);
orderRoutes.post('/', OrderController.createOrder);
orderRoutes.put('/:id', OrderController.updateOrder);
orderRoutes.delete('/:id', OrderController.deleteOrder);

module.exports = orderRoutes;