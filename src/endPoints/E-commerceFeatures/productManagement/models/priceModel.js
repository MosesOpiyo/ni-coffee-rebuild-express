const BaseModel = require('../../../../config/basemodel/baseModel');

class PriceModel extends BaseModel{
    constructor(data={}){
        super('prices',[
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'price_per_kg FLOAT NOT NULL',
    'currency VARCHAR(10) NOT NULL',
    'is_active BOOLEAN DEFAULT TRUE',
    ]);
    }

    toJSON(){
        return {
            id:this.id,
            price_per_kg:this.price_per_kg,
            currency:this.currency,
            is_active:this.is_active,
        }
    }
}

module.exports = PriceModel;