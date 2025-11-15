const express = require('express');
const TripController = require('../controllers/tripsController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');

const tripRouter = express.Router();


tripRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), TripController.getAllTrips);
tripRouter.get('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), TripController.getTripById);
tripRouter.post('/new-trip', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), TripController.createTrip);
tripRouter.put('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), TripController.updateTrip);
tripRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), TripController.deleteTrip);

module.exports = tripRouter;
