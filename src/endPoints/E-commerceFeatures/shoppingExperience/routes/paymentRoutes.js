const express = require('express');
const PaymentController = require('../controllers/paymentController');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const PaymentRouter = express.Router();

// Routes
PaymentRouter.get('/',limiter, PaymentController.getAllPayments);
PaymentRouter.get('/:id',limiter, PaymentController.getPaymentById);
PaymentRouter.get('/order/:order_id',limiter, PaymentController.getPaymentsByOrderId);
PaymentRouter.post('/',limiter, PaymentController.createPayment);
PaymentRouter.put('/:id',limiter, PaymentController.updatePayment);
PaymentRouter.delete('/:id',limiter, PaymentController.deletePayment);

module.exports = PaymentRouter;
