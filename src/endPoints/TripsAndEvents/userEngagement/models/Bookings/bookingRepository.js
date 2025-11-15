const db = require('../../../../../config/database')
const Booking = require('../Bookings/bookingClass')

class BookingRepository {
  static async findAllByTrip(trip_id) {
    const rows = await db.query('SELECT * FROM bookings WHERE trip_id = $1 ORDER BY created_at DESC', [trip_id])
    return rows.map(row => new Booking(row))
  }

  static async findByUser(user_id) {
    const rows = await db.query('SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC', [user_id])
    return rows.map(row => new Booking(row))
  }

  static async create(bookingData) {
    const {
      trip_id, user_id, pricing_id, num_guests,
      total_amount, payment_status, booking_status, special_requests
    } = bookingData

    const rows = await db.query(
      `INSERT INTO bookings (trip_id, user_id, pricing_id, num_guests, total_amount, payment_status, booking_status, special_requests, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *`,
      [trip_id, user_id, pricing_id, num_guests, total_amount, payment_status, booking_status, special_requests]
    )

    return new Booking(rows[0])
  }

  static async updateStatus(id, status) {
    const rows = await db.query(
      `UPDATE bookings SET booking_status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    )
    return rows.length ? new Booking(rows[0]) : null
  }

  static async delete(id) {
    await db.query('DELETE FROM bookings WHERE id = $1', [id])
    return { message: `Booking with ID ${id} deleted successfully.` }
  }
}

module.exports = BookingRepository
