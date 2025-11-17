const express = require('express');
const PricingController = require('../controllers/pricingController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const pricingRouter = express.Router();

pricingRouter.get('/',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), PricingController.getAllPricing);
pricingRouter.post('/new-pricing',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), PricingController.createPricing);
pricingRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), PricingController.updatePricing);
pricingRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), PricingController.deletePricing);

module.exports = pricingRouter;
