const express = require('express');
const PaymentController = require('../controllers/paymentController');

const PaymentRouter = express.Router();

// Routes
PaymentRouter.get('/', PaymentController.getAllPayments);
PaymentRouter.get('/:id', PaymentController.getPaymentById);
PaymentRouter.get('/order/:order_id', PaymentController.getPaymentsByOrderId);
PaymentRouter.post('/', PaymentController.createPayment);
PaymentRouter.put('/:id', PaymentController.updatePayment);
PaymentRouter.delete('/:id', PaymentController.deletePayment);

module.exports = PaymentRouter;
