const BaseModel = require('../../../../../config/basemodel/baseModel')


class BookingModel extends BaseModel{
  constructor(data={}){
    super('bookings', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'trip_id UUID REFERENCES trips(id) ON DELETE CASCADE',
    'user_id UUID REFERENCES users(id) ON DELETE SET NULL',
    'pricing_id UUID REFERENCES pricing(id) ON DELETE SET NULL',
    'num_guests INT DEFAULT 1',
    'total_amount FLOAT NOT NULL',
    "payment_status TEXT DEFAULT 'pending'",
    "booking_status TEXT DEFAULT 'reserved'",
    'special_requests TEXT'
  ])
  Object.assign(this, data)
  }

  toJSON(){
    return {
      id: this.id,
      trip_id: this.trip_id,
      user_id: this.user_id,
      pricing_id: this.pricing_id,
      num_guests: this.num_guests,
      total_amount: this.total_amount,
      payment_status: this.payment_status,
      booking_status: this.booking_status,
      special_requests: this.special_requests
    }
  }
}


module.exports = BookingModel