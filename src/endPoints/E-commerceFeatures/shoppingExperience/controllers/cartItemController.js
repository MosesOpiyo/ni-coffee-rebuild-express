// controllers/cartItemController.js
const CartItemRepository = require('../models/CartItems/cartItemRepository');
const CartRepository = require('../models/Cart/cartRepository');
const ProductRepository = require('../../productManagement/models/productRepository');
            

class CartItemController {
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

    async removeFromCart(req, res) {
        try {
            const { cartItemId } = req.params;
            const cartItem = await CartItemRepository.delete(cartItemId);
            res.status(200).json(cartItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCartItem(req, res) {
        try {
            const { cartItemId } = req.params;
            const { quantity } = req.body;
            const cartItem = await CartItemRepository.update(cartItemId, { quantity });
            res.status(200).json(cartItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async getCartItems(req, res) {
        try {
            const { cartId } = req.params;
            const cartItems = await CartItemRepository.findMany('cart_id', cartId);
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CartItemController();
