class QualityReport {
    constructor(
        id, 
        batch_id, 
        inspection_date, 
        inspector_name, 
        quality_grade, 
        defects_found, 
        moisture_content, 
        created_at
    ) {
        this.id = id;
        this.batch_id = batch_id;
        this.inspection_date = inspection_date;
        this.inspector_name = inspector_name;
        this.quality_grade = quality_grade;
        this.defects_found = defects_found;
        this.moisture_content = moisture_content;
        this.created_at = created_at;
    }
}

module.exports = QualityReport;