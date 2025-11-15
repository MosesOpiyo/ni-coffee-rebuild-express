class ExportOrder {
    constructor(
        id, 
        batch_id, 
        quantity_kg, 
        destination, 
        export_date, 
        status,
        created_at, 
        updated_at
    ) {
        this.id = id;
        this.batch_id = batch_id;
        this.quantity_kg = quantity_kg;
        this.destination = destination;
        this.export_date = export_date;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
        }
}

module.exports = ExportOrder