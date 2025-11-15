class Product {
    constructor(
        id, 
        name, 
        description, 
        price_per_kg, 
        stock, 
        grade, 
        origin, 
        cupping_score, 
        created_at, 
        updated_at
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price_per_kg = price_per_kg;
        this.stock = stock;
        this.grade = grade;
        this.origin = origin;
        this.cupping_score = cupping_score;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = Product