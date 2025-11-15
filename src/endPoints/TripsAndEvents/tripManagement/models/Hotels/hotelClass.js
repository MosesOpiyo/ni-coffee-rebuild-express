class Hotel {
  constructor(
    id,
    trip_id,
    hotel_name,
    location,
    check_in_day,
    check_out_day,
    rating,
    contact_info,
    notes
  ) {
    this.id = id
    this.trip_id = trip_id
    this.hotel_name = hotel_name
    this.location = location
    this.check_in_day = check_in_day
    this.check_out_day = check_out_day
    this.rating = rating
    this.contact_info = contact_info
    this.notes = notes
  }
}

module.exports = Hotel
