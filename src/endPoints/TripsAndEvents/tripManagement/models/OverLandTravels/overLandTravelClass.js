class OverlandTravel {
  constructor(
    id,
    trip_id,
    day_number,
    route,
    vehicle_type,
    departure_time,
    arrival_time,
    driver_name,
    notes
  ) {
    this.id = id
    this.trip_id = trip_id
    this.day_number = day_number
    this.route = route
    this.vehicle_type = vehicle_type
    this.departure_time = departure_time
    this.arrival_time = arrival_time
    this.driver_name = driver_name
    this.notes = notes
  }
}

module.exports = OverlandTravel
