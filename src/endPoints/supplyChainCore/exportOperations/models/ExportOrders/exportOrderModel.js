const BaseModel = require('../../../../../config/basemodel/baseModel');

class ExportOrderModel extends BaseModel{
    constructor(data = {}){
        super('export_orders', [
            'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
            'batch_id UUID REFERENCES batches(id) ON DELETE SET NULL',
            'quantity_kg FLOAT NOT NULL',
            'destination VARCHAR(255) NOT NULL',
            'export_date TIMESTAMP DEFAULT NOW()',
            'status VARCHAR(50) DEFAULT \'pending\'',
        ]);
                Object.assign(this, data);
            }

    toJSON(){
        return {
            id: this.id,
            batch_id: this.batch_id,
            quantity_kg: this.quantity_kg,
            destination: this.destination,
            export_date: this.export_date,
            status: this.status
        }
    }
}

module.exports = ExportOrderModel;