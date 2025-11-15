const BaseModel = require('../../../../../config/basemodel/baseModel')

const OverlandTravelModel = new BaseModel('overland_travel', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'trip_id UUID REFERENCES trips(id) ON DELETE CASCADE',
  'day_number INT NOT NULL',
  'route TEXT NOT NULL',
  'vehicle_type TEXT',
  'departure_time TIME',
  'arrival_time TIME',
  'driver_name TEXT',
  'notes TEXT',
  'created_at TIMESTAMP DEFAULT NOW()'
])

module.exports = OverlandTravelModel