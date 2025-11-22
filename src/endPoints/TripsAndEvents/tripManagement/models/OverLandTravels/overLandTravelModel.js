const BaseModel = require('../../../../../config/basemodel/baseModel')

class OverlandTravelModel extends BaseModel{
  constructor(data={}){
    super('overland_travel', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'trip_id UUID REFERENCES trips(id) ON DELETE CASCADE',
    'day_number INT NOT NULL',
    'route TEXT NOT NULL',
    'vehicle_type TEXT',
    'departure_time TIME',
    'arrival_time TIME',
    'driver_name TEXT',
    'notes TEXT'
  ])
  Object.assign(this, data)
  }

  toJSON(){
    return {
      id: this.id,
      trip_id: this.trip_id,
      day_number: this.day_number,
      route: this.route,
      vehicle_type: this.vehicle_type,
      departure_time: this.departure_time,
      arrival_time: this.arrival_time,
      driver_name: this.driver_name,
      notes: this.notes
    }
  }
}

module.exports = OverlandTravelModel