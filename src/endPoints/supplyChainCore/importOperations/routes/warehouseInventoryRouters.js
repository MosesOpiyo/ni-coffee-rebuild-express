const express = require('express');
const WarehouseInventoryController = require('../controllers/warehouseInventoryController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');

const ROLES = require('../../../auth/middleware/roles');

const warehouseInventoryRouter = express.Router();

warehouseInventoryRouter.get('/', verifyToken, verifyRole([ROLES.WAREHOUSE_MANAGER, ROLES.ADMIN]), WarehouseInventoryController.getAllInventoryItems);
warehouseInventoryRouter.get('/:id', verifyToken, verifyRole([ROLES.WAREHOUSE_MANAGER, ROLES.ADMIN]), WarehouseInventoryController.getInventoryItemById);
warehouseInventoryRouter.post('/new-item', verifyToken, verifyRole([ROLES.WAREHOUSE_MANAGER]), WarehouseInventoryController.createInventoryItem);
warehouseInventoryRouter.put('/:id', verifyToken, verifyRole([ROLES.WAREHOUSE_MANAGER]), WarehouseInventoryController.updateInventoryItem);
warehouseInventoryRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), WarehouseInventoryController.deleteInventoryItem);

module.exports = warehouseInventoryRouter;