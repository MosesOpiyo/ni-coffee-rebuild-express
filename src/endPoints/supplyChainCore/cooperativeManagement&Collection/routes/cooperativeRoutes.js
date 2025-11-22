const express = require('express');
const CooperativeController = require('../controllers/cooperativeController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const ROLES = require('../../../auth/middleware/roles');

const cooperativeRouter = express.Router();

cooperativeRouter.get('/',limiter, verifyToken, verifyRole([ROLES.ADMIN]), CooperativeController.getAllCooperatives);
cooperativeRouter.get('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.COOPERATIVE_MANAGER]), CooperativeController.getCooperativeById);
cooperativeRouter.post('/new-cooperative',limiter, verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN]), CooperativeController.createCooperative);
cooperativeRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.COOPERATIVE_MANAGER]), CooperativeController.updateCooperative);
cooperativeRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), CooperativeController.deleteCooperative);

module.exports = cooperativeRouter;