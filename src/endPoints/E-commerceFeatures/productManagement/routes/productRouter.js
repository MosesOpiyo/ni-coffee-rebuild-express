const express = require('express');
const ProductController = require('../controllers/productController')
const { verifyToken, verifyRole } = require('../../../../middleware/authMiddleware')

const productRouter = express.Router();
const ROLES = require('../../../auth/middleware/roles');

productRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN]), ProductController.getAllProducts)
productRouter.get('/:id', verifyToken, verifyRole([ROLES.ADMIN]), ProductController.getProductById)
productRouter.post('/new-product',verifyToken, verifyRole([ROLES.ADMIN]), ProductController.createProduct)
productRouter.put('/', verifyToken, verifyRole([ROLES.ADMIN]), ProductController.updateProduct)
productRouter.delete('/', verifyToken, verifyRole([ROLES.ADMIN]), ProductController.deleteProduct )

module.exports = productRouter