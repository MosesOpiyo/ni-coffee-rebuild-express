const express = require('express');
const RouterController = require('../controllers/reviewController')
const { verifyToken, verifyRole } = require('../../../auth/middleware/middleware');

const ROLES = require('../../../auth/middleware/roles');
const reviewController = require('../controllers/reviewController');

const ReviewRouter = express.Router();

ReviewRouter.get('/', verifyToken, verifyRole([ROLES.ADMIN]), RouterController.getAllReviews);
ReviewRouter.get('/:productId', verifyToken, verifyRole([ROLES.ADMIN]), RouterController.getReviewByProductId)
ReviewRouter.post('/', verifyToken, verifyRole([ROLES.ADMIN]), RouterController.createReview)
ReviewRouter.put('/', verifyToken, verifyRole([ROLES.ADMIN]), RouterController.updateReview)
ReviewRouter.delete('/', verifyToken, verifyRole([ROLES.ADMIN]), reviewController.deleteReview)

module.exports = ReviewRouter