const express = require('express');
const RouterController = require('../controllers/reviewController')
const limiter = require('../../../../middleware/rateLimitingMiddleware')
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');

const ROLES = require('../../../auth/middleware/roles');
const reviewController = require('../controllers/reviewController');

const ReviewRouter = express.Router();

ReviewRouter.get('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), RouterController.getAllReviews);
ReviewRouter.get('/:productId', limiter, verifyToken, verifyRole([ROLES.ADMIN]), RouterController.getReviewByProductId)
ReviewRouter.post('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), RouterController.createReview)
ReviewRouter.put('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), RouterController.updateReview)
ReviewRouter.delete('/', limiter, verifyToken, verifyRole([ROLES.ADMIN]), reviewController.deleteReview)

module.exports = ReviewRouter