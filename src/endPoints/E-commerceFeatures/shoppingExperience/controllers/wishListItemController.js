const WishListItemRepository = require('../models/WishlistItems/wishListItemRepository');

class WishListItemController {
  async getAllWishListItems(req, res) {
    try {
      const wishListItems = await WishListItemRepository.findAll();
      if (!wishListItems) return res.status(404).json({ error: 'No wishlist items found' });
      res.status(200).json(wishListItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getWishListItemById(req, res) {
    try {
      const { id } = req.params;
      const wishListItem = await WishListItemRepository.findById(id);
      if (!wishListItem) return res.status(404).json({ error: 'Wish list item not found' });
      res.status(200).json(wishListItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getItemsByWishList(req, res) {
    try {
      const { WishListId } = req.params;
      const items = await WishListItemRepository.findByCartId(WishListId);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createWishListItem(req, res) {
    try {
      const wishListItemData = req.body;
      const wishListItem = await WishListItemRepository.create(wishListItemData);
      res.status(201).json(wishListItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateWishListItem(req, res) {
    try {
      const { id } = req.params;
      const wishListItemData = req.body;
      const updated = await WishListItemRepository.update(id, wishListItemData);
      if (!updated) return res.status(404).json({ error: 'Cart item not found' });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteWishListItem(req, res) {
    try {
      const { id } = req.params;
      const result = await WishListItemRepository.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async clearWishList(req, res) {
    try {
      const { wishListId } = req.params;
      const result = await WishListItemRepository.clearWishList(wishListId);
      res.status(200).json({ message: 'Wish List cleared successfully', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new WishListItemController();
