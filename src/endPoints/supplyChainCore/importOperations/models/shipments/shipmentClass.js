class Shipment {

    constructor(
        id,
        export_id,
        status,
        tracking_number,
        estimated_arrival,
        created_at
    ) {
        this.id = id;
        this.export_id = export_id;
        this.status = status;
        this.tracking_number = tracking_number;
        this.estimated_arrival = estimated_arrival;
        this.created_at = created_at;
    }
}

module.exports = Shipment;