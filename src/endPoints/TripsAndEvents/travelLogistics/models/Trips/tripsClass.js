class Trip {
  constructor(
    id,
    title,
    slug,
    description,
    region,
    duration_days,
    start_date,
    end_date,
    max_participants,
    available_slots,
    cover_image,
    gallery,
    status
  ) {
    this.id = id
    this.title = title
    this.slug = slug
    this.description = description
    this.region = region
    this.duration_days = duration_days
    this.start_date = start_date
    this.end_date = end_date
    this.max_participants = max_participants
    this.available_slots = available_slots
    this.cover_image = cover_image
    this.gallery = gallery
    this.status = status
  }
}

module.exports = Trip
