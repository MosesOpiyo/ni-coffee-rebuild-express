const express = require('express');
const ContractController = require('../controllers/contractController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const ROLES = require('../../../auth/middleware/roles');
const contractRouter = express.Router();

contractRouter.get('/',limiter, verifyToken, verifyRole([ROLES.SUPPLIER, ROLES.ADMIN]), ContractController.getAllContracts)
contractRouter.get('/:id',limiter, verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER, ROLES.ADMIN]), ContractController.getContractById);
contractRouter.post('/new-contract',limiter, verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER]), ContractController.createContract);
contractRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER]), ContractController.updateContract);
contractRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), ContractController.deleteContract);

module.exports = contractRouter;