const WishListRepository = require('../models/Wishlist/wishListRepository')

class WishListController {
  async getAllWishLists(req, res) {
    try {
      const wishlist = await WishListRepository.findAll();
      if (!wishlist.length) return res.status(404).json({ error: 'No wishlist found' });
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getWishListById(req, res) {
    try {
      const { id } = req.params;
      const cart = await WishListRepository.findById(id);
      if (!cart) return res.status(404).json({ error: 'Cart not found' });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getWishListByUser(req, res) {
    try {
      const { user_id } = req.params;
      const cart = await WishListRepository.findOne('user_id', user_id);
      if (!cart) return res.status(404).json({ error: 'No cart found for this user' });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createWishList(req, res) {
    try {
      const cartData = req.body;
      const cart = await WishListRepository.create(cartData);
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateWishList(req, res) {
    try {
      const { id } = req.params;
      const cartData = req.body;
      const cart = await WishListRepository.update(id, cartData);
      if (!cart) return res.status(404).json({ error: 'Cart not found' });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteWishList(req, res) {
    try {
      const { id } = req.params;
      const result = await WishListRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new WishListController();
