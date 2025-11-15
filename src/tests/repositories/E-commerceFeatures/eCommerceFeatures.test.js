const crypto = require('crypto');

const UserModel = require('../../../endPoints/auth/models/User/authModels');
const ProductModel = require('../../../endPoints/E-commerceFeatures/productManagement/models/productModel');
const ReviewModel = require('../../../endPoints/E-commerceFeatures/reviews&Ratings/models/Reviews/reviewsModel');
const CartModel = require('../../../endPoints/E-commerceFeatures/shoppingExperience/models/Cart/cartModel');
const CartItemModel = require('../../../endPoints/E-commerceFeatures/shoppingExperience/models/CartItems/cartItemModel');
const WishListModel = require('../../../endPoints/E-commerceFeatures/shoppingExperience/models/Wishlist/wishListModel');
const WishListItemModel = require('../../../endPoints/E-commerceFeatures/shoppingExperience/models/WishlistItems/wishListItemModel');
const OrderModel = require('../../../endPoints/E-commerceFeatures/shoppingExperience/models/Orders/ordersModel');
const PaymentModel = require('../../../endPoints/E-commerceFeatures/shoppingExperience/models/Payments/paymentModel');

const { initDb, create, findAll, findById, update, remove } = require('../../base/baseTest');

beforeAll(async () => {
    const tablesSql = [
        UserModel.getCreateTableQuery(),
        ProductModel.getCreateTableQuery(),
        ReviewModel.getCreateTableQuery(),
        CartModel.getCreateTableQuery(),
        CartItemModel.getCreateTableQuery(),
        WishListModel.getCreateTableQuery(),
        WishListItemModel.getCreateTableQuery(),
        OrderModel.getCreateTableQuery(),
        PaymentModel.getCreateTableQuery(),
    ]
    .map(sql => sql.trim().replace(/};?$/, ';'))
    .join('\n');
  await initDb(tablesSql);
});

describe('🛒 E-commerce Operations', () => {
  let userId, productId, orderId, paymentId, reviewId, cartId, cartItemId, wishlistId, wishlistItemId;

  test('should create a user', async () => {
    const user = await create('users', { full_name: 'John Doe', email: 'john@example.com' });
    userId = user.id;
    expect(user).toHaveProperty('id');
  });

  test('should create a product', async () => {
    const product = await create('products', {
      name: 'MacBook Pro 16"',
      description: 'High performance laptop',
      price_per_kg: 2500.99,
      stock: 10,
    });
    productId = product.id;
    expect(product.name).toBe('MacBook Pro 16"');
  });

  test('should create an order', async () => {
    const order = await create('orders', { buyer_id: userId, full_price: 2500.99 , quantity: 4});
    orderId = order.id;
    expect(order.status).toBe('pending');
  });

  test('should create a payment for order', async () => {
    const payment = await create('payments', {
      order_id: orderId,
      amount: 2500.99,
      currency: 'USD',
      payment_method: 'credit_card',
      status: 'paid'
    });
    paymentId = payment.id;
    expect(payment.status).toBe('paid');
  });

  test('should create a review for product', async () => {
    const review = await create('reviews', {
      buyer_id: userId,
      product_id: productId,
      rating: 5,
      review_text: 'Excellent product!'
    });
    reviewId = review.id;
    expect(review.rating).toBe(5);
  });

  test('should create a cart and add an item', async () => {
    const cart = await create('carts', { user_id: userId });
    cartId = cart.id;

    const cartItem = await create('cart_items', {
      cart_id: cart.id,
      product_id: productId,
      quantity: 2,
      price: 2500.99
    });
    cartItemId = cartItem.id;

    expect(cartItem.quantity).toBe(2);
  });

  test('should update cart item quantity', async () => {
    const updated = await update('cart_items', cartItemId, { quantity: 3 });
    expect(updated.quantity).toBe(3);
  });

  test('should create wishlist and add an item', async () => {
    const wishlist = await create('wishlists', { user_id: userId });
    wishlistId = wishlist.id;

    const wishlistItem = await create('wishlist_items', {
      wishlist_id: wishlist.id,
      product_id: productId,
      price: 2500.99,
      quantity: 4
    });
    wishlistItemId = wishlistItem.id;

    expect(wishlistItem.wishlist_id).toBe(wishlist.id);
  });

  test('should fetch all orders', async () => {
    const orders = await findAll('orders');
    expect(orders.length).toBeGreaterThan(0);
  });

  test('should find order by id', async () => {
    const found = await findById('orders', orderId);
    expect(found.id).toBe(orderId);
  });

  test('should delete wishlist item', async () => {
    const deleted = await remove('wishlist_items', wishlistItemId);
    expect(deleted.id).toBe(wishlistItemId);
  });
});
