# NICE Coffee Platform Models Overview

## 1. Authentication & User Management

### Users
- **Table Name**: `users`
- **Fields**:
  - `id`: UUID, Primary Key
  - `auth_id`: UUID, Supabase authentication ID, Unique
  - `email`: Text, Unique
  - `phone_number`: Text, Unique
  - `full_name`: Text, Not Null
  - `role`: Text, Not Null (e.g., farmer, cooperative_manager, etc.)
  - `created_at`: Timestamp, Default `NOW()`
  - `updated_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - None directly, but referenced by other models for role-based operations.

---

## 2. Cooperative Management & Collection

### Cooperatives
- **Table Name**: `cooperatives`
- **Fields**:
  - `id`: UUID, Primary Key
  - `name`: Text, Unique, Not Null
  - `location`: Text, Not Null
  - `farmer_count`: Integer, Not Null
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Referenced by `deliveries` and `batches`.

### Deliveries
- **Table Name**: `deliveries`
- **Fields**:
  - `id`: UUID, Primary Key
  - `cooperative_id`: UUID, Foreign Key to `cooperatives(id)`
  - `batch_id`: UUID, Foreign Key to `batches(id)`
  - `weight_kg`: Float, Not Null
  - `cherry_grade`: Text, Not Null
  - `delivery_date`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `cooperatives`.
  - Belongs to `batches`.

### Batches
- **Table Name**: `batches`
- **Fields**:
  - `id`: UUID, Primary Key
  - `cooperative_id`: UUID, Foreign Key to `cooperatives(id)`
  - `batch_code`: Text, Unique, Not Null
  - `grade`: Text, Not Null
  - `weight_kg`: Float, Not Null
  - `status`: Text, Default `pending`
  - `created_at`: Timestamp, Default `NOW()`
  - `updated_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `cooperatives`.
  - Referenced by `deliveries`.

---

## 3. Processing & Quality Control

### QualityReports
- **Table Name**: `quality_reports`
- **Fields**:
  - `id`: UUID, Primary Key
  - `batch_id`: UUID, Foreign Key to `batches(id)`
  - `grader_id`: UUID, Foreign Key to `users(id)`
  - `cupping_score`: Float, Not Null
  - `defects`: JSONB, Optional
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `batches`.
  - Belongs to `users` (graders).

---

## 4. Export Operations

### ExportOrders
- **Table Name**: `export_orders`
- **Fields**:
  - `id`: UUID, Primary Key
  - `buyer_id`: UUID, Foreign Key to `users(id)`
  - `batch_id`: UUID, Foreign Key to `batches(id)`
  - `destination`: Text, Not Null
  - `status`: Text, Default `draft`
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `users` (buyers).
  - Belongs to `batches`.

### Documents
- **Table Name**: `documents`
- **Fields**:
  - `id`: UUID, Primary Key
  - `export_id`: UUID, Foreign Key to `export_orders(id)`
  - `type`: Text, Not Null (e.g., certificate, invoice)
  - `url`: Text, Not Null
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `export_orders`.

---

## 5. Import Operations

### Shipments
- **Table Name**: `shipments`
- **Fields**:
  - `id`: UUID, Primary Key
  - `export_id`: UUID, Foreign Key to `export_orders(id)`
  - `status`: Text, Default `in_transit`
  - `tracking_number`: Text, Unique
  - `estimated_arrival`: Timestamp
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `export_orders`.

### WarehouseInventory
- **Table Name**: `warehouse_inventory`
- **Fields**:
  - `id`: UUID, Primary Key
  - `shipment_id`: UUID, Foreign Key to `shipments(id)`
  - `product_id`: UUID, Foreign Key to `products(id)`
  - `quantity`: Float, Not Null
  - `location`: Text, Not Null
  - `status`: Text, Default `available`
- **Relationships**:
  - Belongs to `shipments`.
  - Belongs to `products`.

---

## 6. E-commerce Features

