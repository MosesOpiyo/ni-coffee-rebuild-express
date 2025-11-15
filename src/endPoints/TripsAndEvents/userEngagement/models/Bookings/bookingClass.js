class Booking {
  constructor(
    id,
    trip_id,
    user_id,
    pricing_id,
    num_guests,
    total_amount,
    payment_status,
    booking_status,
    special_requests
  ) {
    this.id = id
    this.trip_id = trip_id
    this.user_id = user_id
    this.pricing_id = pricing_id
    this.num_guests = num_guests
    this.total_amount = total_amount
    this.payment_status = payment_status
    this.booking_status = booking_status
    this.special_requests = special_requests
  }
}

module.exports = Booking
