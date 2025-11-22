const BaseModel = require('../../../../../config/basemodel/baseModel');

class DocumentModel extends BaseModel{
    constructor(data={}){
        super('documents', [
            'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
            'export_id UUID REFERENCES export_orders(id) ON DELETE CASCADE',
            'document_type VARCHAR(100) NOT NULL',
            'file_path TEXT NOT NULL',
        ]);
        Object.assign(this, data);
    }

    toJSON(){
        return{
            id: this.id,
            export_id: this.export_id,
            document_type: this.document_type,
            file_path: this.file_path,
        }
    }
}

module.exports = DocumentModel;