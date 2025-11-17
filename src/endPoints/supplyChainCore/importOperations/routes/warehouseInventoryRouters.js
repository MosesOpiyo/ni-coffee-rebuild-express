const express = require('express');
const WarehouseInventoryController = require('../controllers/warehouseInventoryController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const ROLES = require('../../../auth/middleware/roles');

const warehouseInventoryRouter = express.Router();

warehouseInventoryRouter.get('/',limiter, verifyToken, verifyRole([ROLES.WAREHOUSE_MANAGER, ROLES.ADMIN]), WarehouseInventoryController.getAllInventoryItems);
warehouseInventoryRouter.get('/:id',limiter, verifyToken, verifyRole([ROLES.WAREHOUSE_MANAGER, ROLES.ADMIN]), WarehouseInventoryController.getInventoryItemById);
warehouseInventoryRouter.post('/new-item',limiter, verifyToken, verifyRole([ROLES.WAREHOUSE_MANAGER]), WarehouseInventoryController.createInventoryItem);
warehouseInventoryRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.WAREHOUSE_MANAGER]), WarehouseInventoryController.updateInventoryItem);
warehouseInventoryRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), WarehouseInventoryController.deleteInventoryItem);

module.exports = warehouseInventoryRouter;