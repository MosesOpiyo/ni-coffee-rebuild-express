class WarehouseInventory{
  constructor(
        id,
        shipment_id,
        product_id,
        quantity,
        location,
        status
    ) {
        this.id = id;
        this.shipment_id = shipment_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.location = location;
        this.status = status;
    }
}

module.exports = WarehouseInventory;