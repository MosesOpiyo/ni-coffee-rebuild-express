const BaseModel = require('../../../../../config/basemodel/baseModel');

class ShipmentModel extends BaseModel{
    constructor(data = {}){
        super('shipments', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'export_id UUID REFERENCES export_orders(id) ON DELETE SET NULL',
    'status VARCHAR(50) DEFAULT \'in_transit\'',
    'tracking_number VARCHAR(100) UNIQUE NOT NULL',
    'estimated_arrival TIMESTAMP'
]);
        Object.assign(this, data);
    }

    toJSON(){
        return {
            id: this.id,
            export_id: this.export_id,
            status: this.status,
            tracking_number: this.tracking_number,
            estimated_arrival: this.estimated_arrival
    }
}
}

module.exports = ShipmentModel;