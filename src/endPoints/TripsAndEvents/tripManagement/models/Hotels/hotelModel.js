const BaseModel = require('../../../../../config/basemodel/baseModel')

class HotelModel extends BaseModel{
  constructor(data={}){
    super('hotels', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'trip_id UUID REFERENCES trips(id) ON DELETE CASCADE',
    'hotel_name TEXT NOT NULL',
    'location TEXT',
    'check_in_day INT',
    'check_out_day INT',
    'rating FLOAT',
    'contact_info JSONB',
    'notes TEXT'
  ])
  Object.assign(this, data)
  }

  toJSON(){
    return{
      id: this.id,
      trip_id: this.trip_id,
      hotel_name: this.hotel_name,
      location: this.location,
      check_in_day: this.check_in_day,
      check_out_day: this.check_out_day,
      rating: this.rating,
      contact_info: this.contact_info,
      notes: this.notes
    }
  }
}

module.exports = HotelModel