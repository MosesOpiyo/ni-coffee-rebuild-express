const db = require('../../../../../config/database')
const OverlandTravel = require('../OverLandTravels/overLandTravelClass')

class OverlandTravelRepository {
  static async findAllByTrip(trip_id) {
    const rows = await db.query('SELECT * FROM overland_travel WHERE trip_id = $1 ORDER BY day_number', [trip_id])
    return rows.map(row => new OverlandTravel(row))
  }

  static async create(travelData) {
    const {
      trip_id, day_number, route, vehicle_type,
      departure_time, arrival_time, driver_name, notes
    } = travelData

    const rows = await db.query(
      `INSERT INTO overland_travel (trip_id, day_number, route, vehicle_type, departure_time, arrival_time, driver_name, notes, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *`,
      [trip_id, day_number, route, vehicle_type, departure_time, arrival_time, driver_name, notes]
    )

    return new OverlandTravel(rows[0])
  }

  static async update(id, travelData) {
    const {
      day_number, route, vehicle_type, departure_time,
      arrival_time, driver_name, notes
    } = travelData

    const rows = await db.query(
      `UPDATE overland_travel SET
        day_number=$1, route=$2, vehicle_type=$3,
        departure_time=$4, arrival_time=$5,
        driver_name=$6, notes=$7
       WHERE id=$8 RETURNING *`,
      [day_number, route, vehicle_type, departure_time, arrival_time, driver_name, notes, id]
    )

    return rows.length ? new OverlandTravel(rows[0]) : null
  }

  static async delete(id) {
    await db.query('DELETE FROM overland_travel WHERE id = $1', [id])
    return { message: `Overland travel with ID ${id} deleted.` }
  }
}

module.exports = OverlandTravelRepository
