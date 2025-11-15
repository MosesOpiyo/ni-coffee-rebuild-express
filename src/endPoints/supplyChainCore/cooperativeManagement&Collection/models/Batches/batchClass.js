class Batch {
    constructor(id, 
        cooperative_id, 
        batch_code, 
        grade, 
        weight_kg, 
        status, 
        created_at, 
        updated_at
    ) {
        this.id = id;
        this.cooperative_id = cooperative_id;
        this.batch_code = batch_code;
        this.grade = grade;
        this.weight_kg = weight_kg;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = Batch;