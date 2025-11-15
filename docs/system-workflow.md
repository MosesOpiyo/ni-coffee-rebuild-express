# NICE Coffee Supply Chain System Workflow

## 0. User Authentication & Access Control
- User registration with role-based access
- Authentication methods:
  - Farmers: Phone OTP
  - Cooperative Managers: Email + Password
  - Quality Officers: Email/Google OAuth
  - Exporters: Email + MFA
  - Importers: Email/Google OAuth
  - Admins: Email + MFA + IP Whitelist

## 1. Coffee Collection, Processing, and Grading

### Cooperative Collection & Aggregation
- Farmers deliver coffee cherries to cooperatives.
- Cooperatives create delivery records with unique batch IDs.
- Deliveries are aggregated into cooperative-managed batches.
- Payment notifications are sent via SMS to farmers.
- Integration Point: Delivery data feeds into product attributes and batch formation affects potential marketplace listings.

### Wet Processing (If not processed)
- Cooperatives log processing steps with timestamps.
- Quality metrics are recorded during wet processing.
- Integration Point: Processing method and quality data enhance product listings.

### Dry Milling & Grading (If not milled and graded)
- Coffee is graded and sorted by cooperatives.
- Cupping scores are recorded for each batch.
- Integration Point: Grades and cupping scores directly affect marketplace pricing

## 2. Export Preparation → E-commerce Entry Point
- Exporter marks batches as "Available for Sale"
- System automatically:
  - Creates product listings
  - Calculates prices
  - Sets inventory levels
  - Generates product descriptions from batch data
- CRM Integration:
  - Export planning tools
  - Document management
  - Buyer relationship tracking
  - Communication logs

## 3. Marketplace Operations
- Buyers browse available lots
- Features include:
  - Advanced filtering (origin, grade, score)
  - Real-time inventory
  - Traceability data
  - Reviews and ratings
- Additional CRM Features:
  - Buyer preference tracking
  - Personalized recommendations
  - Saved searches
  - Price alerts
  - Custom notifications

## 4. Order Processing
- Buyer places order
- System:
  - Validates inventory
  - Processes payment
  - Reserves stock
  - Triggers export documentation
  - Updates batch status
- CRM Enhancements:
  - Order history analytics
  - Buyer behavior tracking
  - Automated follow-ups
  - Reorder suggestions

## 5. Shipment & Logistics
- Order triggers shipping process
- Buyers track shipments
- Integration Point: Shipping updates appear in buyer dashboard
- Enhanced Tracking:
  - Real-time location updates
  - Automated notifications
  - Document validation
  - Customs clearance tracking

## 6. Import & Clearance
- Import documentation processed
- Warehouse receives coffee
- Integration Point: Stock becomes available in US marketplace
- CRM Features:
  - Document management
  - Compliance tracking
  - Warehouse coordination
  - Quality verification

## 7. Analytics & Feedback
- System tracks:
  - Sales performance
  - Quality trends
  - Buyer preferences
  - Revenue distribution
  - Farmer earnings
- Enhanced Analytics:
  - User engagement metrics
  - Communication effectiveness
  - Training impact assessment
  - Quality improvement tracking

## 8. CRM Operations

### Farmer CRM
- Farm performance dashboard
- Delivery management
- Payment tracking
- Training schedule
- Quality feedback
- Direct messaging

### Cooperative CRM
- Farmer management
- Batch aggregation
- Quality control
- Payment processing
- Training coordination
- Communication hub

### Quality Officer CRM
- Processing queue
- Quality assessments
- Training delivery
- Feedback management
- Documentation

### Exporter CRM
- Batch management
- Document preparation
- Logistics coordination
- Buyer relationships
- Market analytics

### Importer CRM
- Order management
- Quality verification
- Inventory tracking
- Supplier relationships
- Distribution planning

## Data Flow Example
1. Farmer delivers coffee → Batch ID: KF-2023-00123
2. Processing → Quality Score: 87
3. Grading → Grade: AA
4. Export → Listed at $6.50/kg
5. Marketplace → Product ID: PRD-00123
6. Order → Order ID: ORD-00456
7. Shipping → Tracking ID: SHIP-00789
8. Import → Import ID: IMP-00234
9. Buyer Feedback → Review ID: REV-00567
10. CRM → Training ID: TRN-00123
11. Quality Feedback → QF-00456
12. Communication → MSG-00789

## Revenue & Value Flow
1. Buyer payment received
2. Platform fee deducted
3. Exporter payment processed
4. Cooperative share distributed
5. Farmer payments reconciled
6. Training investments allocated
7. Quality bonuses distributed

## System Integration Points
1. Authentication & Authorization
   - Supabase JWT verification
   - Role-based access control
   - MFA management

2. Database Operations
   - PostgreSQL for transactional data
   - Real-time updates
   - Data consistency

3. External Services
   - SMS notifications
   - Payment gateways
   - Shipping APIs
   - Document generation

4. CRM Features
   - Communication tools
   - Relationship tracking
   - Training management
   - Performance analytics

This integrated workflow ensures:
- Complete traceability
- Fair price distribution
- Quality incentivization
- Market transparency
- Strong relationships
- Continuous improvement
- Efficient communication
