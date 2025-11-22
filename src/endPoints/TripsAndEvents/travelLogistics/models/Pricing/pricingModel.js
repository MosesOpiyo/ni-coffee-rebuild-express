const BaseModel = require('../../../../../config/basemodel/baseModel')

class PricingModel extends BaseModel{
  constructor(data={}){
    super('pricing', [
      'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
      'trip_id UUID REFERENCES trips(id) ON DELETE CASCADE',
      'tier_name TEXT NOT NULL',
      'price_usd FLOAT NOT NULL',
      'currency TEXT DEFAULT \'USD\'',
      'includes JSONB',
      'excludes JSONB',
      'is_active BOOLEAN DEFAULT TRUE',
    ])
    Object.assign(this, data)
  }

  toJSON(){
    return{
      id: this.id,
      trip_id: this.trip_id,
      tier_name: this.tier_name,
      price_usd: this.price_usd,
      currency: this.currency,
      includes: this.includes,
      excludes: this.excludes,
      is_active: this.is_active
    }
  }
}

module.exports = PricingModel