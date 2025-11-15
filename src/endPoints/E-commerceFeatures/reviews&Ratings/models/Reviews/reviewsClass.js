class Review {
    constructor (
        id,
        product_id,
        buyer_id,
        rating,
        review_text,
        created_at
    ) {
        this.id = id,
        this.product_id = product_id,
        this.buyer_id = buyer_id,
        this.rating = rating, 
        this.review_text = review_text,
        this.created_at = created_at
    }
}

module.exports = Review