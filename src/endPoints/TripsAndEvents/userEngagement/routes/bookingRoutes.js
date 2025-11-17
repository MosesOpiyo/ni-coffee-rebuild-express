const express = require('express');
const BookingController = require('../controllers/bookingController');
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');
const ROLES = require('../../../auth/middleware/roles');
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const bookingRouter = express.Router();

bookingRouter.get('/',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), BookingController.getAllBookings);
bookingRouter.get('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]), BookingController.getBookingById);
bookingRouter.post('/new-booking',limiter, verifyToken, verifyRole([ROLES.USER, ROLES.MANAGER, ROLES.ADMIN]), BookingController.createBooking);
bookingRouter.put('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN, ROLES.MANAGER]), BookingController.updateBooking);
bookingRouter.delete('/:id',limiter, verifyToken, verifyRole([ROLES.ADMIN]), BookingController.deleteBooking);

module.exports = bookingRouter;
