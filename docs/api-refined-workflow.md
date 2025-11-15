# NICE Coffee Platform Refined API Workflow

## 1. Authentication & User Management

### Models
- **Users**:
  - `id`, `auth_id`, `email`, `phone_number`, `full_name`, `role`, `created_at`, `updated_at`

### Repository Functions
- **UserRepository**:
  - `findByAuthId(authId)`: Fetch user by Supabase `auth_id`.
  - `findById(id)`: Fetch user by `id`.
  - `create(userData)`: Insert a new user into the `users` table.
  - `update(id, userData)`: Update an existing user.

### Controller Functions
- **AuthController**:
  - `register(req, res)`: Handles user registration.
  - `login(req, res)`: Handles user login.
  - `enableMFA(req, res)`: Enables multi-factor authentication.

### Router Endpoints
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user.
- `POST /api/auth/mfa/enable`: Enable MFA for a user.

---

## 2. Cooperative Management & Collection

### Models
- **Cooperatives**:
  - `id`, `name`, `location`, `farmer_count`, `created_at`
- **Deliveries**:
  - `id`, `cooperative_id`, `batch_id`, `weight_kg`, `cherry_grade`, `delivery_date`
- **Batches**:
  - `id`, `cooperative_id`, `batch_code`, `grade`, `weight_kg`, `status`, `created_at`, `updated_at`

### Repository Functions
- **CooperativeRepository**:
  - `findById(id)`: Fetch cooperative by `id`.
  - `findAll()`: Fetch all cooperatives.
  - `create(cooperativeData)`: Insert a new cooperative.
  - `update(id, cooperativeData)`: Update an existing cooperative.
  - `delete(id)`: Delete a cooperative.

- **DeliveryRepository**:
  - `findById(id)`: Fetch delivery by `id`.
  - `findByCooperativeId(cooperativeId)`: Fetch deliveries for a cooperative.
  - `create(deliveryData)`: Insert a new delivery.
  - `update(id, deliveryData)`: Update an existing delivery.
  - `delete(id)`: Delete a delivery.

- **BatchRepository**:
  - `findById(id)`: Fetch batch by `id`.
  - `findByCooperativeId(cooperativeId)`: Fetch batches for a cooperative.
  - `create(batchData)`: Insert a new batch.
  - `update(id, batchData)`: Update an existing batch.
  - `delete(id)`: Delete a batch.

### Controller Functions
- **CooperativeController**:
  - `getCooperativeById(req, res)`: Fetch a cooperative by `id`.
  - `createCooperative(req, res)`: Create a new cooperative.
  - `updateCooperative(req, res)`: Update an existing cooperative.
  - `deleteCooperative(req, res)`: Delete a cooperative.

- **DeliveryController**:
  - `getDeliveryById(req, res)`: Fetch a delivery by `id`.
  - `createDelivery(req, res)`: Create a new delivery.
  - `updateDelivery(req, res)`: Update an existing delivery.
  - `deleteDelivery(req, res)`: Delete a delivery.

- **BatchController**:
  - `getBatchById(req, res)`: Fetch a batch by `id`.
  - `createBatch(req, res)`: Create a new batch.
  - `updateBatch(req, res)`: Update an existing batch.
  - `deleteBatch(req, res)`: Delete a batch.

### Router Endpoints
- `GET /api/cooperatives/:id`: Fetch a cooperative by `id`.
- `POST /api/cooperatives`: Create a new cooperative.
- `PUT /api/cooperatives/:id`: Update a cooperative.
- `DELETE /api/cooperatives/:id`: Delete a cooperative.

- `GET /api/deliveries/:id`: Fetch a delivery by `id`.
- `POST /api/deliveries`: Create a new delivery.
- `PUT /api/deliveries/:id`: Update a delivery.
- `DELETE /api/deliveries/:id`: Delete a delivery.

