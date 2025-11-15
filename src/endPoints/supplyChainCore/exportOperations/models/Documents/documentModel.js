const BaseModel = require('../../../../../config/basemodel/baseModel');

const DocumentModel = new BaseModel('documents', [
    'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
    'export_id UUID REFERENCES export_orders(id) ON DELETE CASCADE',
    'document_type VARCHAR(100) NOT NULL',
    'file_path TEXT NOT NULL',
    'created_at TIMESTAMP DEFAULT NOW()',
    'updated_at TIMESTAMP DEFAULT NOW()',
]);

module.exports = DocumentModel;