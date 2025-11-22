const BaseModel = require('../../../../../config/basemodel/baseModel');

class CooperativeModel extends BaseModel{
    constructor(data = {}){
        super('cooperatives', [
          'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
          'name VARCHAR(100) UNIQUE NOT NULL',
          'cooperative_type VARCHAR(50) NOT NULL',
          'location VARCHAR(255) NOT NULL',
          'farmer_count INT NOT NULL'
      ]); 
        Object.assign(this, data);
    }

    toJSON(){
      return {
        id: this.id,
        name: this.name,
        cooperative_type: this.cooperative_type,
        location: this.location,
        farmer_count: this.farmer_count
      }
    }
}

module.exports = CooperativeModel;