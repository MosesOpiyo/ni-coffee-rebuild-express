const BaseModel = require('../../../../../config/basemodel/baseModel')


class ReviewModel extends BaseModel{
   constructor(data = {}){
      super('reviews', [
         'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
         'product_id UUID REFERENCES products(id) ON DELETE SET NULL',
         'buyer_id UUID REFERENCES users(id) on DELETE SET NULL',
         'rating FLOAT NOT NULL',
         'review_text TEXT NOT NULL',
      ]);
      Object.assign(this, data);
   }

   toJSON(){
      return{
         id: this.id,
         product_id: this.product_id,
         buyer_id: this.buyer_id,
         rating: this.rating,
         review_text: this.review_text
      }
   }        
}

module.exports = ReviewModel