# NICE Coffee Platform Pages Structure

## Authentication Pages
```
/auth
├── login                  # Main login page
├── register              # Registration page with role-based forms
├── forgot-password       # Password recovery
├── verify-account        # Email/Phone verification
├── mfa-setup             # Multi-factor authentication setup
└── verify-mfa           # MFA verification page
```

## Farmer Portal Pages
```
/farmer
├── dashboard             # Overview of deliveries and payments
├── deliveries
│   ├── history          # Past deliveries list
│   ├── new              # Record new delivery
│   └── [id]             # Individual delivery details
├── payments
│   ├── history          # Payment history
│   └── pending          # Pending payments
├── training
│   ├── schedule         # Upcoming training sessions
│   ├── materials        # Training resources
│   └── certificates     # Completed trainings
├── quality
│   ├── feedback         # Quality improvement suggestions
│   └── metrics          # Performance metrics
└── profile              # Personal and bank details
```

## Cooperative Pages
```
/cooperative
├── dashboard            # Daily intake summary and stats
├── farmers
│   ├── list            # Registered farmers
│   └── [id]            # Individual farmer management
├── batches
│   ├── active          # Current processing batches
│   ├── completed       # Processed batches
│   └── [id]            # Batch details and tracking
├── payments
│   ├── process         # Process farmer payments
│   └── history         # Payment records
└── reports             # Cooperative performance reports
```

## Processing & Quality Control Pages
```
/processing
├── dashboard           # Processing queue and status
├── batches
│   ├── incoming       # New batches for processing
│   ├── active        # Batches in processing
│   └── [id]
│       ├── details   # Batch processing details
│       ├── quality   # Quality control forms
│       └── timeline  # Processing timeline
├── grading
│   ├── pending      # Batches pending grading
│   └── completed    # Graded batches
└── inventory        # Processed coffee inventory
```

## Export Management Pages
```
/export
├── dashboard          # Export operations overview
├── inventory
│   ├── available     # Coffee ready for export
│   └── reserved      # Reserved for orders
├── orders
│   ├── new          # Create export order
│   ├── active       # Current orders
│   └── [id]         # Order details and documents
├── shipping
│   ├── pending      # Shipments to arrange
│   ├── active       # Active shipments
│   └── [id]         # Shipment tracking and docs
└── documents        # Export documentation center
```

## US Import & Warehouse Pages
```
/import
├── dashboard         # Import operations overview
├── shipments
│   ├── incoming     # Expected arrivals
│   ├── customs      # Customs clearance
│   └── [id]         # Shipment details
├── warehouse
│   ├── inventory    # Current stock
│   ├── receiving    # Receive shipments
│   └── releases     # Stock releases
└── documents        # Import documentation
```

## Marketplace (E-commerce) Pages
```
/marketplace
├── catalog           # Product listing with filters
├── products
│   └── [id]         # Product details page
├── cart             # Shopping cart
├── checkout         # Checkout process
├── orders
│   ├── active      # Current orders
│   ├── history     # Past orders
│   └── [id]        # Order details
└── account
    ├── profile     # Buyer profile
    ├── addresses   # Shipping addresses
    └── payment     # Payment methods
```

## Traceability Pages
```
/trace
├── [batch_id]       # Public batch tracing page
├── story           # Coffee origin story
├── journey         # Processing journey
└── verification    # Certificate verification
```

## Analytics & Reporting Pages
```
/analytics
├── dashboard          # Main analytics dashboard
├── sales             # Sales analytics
├── quality           # Quality trends
├── farmers           # Farmer performance
├── exports           # Export analytics
├── training          # Training effectiveness
├── engagement        # User engagement metrics
├── relationships     # CRM performance
└── reports           # Custom report generation
```

## Admin Portal Pages
```
/admin
├── dashboard       # System overview
├── users          # User management
├── roles          # Role management
├── settings       # System settings
└── logs          # System logs and monitoring
```

## Training & Quality Management
```
/training
├── dashboard            # Training program overview
├── sessions
│   ├── schedule        # Training calendar
│   ├── new            # Create training session
│   └── [id]           # Session details and materials
├── materials
│   ├── upload         # Add training content
│   └── library        # Resource library
└── assessments        # Training evaluations
```

## CRM Features
```
/crm
├── communication
│   ├── inbox          # Messages and notifications
│   ├── announcements  # System announcements
│   └── chat          # Direct messaging
├── relationships
│   ├── farmers       # Farmer relationship management
│   ├── buyers        # Buyer relationship management
│   └── suppliers     # Supplier relationship management
├── feedback
│   ├── quality       # Quality feedback management
│   ├── training     # Training feedback
│   └── surveys      # Custom surveys
└── reporting
    ├── engagement    # User engagement metrics
    ├── satisfaction  # Satisfaction scores
    └── performance   # Performance analytics
```

## Communication Center
```
/communications
├── messages          # Direct messaging
├── notifications     # System notifications
├── announcements     # Platform announcements
└── broadcasts        # Mass communication
```

## Document Management
```
/documents
├── templates         # Document templates
├── certificates     # Certifications
├── training         # Training materials
├── exports          # Export documentation
└── contracts        # Legal documents
```

## Common Components for All Pages
```
components/
├── Layout         # Page layout with navigation
├── Header        # Role-specific header
├── Sidebar       # Role-based navigation
├── Notifications # Real-time notifications
└── Footer        # Common footer
```

## Shared Features
- Role-based navigation
- Real-time notifications
- Document previews
- Data export options
- Multi-language support
- Dark/Light mode
- Mobile responsiveness
- File uploads
- Chat functionality
- Calendar integration
- Report generation
