const express = require('express');
const PriceController = require('../controllers/priceController')
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const { verifyToken, verifyRole } = require('../../../../middleware/authMiddleware')

const priceRouter = express.Router();
const ROLES = require('../../../auth/middleware/roles');

priceRouter.get('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), PriceController.getAllPrices)
priceRouter.get('/:id', limiter, verifyToken, verifyRole([ROLES.ADMIN]), PriceController.getPriceById)
priceRouter.post('/new-price', limiter,verifyToken, verifyRole([ROLES.ADMIN]), PriceController.createPrice)
priceRouter.put('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), PriceController.updatePrice)
priceRouter.delete('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), PriceController.deletePrice)

module.exports = priceRouter;