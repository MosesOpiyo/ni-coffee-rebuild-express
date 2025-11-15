const express = require('express');
const PriceController = require('../controllers/priceController')
const { verifyToken, verifyRole } = require('../../../../middleware/authMiddleware')

const priceRouter = express.Router();
const ROLES = require('../../../auth/middleware/roles');

priceRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN]), PriceController.getAllPrices)
priceRouter.get('/:id', verifyToken, verifyRole([ROLES.ADMIN]), PriceController.getPriceById)
priceRouter.post('/new-price',verifyToken, verifyRole([ROLES.ADMIN]), PriceController.createPrice)
priceRouter.put('/', verifyToken, verifyRole([ROLES.ADMIN]), PriceController.updatePrice)
priceRouter.delete('/', verifyToken, verifyRole([ROLES.ADMIN]), PriceController.deletePrice)

module.exports = priceRouter;