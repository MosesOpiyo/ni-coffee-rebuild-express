const BaseModel = require('../../../../../config/basemodel/baseModel')

class TripModel extends BaseModel{
  constructor(data={}){
    super('trips', [
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
    "status TEXT DEFAULT 'upcoming'"
  ])
  Object.assign(this, data)
  }

  toJSON(){
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      region: this.region,
      duration_days: this.duration_days,
      start_date: this.start_date,
      end_date: this.end_date,
      max_participants: this.max_participants,
      available_slots: this.available_slots,
      cover_image: this.cover_image,
      gallery: this.gallery,
      status: this.status
    }
  }
}

module.exports = TripModel