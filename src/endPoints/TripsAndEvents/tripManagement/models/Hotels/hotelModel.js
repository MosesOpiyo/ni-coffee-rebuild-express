const BaseModel = require('../../../../../config/basemodel/baseModel')

const HotelModel = new BaseModel('hotels', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'trip_id UUID REFERENCES trips(id) ON DELETE CASCADE',
  'hotel_name TEXT NOT NULL',
  'location TEXT',
  'check_in_day INT',
  'check_out_day INT',
  'rating FLOAT',
  'contact_info JSONB',
  'notes TEXT',
  'created_at TIMESTAMP DEFAULT NOW()'
])

module.exports = HotelModel