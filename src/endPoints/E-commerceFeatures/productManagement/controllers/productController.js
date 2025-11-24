const ProductRepository = require('../models/productRepository');


class ProductController {
    sendError(res, code, message) {
    return res.status(code).json({ error: message });
  }

  // ---------------------------
  // Get all products
  // ---------------------------
  async getAllProducts(req, res) {
    try {
      const products = await ProductRepository.findAll();
      if (!products || products.length === 0)
        return this.sendError(res, 404, 'No products found');

      return res.status(200).json(products);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Get single product by ID
  // ---------------------------
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      if (!id) return this.sendError(res, 400, 'Product ID is required');

      const product = await ProductRepository.findById(id);
      if (!product) return this.sendError(res, 404, 'Product not found');

      return res.status(200).json(product);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Search products by name
  // ---------------------------
  async searchProducts(req, res) {
    try {
      const { query } = req.query;
      if (!query) return this.sendError(res, 400, 'Search query is required');

      // Use parameterized query to prevent SQL injection
      const products = await ProductRepository.rawQuery(
        'SELECT * FROM products WHERE name ILIKE $1',
        [`%${query}%`]
      );

      if (!products || products.length === 0)
        return this.sendError(res, 404, 'No products found');

      return res.status(200).json(products);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Create new product
  // ---------------------------
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const product = await ProductRepository.create(productData);
      return res.status(201).json(product);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Update product
  // ---------------------------
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) return this.sendError(res, 400, 'Product ID is required');

      const productData = req.body;
      const updated = await ProductRepository.update(id, productData);

      if (!updated) return this.sendError(res, 404, 'Product not found');

      return res.status(200).json(updated);
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }

  // ---------------------------
  // Delete product
  // ---------------------------
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) return this.sendError(res, 400, 'Product ID is required');

      const deleted = await ProductRepository.delete(id);

      if (!deleted) return this.sendError(res, 404, 'Product not found');

      return res.status(200).json({
        message: 'Product deleted successfully',
        product: deleted
      });
    } catch (error) {
      return this.sendError(res, 500, error.message);
    }
  }
}

module.exports = new ProductController();