### Products
- **Table Name**: `products`
- **Fields**:
  - `id`: UUID, Primary Key
  - `name`: Text, Not Null
  - `description`: Text
  - `price_per_kg`: Float, Not Null
  - `stock`: Float, Not Null
  - `grade`: Text
  - `origin`: Text
  - `cupping_score`: Float
  - `created_at`: Timestamp, Default `NOW()`
  - `updated_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Referenced by `warehouse_inventory`.

### Orders
- **Table Name**: `orders`
- **Fields**:
  - `id`: UUID, Primary Key
  - `buyer_id`: UUID, Foreign Key to `users(id)`
  - `product_id`: UUID, Foreign Key to `products(id)`
  - `quantity`: Float, Not Null
  - `total_price`: Float, Not Null
  - `status`: Text, Default `pending`
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `users` (buyers).
  - Belongs to `products`.

### Reviews
- **Table Name**: `reviews`
- **Fields**:
  - `id`: UUID, Primary Key
  - `product_id`: UUID, Foreign Key to `products(id)`
  - `buyer_id`: UUID, Foreign Key to `users(id)`
  - `rating`: Float, Not Null, (e.g., between 1 and 5)
  - `review_text`: Text
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `products`.
  - Belongs to `users` (buyers).

### Carts
- **Table Name**: `carts`
- **Fields**:
  - `id`: UUID, Primary Key
  - `user_id`: UUID, Foreign Key to `users(id)`, Unique
  - `created_at`: Timestamp, Default `NOW()`
  - `updated_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `users`.
  - Has many `cart_items`.

### CartItems
- **Table Name**: `cart_items`
- **Fields**:
  - `id`: UUID, Primary Key
  - `cart_id`: UUID, Foreign Key to `carts(id)`
  - `product_id`: UUID, Foreign Key to `products(id)`
  - `quantity`: Float, Not Null
  - `added_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `carts`.
  - Belongs to `products`.

### Wishlists
- **Table Name**: `wishlists`
- **Fields**:
  - `id`: UUID, Primary Key
  - `user_id`: UUID, Foreign Key to `users(id)`
  - `product_id`: UUID, Foreign Key to `products(id)`
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `users`.
  - Belongs to `products`.

### CheckoutDetails
- **Table Name**: `checkout_details`
- **Fields**:
  - `id`: UUID, Primary Key
  - `order_id`: UUID, Foreign Key to `orders(id)`, Unique
  - `shipping_address`: JSONB, Not Null
  - `billing_address`: JSONB
  - `delivery_method`: Text, Not Null
  - `contact_email`: Text, Not Null
  - `contact_phone`: Text
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `orders`.

### Payments
- **Table Name**: `payments`
- **Fields**:
  - `id`: UUID, Primary Key
  - `order_id`: UUID, Foreign Key to `orders(id)`
  - `amount`: Float, Not Null
  - `currency`: Text, Not Null (e.g., 'USD')
  - `status`: Text, Not Null (e.g., pending, completed, failed)
  - `payment_method`: Text, Not Null (e.g., stripe, wire_transfer)
  - `provider_payment_id`: Text, Unique (ID from payment provider like Stripe)
  - `created_at`: Timestamp, Default `NOW()`
  - `updated_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `orders`.

---

## 7. Traceability System

### TraceabilityRecords
- **Table Name**: `traceability_records`
- **Fields**:
  - `id`: UUID, Primary Key
  - `batch_id`: UUID, Foreign Key to `batches(id)`
  - `processing_steps`: JSONB
  - `quality_metrics`: JSONB
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `batches`.

### MediaAssets
- **Table Name**: `media_assets`
- **Fields**:
  - `id`: UUID, Primary Key
  - `batch_id`: UUID, Foreign Key to `batches(id)`
  - `type`: Text, Not Null (e.g., photo, video)
  - `url`: Text, Not Null
  - `uploaded_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - Belongs to `batches`.

---

## 8. Analytics & Reporting

### Analytics
- **Table Name**: `analytics`
- **Fields**:
  - `id`: UUID, Primary Key
  - `metric_name`: Text, Not Null
  - `metric_value`: Float, Not Null
  - `dimension`: Text (e.g., region, grade)
  - `period`: Text (e.g., daily, monthly)
  - `created_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - None.

### Reports
- **Table Name**: `reports`
- **Fields**:
  - `id`: UUID, Primary Key
  - `type`: Text, Not Null (e.g., earnings, quality)
  - `parameters`: JSONB
  - `data`: JSONB
  - `generated_at`: Timestamp, Default `NOW()`
- **Relationships**:
  - None.
