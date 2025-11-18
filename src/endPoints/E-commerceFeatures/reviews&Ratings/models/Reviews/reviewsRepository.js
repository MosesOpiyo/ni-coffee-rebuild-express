const e = require('cors');
const BaseRepository = require('../../../../../config/baseRepository/baseRepository');
const ReviewModel = require('../Reviews/reviewsModel')

class ReviewRepository extends BaseRepository{
    constructor() {
        super('reviews', ReviewModel);
    }
}

module.exports = new ReviewRepository();