- `GET /api/batches/:id`: Fetch a batch by `id`.
- `POST /api/batches`: Create a new batch.
- `PUT /api/batches/:id`: Update a batch.
- `DELETE /api/batches/:id`: Delete a batch.

---

## 3. Processing & Quality Control

### Models
- **QualityReports**:
  - `id`, `batch_id`, `grader_id`, `cupping_score`, `defects`, `created_at`

### Repository Functions
- **QualityReportRepository**:
  - `findByBatchId(batchId)`: Fetch quality reports for a batch.
  - `create(reportData)`: Insert a new quality report.
  - `update(id, reportData)`: Update an existing quality report.
  - `delete(id)`: Delete a quality report.

### Controller Functions
- **QualityReportController**:
  - `getReportsByBatchId(req, res)`: Fetch quality reports for a batch.
  - `createReport(req, res)`: Create a new quality report.
  - `updateReport(req, res)`: Update an existing quality report.
  - `deleteReport(req, res)`: Delete a quality report.

### Router Endpoints
- `GET /api/quality-reports/batch/:batchId`: Fetch quality reports for a batch.
- `POST /api/quality-reports`: Create a new quality report.
- `PUT /api/quality-reports/:id`: Update a quality report.
- `DELETE /api/quality-reports/:id`: Delete a quality report.

---

## 4. Export Operations

### Models
- **ExportOrders**:
  - `id`, `buyer_id`, `batch_id`, `destination`, `status`, `created_at`
- **Documents**:
  - `id`, `export_id`, `type`, `url`, `created_at`

### Repository Functions
- **ExportOrderRepository**:
  - `findById(id)`: Fetch an export order by `id`.
  - `create(orderData)`: Insert a new export order.
  - `update(id, orderData)`: Update an existing export order.
  - `delete(id)`: Delete an export order.

- **DocumentRepository**:
  - `findByExportId(exportId)`: Fetch documents for an export order.
  - `create(documentData)`: Insert a new document.
  - `delete(id)`: Delete a document.

### Controller Functions
- **ExportOrderController**:
  - `getOrderById(req, res)`: Fetch an export order by `id`.
  - `createOrder(req, res)`: Create a new export order.
  - `updateOrder(req, res)`: Update an existing export order.
  - `deleteOrder(req, res)`: Delete an export order.

- **DocumentController**:
  - `getDocumentsByExportId(req, res)`: Fetch documents for an export order.
  - `createDocument(req, res)`: Create a new document.
  - `deleteDocument(req, res)`: Delete a document.

### Router Endpoints
- `GET /api/export-orders/:id`: Fetch an export order by `id`.
- `POST /api/export-orders`: Create a new export order.
- `PUT /api/export-orders/:id`: Update an export order.
- `DELETE /api/export-orders/:id`: Delete an export order.

- `GET /api/documents/export/:exportId`: Fetch documents for an export order.
- `POST /api/documents`: Create a new document.
- `DELETE /api/documents/:id`: Delete a document.

---

## 5. Import Operations

### Models
- **Shipments**:
  - `id`, `export_id`, `status`, `tracking_number`, `estimated_arrival`, `created_at`
- **WarehouseInventory**:
  - `id`, `shipment_id`, `product_id`, `quantity`, `location`, `status`

### Repository Functions
- **ShipmentRepository**:
  - `findById(id)`: Fetch a shipment by `id`.
  - `create(shipmentData)`: Insert a new shipment.
  - `update(id, shipmentData)`: Update an existing shipment.
  - `delete(id)`: Delete a shipment.

- **WarehouseInventoryRepository**:
  - `findByShipmentId(shipmentId)`: Fetch inventory for a shipment.
  - `create(inventoryData)`: Insert a new inventory item.
  - `update(id, inventoryData)`: Update an existing inventory item.
  - `delete(id)`: Delete an inventory item.

### Controller Functions
- **ShipmentController**:
  - `getShipmentById(req, res)`: Fetch a shipment by `id`.
  - `createShipment(req, res)`: Create a new shipment.
  - `updateShipment(req, res)`: Update an existing shipment.
  - `deleteShipment(req, res)`: Delete a shipment.

