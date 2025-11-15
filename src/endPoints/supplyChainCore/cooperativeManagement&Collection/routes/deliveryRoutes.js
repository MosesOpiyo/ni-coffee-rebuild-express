const express = require('express');
const DeliveryController = require('../controllers/deliveryController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');

const ROLES = require('../../../auth/middleware/roles');

const deliveryRouter = express.Router();

deliveryRouter.get('/', verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN, ROLES.LOGISTICS_MANAGER]), DeliveryController.getAllDeliveries);
deliveryRouter.get('/cooperative/:cooperativeId', verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN, ROLES.LOGISTICS_MANAGER]), DeliveryController.getDeliveriesByCooperativeId);
deliveryRouter.get('/:id', verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN, ROLES.LOGISTICS_MANAGER]), DeliveryController.getDeliveryById);
deliveryRouter.post('/new-delivery', verifyToken, verifyRole([ROLES.FARMER, ROLES.LOGISTICS_MANAGER]), DeliveryController.createDelivery);
deliveryRouter.put('/:id', verifyToken, verifyRole([ROLES.FARMER, ROLES.LOGISTICS_MANAGER]), DeliveryController.updateDelivery);
deliveryRouter.delete('/:id', verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN]), DeliveryController.deleteDelivery);

module.exports = deliveryRouter;