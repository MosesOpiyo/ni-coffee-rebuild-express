const BaseModel = require("../../../../config/basemodel/baseModel");

class ProductModel extends BaseModel{
    constructor(data = {}){
        super('products', [
            'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
            'name VARCHAR(255) NOT NULL',
            'description TEXT',
            'batch_id UUID REFERENCES batches(id) ON DELETE SET NULL',
            'price_id UUID REFERENCES prices(id) ON DELETE SET NULL',
            'flavor_id UUID REFERENCES flavors(id) ON DELETE SET NULL',
            'stock FLOAT NOT NULL',
            'grade VARCHAR(100)',
            'origin VARCHAR(100)',
            'cupping_score FLOAT'
        ]);
                Object.assign(this, data);
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            batch_id: this.batch_id,
            price_id: this.price_id,
            flavor_id: this.flavor_id,
            stock: this.stock,
            grade: this.grade,
            origin: this.origin,
            cupping_score: this.cupping_score
        }
    }
}

class FlavorModel extends BaseModel{
    constructor(data={}){
        super('flavors', [
            'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
            'name VARCHAR(255) NOT NULL',
        ]);
        Object.assign(this, data);
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
        }
    }
}

module.exports = ProductModel, FlavorModel;