const BaseModel = require('../../../../../config/basemodel/baseModel')

const TripModel = new BaseModel('trips', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'title TEXT NOT NULL',
  'slug TEXT UNIQUE NOT NULL',
  'description TEXT',
  'region TEXT',
  'duration_days INT NOT NULL',
  'start_date DATE NOT NULL',
  'end_date DATE NOT NULL',
  'max_participants INT DEFAULT 20',
  'available_slots INT DEFAULT 20',
  'cover_image TEXT',
  'gallery JSONB',
  "status TEXT DEFAULT 'upcoming'",
  'created_at TIMESTAMP DEFAULT NOW()'
])

module.exports = TripModel