- **WarehouseInventoryController**:
  - `getInventoryByShipmentId(req, res)`: Fetch inventory for a shipment.
  - `createInventory(req, res)`: Create a new inventory item.
  - `updateInventory(req, res)`: Update an existing inventory item.
  - `deleteInventory(req, res)`: Delete an inventory item.

### Router Endpoints
- `GET /api/shipments/:id`: Fetch a shipment by `id`.
- `POST /api/shipments`: Create a new shipment.
- `PUT /api/shipments/:id`: Update a shipment.
- `DELETE /api/shipments/:id`: Delete a shipment.

- `GET /api/warehouse-inventory/shipment/:shipmentId`: Fetch inventory for a shipment.
- `POST /api/warehouse-inventory`: Create a new inventory item.
- `PUT /api/warehouse-inventory/:id`: Update an inventory item.
- `DELETE /api/warehouse-inventory/:id`: Delete an inventory item.

---

## 6. E-commerce Features

### Product Management

#### Models
- **Products**:
  - `id`, `name`, `description`, `price_per_kg`, `stock`, `grade`, `origin`, `cupping_score`, `created_at`, `updated_at`

#### Repository Functions
- **ProductRepository**:
  - `findById(id)`: Fetch product by `id`.
  - `findAll()`: Fetch all products.
  - `create(productData)`: Insert a new product.
  - `update(id, productData)`: Update an existing product.
  - `delete(id)`: Delete a product.

#### Controller Functions
- **ProductController**:
  - `getProductById(req, res)`: Fetch a product by `id`.
  - `getAllProducts(req, res)`: Fetch all products.
  - `createProduct(req, res)`: Create a new product.
  - `updateProduct(req, res)`: Update an existing product.
  - `deleteProduct(req, res)`: Delete a product.

#### Router Endpoints
- `GET /api/products/:id`: Fetch a product by `id`.
- `GET /api/products`: Fetch all products.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update a product.
- `DELETE /api/products/:id`: Delete a product.

---

### Shopping Experience

#### Models
- **Orders**:
  - `id`, `buyer_id`, `product_id`, `quantity`, `total_price`, `status`, `created_at`

#### Repository Functions
- **OrderRepository**:
  - `findById(id)`: Fetch an order by `id`.
  - `findByBuyerId(buyerId)`: Fetch orders for a buyer.
  - `create(orderData)`: Insert a new order.
  - `update(id, orderData)`: Update an existing order.
  - `delete(id)`: Delete an order.

#### Controller Functions
- **OrderController**:
  - `getOrderById(req, res)`: Fetch an order by `id`.
  - `getOrdersByBuyerId(req, res)`: Fetch orders for a buyer.
  - `createOrder(req, res)`: Create a new order.
  - `updateOrder(req, res)`: Update an existing order.
  - `deleteOrder(req, res)`: Delete an order.

#### Router Endpoints
- `GET /api/orders/:id`: Fetch an order by `id`.
- `GET /api/orders/buyer/:buyerId`: Fetch orders for a buyer.
- `POST /api/orders`: Create a new order.
- `PUT /api/orders/:id`: Update an order.
- `DELETE /api/orders/:id`: Delete an order.

---

### Reviews & Ratings

#### Models
- **Reviews**:
  - `id`, `product_id`, `buyer_id`, `rating`, `review_text`, `created_at`

#### Repository Functions
- **ReviewRepository**:
  - `findByProductId(productId)`: Fetch reviews for a product.
  - `create(reviewData)`: Insert a new review.
  - `delete(id)`: Delete a review.

#### Controller Functions
- **ReviewController**:
  - `getReviewsByProductId(req, res)`: Fetch reviews for a product.
  - `createReview(req, res)`: Create a new review.
  - `deleteReview(req, res)`: Delete a review.

