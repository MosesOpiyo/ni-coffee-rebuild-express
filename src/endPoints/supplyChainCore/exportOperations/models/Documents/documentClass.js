class Domument {
    constructor(
        id, 
        export_id, 
        document_type, 
        file_path, 
        updated_at, 
        created_at
    ) {
        this.id = id;
        this.export_id = export_id;
        this.document_type = document_type;
        this.file_path = file_path;
        this.updated_at = updated_at;
        this.created_at = created_at;
    }
}

module.exports = Domument;