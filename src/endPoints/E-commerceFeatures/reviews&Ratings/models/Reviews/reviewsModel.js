const BaseModel = require('../../../../../config/basemodel/baseModel')


const ReviewModel = new BaseModel('reviews', [
   'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
   'product_id UUID REFERENCES products(id) ON DELETE SET NULL',
   'buyer_id UUID REFERENCES users(id) on DELETE SET NULL',
   'rating FLOAT NOT NULL',
   'review_text TEXT NOT NULL',
   'created_at TIMESTAMP DEFAULT NOW()'
])

module.exports = ReviewModel