const BaseModel = require('../../../../../config/basemodel/baseModel')


const BookingModel = new BaseModel('bookings', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'trip_id UUID REFERENCES trips(id) ON DELETE CASCADE',
  'user_id UUID REFERENCES users(id) ON DELETE SET NULL',
  'pricing_id UUID REFERENCES pricing(id) ON DELETE SET NULL',
  'num_guests INT DEFAULT 1',
  'total_amount FLOAT NOT NULL',
  "payment_status TEXT DEFAULT 'pending'",
  "booking_status TEXT DEFAULT 'reserved'",
  'special_requests TEXT',
  'created_at TIMESTAMP DEFAULT NOW()'
])


module.exports = BookingModel