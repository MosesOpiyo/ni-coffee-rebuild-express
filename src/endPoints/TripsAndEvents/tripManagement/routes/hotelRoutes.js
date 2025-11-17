const express = require('express');
const HotelController = require('../controllers/hotelController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const hotelRouter = express.Router();

hotelRouter.get('/',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), HotelController.getAllHotels);
hotelRouter.get('/trip/:trip_id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), HotelController.getHotelsByTrip);
hotelRouter.post('/new-hotel',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), HotelController.createHotel);
hotelRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), HotelController.updateHotel);
hotelRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), HotelController.deleteHotel);

module.exports = hotelRouter;
