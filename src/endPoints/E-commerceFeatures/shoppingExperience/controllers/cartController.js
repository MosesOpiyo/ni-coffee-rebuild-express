const CartRepository = require('../models/Cart/cartRepository');

class CartController {
  async getAllCarts(req, res) {
        try {
            const carts = await CartRepository.findAll();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCartById(req, res) {
        try {
            const { id } = req.params;
            const cart = await CartRepository.findById(id);
            const cartItems = await CartItemRepository.findMany('cart_id', cart.id);
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }
            res.status(200).json({
                cart,
                cartItems
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCartByUserId(req, res) {
        try {
            const { userId } = req.params;
            const cart = await CartRepository.findOne('user_id', userId);
            const cartItems = await CartItemRepository.findMany('cart_id', cart.id);
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }
            res.status(200).json({
                cart,
                cartItems
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async clearCart(req, res) {
        try {
            const { id } = req.params;
            const cart = await CartRepository.findById(id);
            const cart_items = await CartItemRepository.findMany('cart_id', cart.id);
            for (const item of cart_items) {
                await CartItemRepository.delete(item.id);
            }
            res.status(200).json({ message: 'Cart cleared' });
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
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCart(req, res){
        try {
            const { id } = req.params;
            const cart = await CartRepository.delete(id);
            res.status(200).json("Cart deleted")
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
}

module.exports = new CartController();
