class Cooperative {
    constructor(
        id, 
        name, 
        cooperative_type, 
        location, 
        farmer_count, 
        created_at
    ) {
        this.id = id;
        this.name = name;
        this.cooperative_type = cooperative_type;
        this.location = location;
        this.farmer_count = farmer_count;
        this.created_at = created_at;
    }  }

module.exports = Cooperative;