// controllers/cartItemController.js
const CartItemRepository = require('../models/CartItems/cartItemRepository');
const CartRepository = require('../models/Cart/cartRepository');
const ProductRepository = require('../../productManagement/models/productRepository');
            

class CartItemController {
  async getAllCartItems(req, res) {
    try {
      const cartItems = await CartItemRepository.findAll();
      if (!cartItems) return res.status(404).json({ error: 'No cart items found' });
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartItemById(req, res) {
    try {
      const { id } = req.params;
      const cartItem = await CartItemRepository.findById(id);
      if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getItemsByCart(req, res) {
    try {
      const { cart_id } = req.params;
      const items = await CartItemRepository.findByCartId(cart_id);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCartItem(req, res) {
    try {
      const cartItemData = req.body;
      const cartItem = await CartItemRepository.create(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addToCart(req, res) {
        try {
            const { productId, price, quantity } = req.body;
            const { cartId } = req.params;
            const cart = await CartRepository.findById(cartId);
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }
            const cartItem = await CartItemRepository.create({
                cart_id: cartId,
                product_id: productId,
                price: price,
                quantity: quantity
            });
            res.status(201).json(cartItem);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
  }

  async updateCartItem(req, res) {
    try {
      const { id } = req.params;
      const cartItemData = req.body;
      const updated = await CartItemRepository.update(id, cartItemData);
      if (!updated) return res.status(404).json({ error: 'Cart item not found' });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async checkProductStockBeforeAddToCart(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            const product = await ProductRepository.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            if (product.stock < quantity) {
                return res.status(400).json({ error: 'Insufficient stock' });
            }
            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

  async deleteCartItem(req, res) {
    try {
      const { id } = req.params;
      const result = await CartItemRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const { cart_id } = req.params;
      const result = await CartItemRepository.clearCart(cart_id);
      res.status(200).json({ message: 'Cart cleared successfully', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CartItemController();
