const express = require('express');
const BatchController = require('../controllers/batchController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const batchRouter = express.Router();
const ROLES = require('../../../auth/middleware/roles');

batchRouter.get('/',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.COOPERATIVE_MANAGER, ROLES.EXPORTER]), BatchController.getAllBatches);
batchRouter.get('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.COOPERATIVE_MANAGER, ROLES.EXPORTER]), BatchController.getBatchById);
batchRouter.post('/new-batch',limiter, verifyToken, verifyRole([ROLES.COOPERATIVE_MANAGER]), BatchController.createBatch);
batchRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.COOPERATIVE_MANAGER]), BatchController.updateBatch);
batchRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), BatchController.deleteBatch);

module.exports = batchRouter;



