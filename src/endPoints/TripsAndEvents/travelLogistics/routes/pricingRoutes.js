const express = require('express');
const PricingController = require('../controllers/pricingController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');

const pricingRouter = express.Router();

pricingRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), PricingController.getAllPricing);
pricingRouter.post('/new-pricing', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), PricingController.createPricing);
pricingRouter.put('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), PricingController.updatePricing);
pricingRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), PricingController.deletePricing);

module.exports = pricingRouter;
