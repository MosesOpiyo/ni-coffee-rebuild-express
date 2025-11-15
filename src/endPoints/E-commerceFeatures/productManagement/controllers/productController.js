const ProductRepository = require('../models/productRepository');

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await ProductRepository.getAllProducts();
            if (!products) {
                return res.status(404).json({ error: 'No products found' });
            } else {
                res.status(200).json(products);
            }       } catch (error) {
            res.status(500).json({ error: error.message });
        }};

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductRepository.getProductById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }};

    async createProduct(req, res) {
        try {
            const productData = req.body;
            const product = await ProductRepository.createProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const product = await ProductRepository.updateProduct(id, productData);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            } else {
                res.status(200).json(product);
            };
        } catch (error) {
            res.status(500).json({ error: error.message });
        }};

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductRepository.deleteProduct(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new ProductController();