const express = require('express');
const CooperativeController = require('../controllers/cooperativeController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');

const ROLES = require('../../../auth/middleware/roles');

const cooperativeRouter = express.Router();

cooperativeRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN]), CooperativeController.getAllCooperatives);
cooperativeRouter.get('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.COOPERATIVE_MANAGER]), CooperativeController.getCooperativeById);
cooperativeRouter.post('/new-cooperative', verifyToken, verifyRole([ROLES.FARMER, ROLES.ADMIN]), CooperativeController.createCooperative);
cooperativeRouter.put('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.COOPERATIVE_MANAGER]), CooperativeController.updateCooperative);
cooperativeRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), CooperativeController.deleteCooperative);

module.exports = cooperativeRouter;