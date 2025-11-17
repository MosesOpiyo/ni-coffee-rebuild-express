const express = require('express');
const OverlandTravelController = require('../controllers/overLandTravelController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const overlandTravelRouter = express.Router();

overlandTravelRouter.get('/',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), OverlandTravelController.getAllTravel);
overlandTravelRouter.get('/trip/:trip_id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), OverlandTravelController.getTravelByTrip);
overlandTravelRouter.post('/new-travel',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), OverlandTravelController.createTravel);
overlandTravelRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), OverlandTravelController.updateTravel);
overlandTravelRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), OverlandTravelController.deleteTravel);

module.exports = overlandTravelRouter;
