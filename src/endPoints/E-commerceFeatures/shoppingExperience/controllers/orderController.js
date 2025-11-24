const OrderRespository = require('../models/Orders/ordersRepository');

class OrderController {
    sendError(res, code, message) {
    return res.status(code).json({ error: message });
  }

  // ---------------------------
  // Get all orders
  // ---------------------------
  async getAllOrders(req, res) {
    try {
      const orders = await OrderRespository.findAll();
      if (!orders || orders.length === 0)
        return this.sendError(res, 404, 'No orders found');

      return res.status(200).json(orders);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Get orders by buyer ID
  // ---------------------------
  async getOrdersByBuyerId(req, res) {
    try {
      const { id } = req.params;
      if (!id) return this.sendError(res, 400, 'Buyer ID is required');

      const orders = await OrderRespository.findMany('buyer_id', [id]);
      if (!orders || orders.length === 0)
        return this.sendError(res, 404, 'Orders not found');

      return res.status(200).json(orders);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Create a new order
  // ---------------------------
  async createOrder(req, res) {
    try {
      const orderData = req.body;
      const order = await OrderRespository.create(orderData);
      return res.status(201).json(order);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Update an order
  // ---------------------------
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      if (!id) return this.sendError(res, 400, 'Order ID is required');

      const updated = await OrderRespository.update(id, req.body);
      if (!updated) return this.sendError(res, 404, 'Order not found');

      return res.status(200).json(updated);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Delete an order
  // ---------------------------
  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      if (!id) return this.sendError(res, 400, 'Order ID is required');

      const deleted = await OrderRespository.delete(id);
      if (!deleted) return this.sendError(res, 404, 'Order not found');

      return res.status(200).json({
        message: 'Order deleted successfully',
        order: deleted
      });
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Create order from cart
  // ---------------------------
  async createOrderFromCart(req, res) {
    try {
      const { cartId } = req.params;
      if (!cartId) return this.sendError(res, 400, 'Cart ID is required');

      const cart = await this.cartRepo.findById(cartId);
      if (!cart) return this.sendError(res, 404, 'Cart not found');

      const cartItems = await this.cartItemRepo.findMany('cart_id', [cart.id]);
      if (!cartItems || cartItems.length === 0)
        return this.sendError(res, 404, 'Cart is empty');

      // Create order
      const order = await OrderRespository.create({
        cart_id: cart.id,
        status: 'Pending'
      });

      let totalPrice = 0;
      for (const item of cartItems) {
        totalPrice += item.price * item.quantity;
        await this.orderItemRepo.create({
          order_id: order.id,
          cart_item_id: item.id,
          price: item.price,
          quantity: item.quantity
        });
      }

      await OrderRespository.update(order.id, {
        price: totalPrice,
        quantity: cartItems.length
      });

      return res.status(201).json({ message: 'Order created', orderId: order.id });
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Get order summary for a user
  // ---------------------------
  async getOrderSummary(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) return this.sendError(res, 400, 'User ID is required');

      const cart = await this.cartRepo.findOne('user_id', [userId]);
      if (!cart) return this.sendError(res, 404, 'Cart not found');

      const order = await OrderRespository.findOne('cart_id', [cart.id]);
      if (!order) return this.sendError(res, 404, 'Order not found');

      const orderItems = await this.orderItemRepo.findMany('order_id', [order.id]);

      return res.status(200).json({ order, orderItems });
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Cancel an order
  // ---------------------------
  async cancelOrder(req, res) {
    try {
      const { orderId } = req.params;
      if (!orderId) return this.sendError(res, 400, 'Order ID is required');

      const order = await OrderRespository.findById(orderId);
      if (!order) return this.sendError(res, 404, 'Order not found');

      await OrderRespository.update(orderId, { status: 'Cancelled' });
      return res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }
}

module.exports = new OrderController();