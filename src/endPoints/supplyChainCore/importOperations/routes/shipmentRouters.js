const express = require('express');
const shipmentController = require('../controllers/shipmentController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const ROLES = require('../../../auth/middleware/roles');

const shipmentRouter = express.Router();

shipmentRouter.get('/',limiter, verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER, ROLES.ADMIN]), shipmentController.getAllShipments);
shipmentRouter.get('/export/:exportId',limiter, verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER, ROLES.ADMIN]), shipmentController.getShipmentByExportId);
shipmentRouter.get('/:id',limiter, verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER, ROLES.ADMIN]), shipmentController.getShipmentById);
shipmentRouter.post('/new-shipment',limiter, verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER]), shipmentController.createShipment);
shipmentRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER]), shipmentController.updateShipment);
shipmentRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), shipmentController.deleteShipment);

module.exports = shipmentRouter;