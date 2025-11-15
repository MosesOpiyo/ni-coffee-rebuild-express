# NICE Coffee Supply Chain API Documentation

## 0. Authentication & User Management

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "string",
  "phone_number": "string",
  "full_name": "string",
  "role": "string", // "farmer" | "cooperative_manager" | "quality_officer" | "exporter" "importer" | "admin"
  "password": "string"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "string", // email or phone
  "password": "string",
}
```

### Verify Phone
```
POST /api/auth/verify-phone
Content-Type: application/json

{
  "phone_number": "string",
  "code": "string"
}
```

### Enable MFA
```
POST /api/auth/mfa/enable
Authorization: Bearer <token>
Content-Type: application/json

{
  "mfa_type": "string" // "email" | "app"
}
```

## 1. Coffee Farming & Harvesting

### Record New Delivery
```
POST /api/deliveries
Authorization: Bearer <token>
Content-Type: application/json

{
  "farmer_id": "string",
  "weight_kg": number,
  "cherry_grade": "string",
  "cooperative_id": "string"
}
```

### Get Farmer Deliveries
```
GET /api/deliveries/farmer/:farmer_id
Authorization: Bearer <token>
```

## 2. Collection & Aggregation at Cooperative

### Get Cooperative Dashboard
```
GET /api/cooperatives/dashboard/:cooperative_id
Authorization: Bearer <token>
```

### Update Batch Status
```
PUT /api/cooperatives/batches/:batch_id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "string", // "pending" | "sorting" | "processing" | "completed"
}
```

### Process Payments
```
POST /api/cooperatives/payments/process
Authorization: Bearer <token>
Content-Type: application/json

{
  "delivery_ids": ["string"]
}
```

## 3. Wet Processing

### Start Processing
```
POST /api/processing/start
Authorization: Bearer <token>
Content-Type: application/json

{
  "batch_id": "string",
  "process_type": "string", // "pulping" | "fermenting" | "washing" | "drying"
  "method": "string",
  "operator_id": "string"
}
```

### Submit Quality Report
```
POST /api/processing/quality-report
Authorization: Bearer <token>
Content-Type: application/json

{
  "batch_id": "string",
  "moisture_percentage": number,
  "defects_percentage": number,
  "color_score": number,
  "aroma_score": number
}
```

## 4. Dry Milling & Grading

### Create Grading Report
```
POST /api/grading/report
Authorization: Bearer <token>
Content-Type: application/json

{
  "batch_id": "string",
  "grade": "string", // "AA" | "AB" | "PB" | "C" | "T"
  "weight_kg": number,
  "cupping_score": number
}
```

### Update Inventory
```
POST /api/grading/inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "batch_id": "string",
  "bags_count": number,
  "weight_per_bag_kg": number,
  "location": "string"
}
```

## 5. Export Preparation

### Create Export Order
```
POST /api/exports/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "buyer_id": "string",
  "destination": "string",
  "inventory_items": [{
    "lot_id": "string",
    "quantity_bags": number
  }]
}
```

### Generate Export Documents
```
GET /api/exports/documents/:export_id/:document_type
Authorization: Bearer <token>

document_type: "invoice" | "packing_list" | "phytosanitary" | "export_permit"
```

## 6. Shipment & Logistics

### Create Shipment
```
POST /api/shipments
Authorization: Bearer <token>
Content-Type: application/json

{
  "export_id": "string",
  "carrier": "string",
  "vessel_name": "string",
  "container_number": "string",
  "departure_date": "string",
  "estimated_arrival": "string"
}
```

### Update Shipment Status
```
PUT /api/shipments/:shipment_id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "string",
  "location": "string",
  "details": "string"
}
```

## 7. Import & Clearance

### Create Import Entry
```
POST /api/imports
Authorization: Bearer <token>
Content-Type: application/json

{
  "shipment_id": "string",
  "customs_entry_number": "string",
  "fda_entry_number": "string",
  "arrival_date": "string"
}
```

### Upload Customs Documents
```
POST /api/imports/:import_id/documents
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "string", // "customs_entry" | "fda_entry" | "inspection_report"
  "document_number": "string",
  "document_url": "string"
}
```

## 8. Marketplace

### List Available Lots
```
GET /api/marketplace/lots
Authorization: Bearer <token>
Query Parameters:
  - origin: string
  - grade: string
  - min_cupping_score: number
  - max_price: number
```

### Create Order
```
POST /api/marketplace/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "lots": [{
    "lot_id": "string",
    "quantity_kg": number
  }],
  "buyer_id": "string"
}
```

## 9. Traceability

### Get Batch Traceability
```
GET /api/trace/batch/:batch_id
Public endpoint - no authorization required
```

### Generate QR Code
```
GET /api/trace/qr/:batch_id
Authorization: Bearer <token>
```

### Upload Media
```
POST /api/trace/media/:batch_id
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "string", // "image" | "video"
  "url": "string",
  "caption": "string",
  "category": "string" // "farm" | "processing" | "cupping"
}
```

## 10. Analytics & Reporting

### Get Dashboard Metrics
```
GET /api/analytics/dashboard
Authorization: Bearer <token>
Query Parameters:
  - period: "daily" | "weekly" | "monthly" | "yearly"
