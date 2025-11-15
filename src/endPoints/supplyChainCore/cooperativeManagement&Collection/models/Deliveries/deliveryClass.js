class Delivery {
  constructor(
    id, 
    cooperative_id, 
    batch_id, 
    weight_kg, 
    cherry_grade, 
    delivery_date
) {
        this.id = id;
        this.cooperative_id = cooperative_id;
        this.batch_id = batch_id;
        this.weight_kg = weight_kg;
        this.cherry_grade = cherry_grade;
        this.delivery_date = delivery_date;
    }
}

module.exports = Delivery;