const BaseModel = require('../../../../../config/basemodel/baseModel');

class BatchModel extends BaseModel{
    constructor(data = {}){
        super('batches', [
            'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
            'cooperative_id UUID REFERENCES cooperatives(id) ON DELETE SET NULL',
            'batch_code VARCHAR(100) UNIQUE NOT NULL',
            'grade VARCHAR(50) NOT NULL',
            'weight_kg FLOAT NOT NULL',
            'status VARCHAR(50) DEFAULT \'pending\''
        ]);
        Object.assign(this, data);
    }

    toJSON(){
        return {
            id: this.id,
            cooperative_id: this.cooperative_id,
            batch_code: this.batch_code,
            grade: this.grade,
            weight_kg: this.weight_kg,
            status: this.status,
        }
    }
}

module.exports = BatchModel;