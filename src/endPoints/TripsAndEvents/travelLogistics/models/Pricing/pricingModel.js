const BaseModel = require('../../../../../config/basemodel/baseModel')

const PricingModel = new BaseModel('pricing', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'trip_id UUID REFERENCES trips(id) ON DELETE CASCADE',
  'tier_name TEXT NOT NULL',
  'price_usd FLOAT NOT NULL',
  'currency TEXT DEFAULT \'USD\'',
  'includes JSONB',
  'excludes JSONB',
  'is_active BOOLEAN DEFAULT TRUE',
  'created_at TIMESTAMP DEFAULT NOW()'
])

module.exports = PricingModel