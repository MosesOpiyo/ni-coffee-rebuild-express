const db = require('../../../../../config/database')
const Trip = require('../Trips/tripsClass')

class TripRepository {
  static async findAll() {
    const rows = await db.query('SELECT * FROM trips ORDER BY created_at DESC')
    return rows.map(row => new Trip(row))
  }

  static async findById(id) {
    const rows = await db.query('SELECT * FROM trips WHERE id = $1', [id])
    return rows.length ? new Trip(rows[0]) : null
  }

  static async create(tripData) {
    const {
      title, slug, description, region, duration_days,
      start_date, end_date, max_participants, available_slots,
      cover_image, gallery, status
    } = tripData

    const rows = await db.query(
      `INSERT INTO trips (
        title, slug, description, region, duration_days,
        start_date, end_date, max_participants, available_slots,
        cover_image, gallery, status, created_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW()
      ) RETURNING *`,
      [title, slug, description, region, duration_days,
       start_date, end_date, max_participants, available_slots,
       cover_image, gallery, status || 'upcoming']
    )

    return new Trip(rows[0])
  }

  static async update(id, tripData) {
    const {
      title, description, region, duration_days, start_date,
      end_date, max_participants, available_slots, cover_image,
      gallery, status
    } = tripData

    const rows = await db.query(
      `UPDATE trips SET
        title=$1, description=$2, region=$3, duration_days=$4,
        start_date=$5, end_date=$6, max_participants=$7, available_slots=$8,
        cover_image=$9, gallery=$10, status=$11
       WHERE id=$12 RETURNING *`,
      [title, description, region, duration_days, start_date, end_date,
       max_participants, available_slots, cover_image, gallery, status, id]
    )

    return rows.length ? new Trip(rows[0]) : null
  }

  static async delete(id) {
    await db.query('DELETE FROM trips WHERE id = $1', [id])
    return { message: `Trip with ID ${id} deleted successfully.` }
  }
}

module.exports = TripRepository
