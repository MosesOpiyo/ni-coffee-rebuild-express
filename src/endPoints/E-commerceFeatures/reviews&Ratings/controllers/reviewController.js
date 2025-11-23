const ReviewRepository = require('../models/Reviews/reviewsRepository')

class ReviewController {
    async getReviewsByProductId (req, res) {
        try {
            const { id } = req.params;
            const reviews = await ReviewRepository.findMany('product_id', id);
            if (!reviews) {
                return res.status(404).json({ error: 'Batch not found' });
            }
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createReview (req, res){
        try {
            const reviewData = req.body;
            const review = await ReviewRepository.create(reviewData);
            res.status(201).json(review);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateReview (req, res){
        try {
            const { id } = req.params;
            const reviewData = req.body;
            const review = await ReviewRepository.update(id, reviewData);
            if (!review) {
                return res.status(404).json({ error: 'Review not found' });
            }else {
                res.status(200).json(review);
            };} catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async deleteReview (req, res){
        try {
            const { id } = req.params;
            const result = await ReviewRepository.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ReviewController();