```

### Submit Feedback
```
POST /api/analytics/feedback
Authorization: Bearer <token>
Content-Type: application/json

{
  "batch_id": "string",
  "quality_rating": number,
  "taste_notes": ["string"],
  "comments": "string"
}
```

### Generate Report
```
POST /api/analytics/reports
Authorization: Bearer <token>
Content-Type: application/json

{
  "report_type": "string", // "earnings" | "quality" | "volume" | "demand"
  "parameters": {
    "start_date": "string",
    "end_date": "string",
    "region": "string"
  }
}
```

## 11. E-commerce Operations

### Product Management

#### List Products
```
GET /api/ecommerce/products
Query Parameters:
  - origin: string
  - grade: string
  - min_cupping_score: number
  - max_price: number
  - certifications: string[]
  - processing_method: string
```

#### Get Product Details
```
GET /api/ecommerce/products/:product_id
```

#### Create Product Listing
```
POST /api/ecommerce/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "batch_id": "string",
  "title": "string",
  "price_per_kg": number,
  "minimum_order": number,
  "certifications": ["string"],
  "shipping_origin": "string",
  "estimated_delivery": {
    "min_days": number,
    "max_days": number
  }
}
```

### Shopping Cart Operations

#### Add to Cart
```
POST /api/ecommerce/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": "string",
  "quantity_kg": number
}
```

#### Get Cart Contents
```
GET /api/ecommerce/cart
Authorization: Bearer <token>
```

#### Checkout
```
POST /api/ecommerce/cart/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "shipping_address": {
    "company": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "country": "string"
  },
  "payment_method": "string", // "stripe" | "payoneer" | "mpesa" | "wire"
  "delivery_method": "string" // "warehouse_pickup" | "delivery"
}
```

### Reviews & Ratings

#### Submit Review
```
POST /api/ecommerce/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": "string",
  "rating": number,
  "taste_notes": ["string"],
  "comment": "string"
}
```

#### Get Product Reviews
```
GET /api/ecommerce/products/:product_id/reviews
Query Parameters:
  - page: number
  - limit: number
  - sort: "recent" | "rating"
```

### Payment Operations

#### Create Payment Intent
```
POST /api/ecommerce/payments/intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "order_id": "string",
  "payment_method": "string",
  "currency": "string"
}
```

#### Confirm Payment
```
POST /api/ecommerce/payments/confirm
Authorization: Bearer <token>
Content-Type: application/json

{
  "payment_intent_id": "string",
  "order_id": "string"
}
```

### Revenue Distribution

#### Get Payout Status
```
GET /api/ecommerce/payouts/status
Authorization: Bearer <token>
Query Parameters:
  - order_id: string
```

#### Revenue Breakdown
```
GET /api/ecommerce/revenue/:order_id/breakdown
Authorization: Bearer <token>
```

## 12. CRM Operations

### Farm Management

#### Record Harvest
```
POST /api/crm/farms/harvests
Authorization: Bearer <token>
Content-Type: application/json

{
  "farmer_id": "string",
  "harvest_date": "string",
  "variety": "string",
  "lot_number": "string",
  "quantity_kg": number,
  "moisture_content": number
}
```

#### Get Farm Analytics
```
GET /api/crm/farms/:farmer_id/analytics
Authorization: Bearer <token>
Query Parameters:
  - period: "season" | "year"
  - metric: "earnings" | "quality" | "volume"
```

### Training & Quality Control

#### Schedule Training
```
POST /api/crm/training/sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "scheduled_date": "string",
  "location": "string",
  "materials_url": ["string"]
}
```

#### Submit Quality Feedback
```
POST /api/crm/quality/feedback
Authorization: Bearer <token>
Content-Type: application/json

{
  "batch_id": "string",
  "feedback_type": "string", // "harvest" | "processing" | "cupping"
  "rating": number,
  "improvement_notes": "string"
}
```

### Communication

#### Send Message
```
POST /api/crm/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "receiver_id": "string",
  "message_type": "string", // "chat" | "announcement" | "alert"
  "content": "string"
}
```

#### Get Messages
```
GET /api/crm/messages
Authorization: Bearer <token>
Query Parameters:
  - type: "chat" | "announcement" | "alert"
  - since: timestamp
```

### Supplier Management

#### Create Supplier Relationship
```
POST /api/crm/suppliers
Authorization: Bearer <token>
Content-Type: application/json

{
  "supplier_id": "string",
  "relationship_type": "string",
  "preferred_contact_method": "string",
  "purchase_frequency": "string",
  "notes": "string"
}
```

#### Get Supplier Performance
```
GET /api/crm/suppliers/:supplier_id/performance
Authorization: Bearer <token>
Query Parameters:
  - period: "monthly" | "yearly"
  - metrics: ["quality", "delivery", "price"]
```

## Response Formats

All endpoints return JSON responses with the following structure:

### Success Response
```json
{
  "status": "success",
  "data": <response_data>,
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```
