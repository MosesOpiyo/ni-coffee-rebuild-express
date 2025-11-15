class Pricing {
  constructor(
    id,
    trip_id,
    tier_name,
    price_usd,
    currency,
    includes,
    excludes,
    is_active
  ) {
    this.id = id
    this.trip_id = trip_id
    this.tier_name = tier_name
    this.price_usd = price_usd
    this.currency = currency
    this.includes = includes
    this.excludes = excludes
    this.is_active = is_active
  }
}

module.exports = Pricing
