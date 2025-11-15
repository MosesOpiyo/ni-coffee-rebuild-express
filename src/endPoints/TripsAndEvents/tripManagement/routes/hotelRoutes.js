const express = require('express');
const HotelController = require('../controllers/hotelController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');

const hotelRouter = express.Router();

hotelRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), HotelController.getAllHotels);
hotelRouter.get('/trip/:trip_id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), HotelController.getHotelsByTrip);
hotelRouter.post('/new-hotel', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), HotelController.createHotel);
hotelRouter.put('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), HotelController.updateHotel);
hotelRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), HotelController.deleteHotel);

module.exports = hotelRouter;
