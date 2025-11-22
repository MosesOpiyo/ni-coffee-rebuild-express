const BaseModel = require('../../../../config/basemodel/baseModel');

class qualityReportsModel extends BaseModel{
  constructor(data = {}){
      super('quality_reports', [
      'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
      'batch_id UUID REFERENCES batches(id) ON DELETE SET NULL',
      'inspection_date TIMESTAMP DEFAULT NOW()',
      'inspector_name VARCHAR(100) NOT NULL',
      'defects_found TEXT',
      'quality_grade VARCHAR(50) NOT NULL',
      'remarks TEXT',
    ]);
        Object.assign(this, data);
      }
      toJSON(){
        return {
          id: this.id,
          batch_id: this.batch_id,
          inspection_date: this.inspection_date,
          inspector_name: this.inspector_name,
          defects_found: this.defects_found,
          quality_grade: this.quality_grade,
          remarks: this.remarks
      }
}
}

module.exports = qualityReportsModel;