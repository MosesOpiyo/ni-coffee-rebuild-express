const OrderRespository = require('../models/Orders/ordersRepository');

class OrderController {
    async getAllOrders(req, res) {
        try {
            const orders = await OrderRespository.findAll();
            if (!orders) {
                return res.status(404).json({ error: 'No orders found' });
            } else {
                res.status(200).json(orders);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getOrdersByBuyerId (req, res) {
        try {
            const { id } = req.params;
            const batch = await OrderRespository.findById(id);
            if (!batch) {
                return res.status(404).json({ error: 'Orders not found' });
            }
            res.status(200).json(batch);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createOrder (req, res){
        try {
            const orderData = req.body;
            const batch = await OrderRespository.create(orderData);
            res.status(201).json(batch);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateOrder (req, res){
        try {
            const { id } = req.params;
            const orderData = req.body;
            const batch = await OrderRespository.update(id, orderData);
            if (!batch) {
                return res.status(404).json({ error: 'Order not found' });
            }else {
                res.status(200).json(batch);
            };} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async deleteOrder (req, res){
        try {
            const { id } = req.params;
            const result = await OrderRespository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new OrderController();