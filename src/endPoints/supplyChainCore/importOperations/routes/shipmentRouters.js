const express = require('express');
const shipmentController = require('../controllers/shipmentController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');

const ROLES = require('../../../auth/middleware/roles');

const shipmentRouter = express.Router();

shipmentRouter.get('/', verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER, ROLES.ADMIN]), shipmentController.getAllShipments);
shipmentRouter.get('/export/:exportId', verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER, ROLES.ADMIN]), shipmentController.getShipmentByExportId);
shipmentRouter.get('/:id', verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER, ROLES.ADMIN]), shipmentController.getShipmentById);
shipmentRouter.post('/new-shipment', verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER]), shipmentController.createShipment);
shipmentRouter.put('/:id', verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER]), shipmentController.updateShipment);
shipmentRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), shipmentController.deleteShipment);

module.exports = shipmentRouter;