const db = require('../../../../../config/database')
const Hotel = require('../Hotels/hotelClass')

class HotelRepository {
  static async findByTripId(trip_id) {
    const rows = await db.query('SELECT * FROM hotels WHERE trip_id = $1 ORDER BY check_in_day', [trip_id])
    return rows.map(row => new Hotel(row))
  }

  static async create(hotelData) {
    const {
      trip_id, hotel_name, location,
      check_in_day, check_out_day, rating,
      contact_info, notes
    } = hotelData

    const rows = await db.query(
      `INSERT INTO hotels (trip_id, hotel_name, location, check_in_day, check_out_day, rating, contact_info, notes, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *`,
      [trip_id, hotel_name, location, check_in_day, check_out_day, rating, contact_info, notes]
    )

    return new Hotel(rows[0])
  }

  static async update(id, hotelData) {
    const {
      hotel_name, location, check_in_day,
      check_out_day, rating, contact_info, notes
    } = hotelData

    const rows = await db.query(
      `UPDATE hotels SET
        hotel_name=$1, location=$2, check_in_day=$3,
        check_out_day=$4, rating=$5, contact_info=$6, notes=$7
       WHERE id=$8 RETURNING *`,
      [hotel_name, location, check_in_day, check_out_day, rating, contact_info, notes, id]
    )

    return rows.length ? new Hotel(rows[0]) : null
  }

  static async delete(id) {
    await db.query('DELETE FROM hotels WHERE id = $1', [id])
    return { message: `Hotel with ID ${id} deleted successfully.` }
  }
}

module.exports = HotelRepository
