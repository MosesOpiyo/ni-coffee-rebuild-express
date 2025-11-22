const express = require('express');
const ProductController = require('../controllers/productController')
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const { verifyToken, verifyRole } = require('../../../../middleware/authMiddleware')

const productRouter = express.Router();
const ROLES = require('../../../auth/middleware/roles');

productRouter.get('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), ProductController.getAllProducts)
productRouter.get('/:id', limiter, verifyToken, verifyRole([ROLES.ADMIN]), ProductController.getProductById)
productRouter.post('/new-product', limiter,verifyToken, verifyRole([ROLES.ADMIN]), ProductController.createProduct)
productRouter.put('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), ProductController.updateProduct)
productRouter.delete('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), ProductController.deleteProduct )

module.exports = productRouter