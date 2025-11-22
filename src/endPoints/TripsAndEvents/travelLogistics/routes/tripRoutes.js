const express = require('express');
const TripController = require('../controllers/tripsController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');
const { limiter } = require('../../../../middleware/rateLimitingMiddleware')
const tripRouter = express.Router();


tripRouter.get('/',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), TripController.getAllTrips);
tripRouter.get('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), TripController.getTripById);
tripRouter.post('/new-trip',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), TripController.createTrip);
tripRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), TripController.updateTrip);
tripRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), TripController.deleteTrip);

module.exports = tripRouter;
