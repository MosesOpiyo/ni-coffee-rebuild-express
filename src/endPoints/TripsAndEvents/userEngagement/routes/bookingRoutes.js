const express = require('express');
const BookingController = require('../controllers/bookingController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');

const bookingRouter = express.Router();

bookingRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), BookingController.getAllBookings);
bookingRouter.get('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), BookingController.getBookingById);
bookingRouter.post('/new-booking', verifyToken, verifyRole([ROLES.USER, ROLES.MANAGER, ROLES.ADMIN]), BookingController.createBooking);
bookingRouter.put('/:id', verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), BookingController.updateBooking);
bookingRouter.delete('/:id', verifyToken, verifyRole([ROLES.ADMIN]), BookingController.deleteBooking);

module.exports = bookingRouter;