#### Router Endpoints
- `GET /api/reviews/product/:productId`: Fetch reviews for a product.
- `POST /api/reviews`: Create a new review.
- `DELETE /api/reviews/:id`: Delete a review.

---

## 4. CRM Functionality

### Farmer Management

#### Models
- **Farmers**:
  - `id`, `user_id`, `farm_name`, `location`, `total_deliveries`, `total_earnings`

#### Repository Functions
- **FarmerRepository**:
  - `findById(id)`: Fetch a farmer by `id`.
  - `create(farmerData)`: Insert a new farmer.
  - `update(id, farmerData)`: Update an existing farmer.
  - `delete(id)`: Delete a farmer.

#### Controller Functions
- **FarmerController**:
  - `getFarmerById(req, res)`: Fetch a farmer by `id`.
  - `createFarmer(req, res)`: Create a new farmer.
  - `updateFarmer(req, res)`: Update an existing farmer.
  - `deleteFarmer(req, res)`: Delete a farmer.

#### Router Endpoints
- `GET /api/farmers/:id`: Fetch a farmer by `id`.
- `POST /api/farmers`: Create a new farmer.
- `PUT /api/farmers/:id`: Update a farmer.
- `DELETE /api/farmers/:id`: Delete a farmer.

---

### Cooperative Management

#### Models
- **Cooperatives**:
  - `id`, `name`, `location`, `farmer_count`, `created_at`

#### Repository Functions
- **CooperativeRepository**:
  - `findById(id)`: Fetch a cooperative by `id`.
  - `findAll()`: Fetch all cooperatives.
  - `create(cooperativeData)`: Insert a new cooperative.
  - `update(id, cooperativeData)`: Update an existing cooperative.
  - `delete(id)`: Delete a cooperative.

#### Controller Functions
- **CooperativeController**:
  - `getCooperativeById(req, res)`: Fetch a cooperative by `id`.
  - `getAllCooperatives(req, res)`: Fetch all cooperatives.
  - `createCooperative(req, res)`: Create a new cooperative.
  - `updateCooperative(req, res)`: Update an existing cooperative.
  - `deleteCooperative(req, res)`: Delete a cooperative.

#### Router Endpoints
- `GET /api/cooperatives/:id`: Fetch a cooperative by `id`.
- `GET /api/cooperatives`: Fetch all cooperatives.
- `POST /api/cooperatives`: Create a new cooperative.
- `PUT /api/cooperatives/:id`: Update a cooperative.
- `DELETE /api/cooperatives/:id`: Delete a cooperative.

---

## 5. Traceability System

### Batch Tracking

#### Models
- **TraceabilityRecords**:
  - `id`, `batch_id`, `processing_steps`, `quality_metrics`, `created_at`

#### Repository Functions
- **TraceabilityRepository**:
  - `findByBatchId(batchId)`: Fetch traceability records for a batch.
  - `create(recordData)`: Insert a new traceability record.

#### Controller Functions
- **TraceabilityController**:
  - `getRecordsByBatchId(req, res)`: Fetch traceability records for a batch.
  - `createRecord(req, res)`: Create a new traceability record.

#### Router Endpoints
- `GET /api/traceability/batch/:batchId`: Fetch traceability records for a batch.
- `POST /api/traceability`: Create a new traceability record.

---

## 6. Analytics & Reporting

### Performance Metrics

#### Models
- **Analytics**:
  - `id`, `metric_name`, `metric_value`, `dimension`, `period`, `created_at`

#### Repository Functions
- **AnalyticsRepository**:
  - `findByDimension(dimension)`: Fetch analytics by dimension.
  - `create(metricData)`: Insert a new analytics record.

#### Controller Functions
- **AnalyticsController**:
  - `getMetricsByDimension(req, res)`: Fetch analytics by dimension.
  - `createMetric(req, res)`: Create a new analytics record.

#### Router Endpoints
- `GET /api/analytics/dimension/:dimension`: Fetch analytics by dimension.
- `POST /api/analytics`: Create a new analytics record.
