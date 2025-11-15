class Price {
    constructor(
        id,
        price_per_kg,
        currency,
        is_active
    ) {
        this.id = id;
        this.price_per_kg = price_per_kg;
        this.currency = currency;
        this.is_active = is_active;
    }

}

module.exports = Price;