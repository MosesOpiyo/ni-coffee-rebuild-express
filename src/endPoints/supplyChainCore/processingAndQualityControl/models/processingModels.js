const BaseModel = require('../../../../config/basemodel/baseModel');

const qualityReportsModel = new BaseModel('quality_reports', [
  'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  'batch_id UUID REFERENCES batches(id) ON DELETE SET NULL',
  'inspection_date TIMESTAMP DEFAULT NOW()',
  'inspector_name VARCHAR(100) NOT NULL',
  'defects_found TEXT',
  'quality_grade VARCHAR(50) NOT NULL',
  'remarks TEXT',
  'created_at TIMESTAMP DEFAULT NOW()',
  'updated_at TIMESTAMP DEFAULT NOW()'
]);

module.exports = qualityReportsModel;