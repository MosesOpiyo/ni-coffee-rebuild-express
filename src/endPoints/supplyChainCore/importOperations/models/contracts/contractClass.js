class Contract {
    constructor(
        contract_id, 
        supplier_id, 
        product_id, 
        quantity, 
        price, 
        currency, 
        start_date, 
        end_date, 
        status) {
        this.contract_id = contract_id;
        this.supplier_id = supplier_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
    
    }
}

module.exports = Contract;