Authentication Step
Models Needed:

Users:
Fields:
id: Unique identifier for the user.
auth_id: Supabase authentication ID.
email: User's email address.
phone_number: User's phone number.
full_name: User's full name.
role: User's role (e.g., farmer, cooperative_manager, etc.).
created_at: Timestamp of user creation.
updated_at: Timestamp of last update.
Supply Chain Core Features
Farming & Collection
Models Needed:

Deliveries:

Fields:
id: Unique identifier for the delivery.
farmer_id: Foreign key to the users table.
batch_id: Unique batch identifier.
weight_kg: Weight of the delivery in kilograms.
cherry_grade: Grade of the coffee cherries.
delivery_date: Date of delivery.
payment_status: Status of payment (e.g., pending, paid).
Payments:

Fields:
id: Unique identifier for the payment.
payer_id: Foreign key to the users table.
payee_id: Foreign key to the users table.
amount: Payment amount.
currency: Currency of the payment.
status: Payment status (e.g., pending, completed, failed).
payment_date: Date of payment.
Processing & Quality Control
Models Needed:

Batches:

Fields:
id: Unique identifier for the batch.
cooperative_id: Foreign key to the users table.
batch_code: Unique batch code.
grade: Grade of the batch.
weight_kg: Weight of the batch in kilograms.
status: Batch status (e.g., pending, processing, completed).
created_at: Timestamp of batch creation.
updated_at: Timestamp of last update.
QualityReports:

Fields:
id: Unique identifier for the quality report.
batch_id: Foreign key to the batches table.
grader_id: Foreign key to the users table.
cupping_score: Cupping score of the batch.
defects: Defects found in the batch.
created_at: Timestamp of report creation.
Export Operations
Models Needed:

ExportOrders:

Fields:
id: Unique identifier for the export order.
buyer_id: Foreign key to the users table.
batch_id: Foreign key to the batches table.
destination: Destination of the export.
status: Order status (e.g., draft, confirmed, shipped).
created_at: Timestamp of order creation.
Documents:

Fields:
id: Unique identifier for the document.
export_id: Foreign key to the export_orders table.
type: Type of document (e.g., certificate, invoice).
url: URL of the document.
created_at: Timestamp of document creation.
Import Operations
Models Needed:

Shipments:

Fields:
id: Unique identifier for the shipment.
export_id: Foreign key to the export_orders table.
status: Shipment status (e.g., in transit, delivered).
tracking_number: Tracking number for the shipment.
estimated_arrival: Estimated arrival date.
created_at: Timestamp of shipment creation.
WarehouseInventory:

Fields:
id: Unique identifier for the inventory item.
shipment_id: Foreign key to the shipments table.
product_id: Foreign key to the products table.
quantity: Quantity of the product in stock.
location: Location of the inventory item.
status: Inventory status (e.g., available, reserved, sold).
E-commerce Features
Product Management
Models Needed:

Products:

Fields:
id: Unique identifier for the product.
name: Name of the product.
description: Description of the product.
price_per_kg: Price per kilogram.
stock: Stock quantity.
grade: Grade of the product.
origin: Origin of the product.
cupping_score: Cupping score of the product.
created_at: Timestamp of product creation.
updated_at: Timestamp of last update.
Orders:

Fields:
id: Unique identifier for the order.
buyer_id: Foreign key to the users table.
product_id: Foreign key to the products table.
quantity: Quantity ordered.
total_price: Total price of the order.
status: Order status (e.g., pending, completed, cancelled).
created_at: Timestamp of order creation.
CRM Functionality
Farmer Management
Models Needed:

Farmers:
Fields:
id: Unique identifier for the farmer.
user_id: Foreign key to the users table.
farm_name: Name of the farm.
location: Location of the farm.
total_deliveries: Total deliveries made by the farmer.
total_earnings: Total earnings of the farmer.
Traceability System
Models Needed:

TraceabilityRecords:

Fields:
id: Unique identifier for the traceability record.
batch_id: Foreign key to the batches table.
processing_steps: JSONB field for processing steps.
quality_metrics: JSONB field for quality metrics.
created_at: Timestamp of record creation.
MediaAssets:

Fields:
id: Unique identifier for the media asset.
batch_id: Foreign key to the batches table.
type: Type of media (e.g., photo, video).
url: URL of the media asset.
uploaded_at: Timestamp of upload.
Analytics & Reporting
Models Needed:

Analytics:

Fields:
id: Unique identifier for the analytics record.
metric_name: Name of the metric.
metric_value: Value of the metric.
dimension: Dimension of the metric (e.g., region, grade).
period: Time period of the metric (e.g., daily, monthly).
created_at: Timestamp of record creation.
Reports:

Fields:
id: Unique identifier for the report.
type: Type of report (e.g., earnings, quality).
parameters: JSONB field for report parameters.
data: JSONB field for report data.
generated_at: Timestamp of report generation.