const express = require('express');
const OverlandTravelController = require('../controllers/overLandTravelController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');

const overlandTravelRouter = express.Router();

overlandTravelRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), OverlandTravelController.getAllTravel);
overlandTravelRouter.get('/trip/:trip_id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), OverlandTravelController.getTravelByTrip);
overlandTravelRouter.post('/new-travel', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), OverlandTravelController.createTravel);
overlandTravelRouter.put('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), OverlandTravelController.updateTravel);
overlandTravelRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), OverlandTravelController.deleteTravel);

module.exports = overlandTravelRouter;
