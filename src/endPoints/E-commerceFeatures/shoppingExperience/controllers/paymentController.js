const PaymentRepository = require('../models/Payments/paymentRepository');

class PaymentController {
    async getAllPayments(req, res) {
        try {
            const payments = await PaymentRepository.findAll();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPaymentById(req, res) {
        try {
            const { id } = req.params;
            const payment = await PaymentRepository.findById(id);
            if (!payment) return res.status(404).json({ error: 'Payment not found' });
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPaymentsByOrderId(req, res) {
        try {
            const { order_id } = req.params;
            const payments = await PaymentRepository.findByOrderId(order_id);
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPayment(req, res) {
        try {
            const paymentData = req.body;
            const payment = await PaymentRepository.create(paymentData);
            res.status(201).json(payment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePayment(req, res) {
        try {
            const { id } = req.params;
            const paymentData = req.body;
            const payment = await PaymentRepository.update(id, paymentData);
            if (!payment) return res.status(404).json({ error: 'Payment not found' });
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePayment(req, res) {
        try {
            const { id } = req.params;
            const result = await PaymentRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PaymentController();
