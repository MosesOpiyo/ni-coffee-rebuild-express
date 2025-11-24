const WishListItemRepository = require('../models/WishlistItems/wishListItemRepository');
const CartRepository = require('../models/Cart/cartRepository');
const CartItemRepository = require('../models/CartItems/cartItemRepository');


class WishListItemController {
  sendError(res, code, message) {
    return res.status(code).json({ error: message });
  }

  async getAllWishListItems(req, res) {
    try {
      const items = await WishListItemRepository.findAll();
      if (!items || items.length === 0)
        return this.sendError(res, 404, "No wishlist items found");

      return res.status(200).json(items);

    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  async getWishListItemById(req, res) {
    try {
      const { id } = req.params;

      if (!id) return this.sendError(res, 400, "Missing wishlist item ID");

      const item = await WishListItemRepository.findById(id);
      if (!item) return this.sendError(res, 404, "Wishlist item not found");

      return res.status(200).json(item);

    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  async getItemsByWishList(req, res) {
    try {
      const { wishListId } = req.params;

      if (!wishListId) return this.sendError(res, 400, "Missing wishlist ID");

      const items = await WishListItemRepository.findByWishListId(wishListId);

      return res.status(200).json(items);

    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  async createWishListItem(req, res) {
    try {
      const data = req.body;

      const item = await WishListItemRepository.create(data);
      return res.status(201).json(item);

    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  async updateWishListItem(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id) return this.sendError(res, 400, "Missing wishlist item ID");

      const updated = await WishListItemRepository.update(id, data);
      if (!updated)
        return this.sendError(res, 404, "Wishlist item not found");

      return res.status(200).json(updated);

    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  async moveToCart(req, res) {
  try {
    const { cartId, id: wishListId } = req.params;
    const { items: selectedItems } = req.body;  // Optional bulk list

    if (!cartId || !wishListId)
      return this.sendError(res, 400, "Missing cartId or wishListId");

    const cart = await CartRepository.findById(cartId);
    if (!cart) return this.sendError(res, 404, "Cart not found");

    let wishlistItems;

    if (Array.isArray(selectedItems) && selectedItems.length > 0) {
      // BULK MODE — Move specific wishlist item IDs
      wishlistItems = await WishListItemRepository.findManyByIds(selectedItems);

      if (!wishlistItems || wishlistItems.length === 0)
        return this.sendError(res, 404, "Selected wishlist items not found");

    } else {
      // MOVE FULL WISHLIST
      wishlistItems = await WishListItemRepository.findByWishListId(wishListId);

      if (!wishlistItems || wishlistItems.length === 0)
        return this.sendError(res, 404, "Wishlist is empty");
    }

    for (const item of wishlistItems) {
      const existing = await CartItemRepository.findByCartAndProduct(
        cartId,
        item.product_id
      );

      if (existing) {
        await CartItemRepository.update(existing.id, {
          quantity: existing.quantity + item.quantity,
        });
      } else {
        await CartItemRepository.create({
          cart_id: cartId,
          product_id: item.product_id,
          price: item.price,
          quantity: item.quantity,
        });
      }
    }

    if (Array.isArray(selectedItems) && selectedItems.length > 0) {
      // Delete only selected
      await WishListItemRepository.deleteMany(selectedItems);
    } else {
      // Delete whole list
      await WishListItemRepository.rawQuery(
        "DELETE FROM wishlist_items WHERE wishlist_id = $1",
        [wishListId]
      );
    }

    return res.status(200).json({
      message: "Items moved to cart successfully",
      moved: wishlistItems.length,
      bulk: Array.isArray(selectedItems) && selectedItems.length > 0,
    });

    } catch (error) {
      console.error(error);
      return this.sendError(res, 500, error.message);
    }
  }


  async clearWishList(req, res) {
    try {
      const { wishListId } = req.params;

      if (!wishListId) return this.sendError(res, 400, "Missing wishlist ID");

      const result = await WishListItemRepository.clearWishList(wishListId);

      return res.status(200).json({
        message: "Wishlist cleared successfully",
        result,
      });

    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  async deleteWishListItem(req, res) {
    try {
      const { id } = req.params;

      if (!id) return this.sendError(res, 400, "Missing wishlist item ID");

      const result = await WishListItemRepository.delete(id);

      return res.status(200).json({
        message: "Wishlist item deleted",
        result,
      });

    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }
}

module.exports = new WishListItemController();
