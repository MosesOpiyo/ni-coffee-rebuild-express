const express = require('express');
const ContractController = require('../controllers/contractController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');

const ROLES = require('../../../auth/middleware/roles');
const contractRouter = express.Router();

contractRouter.get('/', verifyToken, verifyRole([ROLES.SUPPLIER, ROLES.ADMIN]), ContractController.getAllContracts)
contractRouter.get('/:id', verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER, ROLES.ADMIN]), ContractController.getContractById);
contractRouter.post('/new-contract', verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER]), ContractController.createContract);
contractRouter.put('/:id', verifyToken, verifyRole([ROLES.LOGISTICS_MANAGER]), ContractController.updateContract);
contractRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), ContractController.deleteContract);

module.exports = contractRouter;