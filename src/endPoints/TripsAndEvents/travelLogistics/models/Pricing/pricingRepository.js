const db = require('../../../../../config/database')
const Pricing = require('../Pricing/pricingClass')

class PricingRepository {
  static async findAll() {
    const rows = await db.query('SELECT * FROM pricing ORDER BY created_at DESC');
    return rows.map(row => new Pricing(row));
  }

  static async findByTripId(trip_id) {
    const rows = await db.query('SELECT * FROM pricing WHERE trip_id = $1', [trip_id]);
    return rows.map(row => new Pricing(row));
  }

  static async create(pricingData) {
    const { trip_id, tier_name, price_usd, currency, includes, excludes, is_active } = pricingData;
    const rows = await db.query(
      `INSERT INTO pricing (trip_id, tier_name, price_usd, currency, includes, excludes, is_active, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
       RETURNING *`,
      [trip_id, tier_name, price_usd, currency || 'USD', includes, excludes, is_active ?? true]
    );
    return new Pricing(rows[0]);
  }

  static async update(id, pricingData) {
    const { tier_name, price_usd, currency, includes, excludes, is_active } = pricingData;
    const rows = await db.query(
      `UPDATE pricing
       SET tier_name=$1, price_usd=$2, currency=$3, includes=$4, excludes=$5, is_active=$6
       WHERE id=$7
       RETURNING *`,
      [tier_name, price_usd, currency, includes, excludes, is_active, id]
    );
    return rows.length ? new Pricing(rows[0]) : null;
  }

  static async delete(id) {
    await db.query('DELETE FROM pricing WHERE id = $1', [id]);
    return { message: `Pricing with ID ${id} deleted successfully.` };
  }
}

module.exports = PricingRepository;