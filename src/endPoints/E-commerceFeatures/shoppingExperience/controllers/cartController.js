const CartRepository = require('../models/Cart/cartRepository');

class CartController {
  async getAllCarts(req, res) {
    try {
      const carts = await CartRepository.findAll();
      if (!carts.length) return res.status(404).json({ error: 'No carts found' });
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const { id } = req.params;
      const cart = await CartRepository.findById(id);
      if (!cart) return res.status(404).json({ error: 'Cart not found' });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartByUser(req, res) {
    try {
      const { user_id } = req.params;
      const cart = await CartRepository.findByUserId(user_id);
      if (!cart) return res.status(404).json({ error: 'No cart found for this user' });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCart(req, res) {
    try {
      const cartData = req.body;
      const cart = await CartRepository.create(cartData);
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCart(req, res) {
    try {
      const { id } = req.params;
      const cartData = req.body;
      const cart = await CartRepository.update(id, cartData);
      if (!cart) return res.status(404).json({ error: 'Cart not found' });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCart(req, res) {
    try {
      const { id } = req.params;
      const result = await CartRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CartController();
