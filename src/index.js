const express = require('express');
const cors = require('cors');
const http = require('http');
const pino = require('pino')

const authRouter = require('./endPoints/auth/routes/authRoutes');
const batchRouter = require('./endPoints/supplyChainCore/cooperativeManagement&Collection/routes/batchRoutes');
const cooperativeRouter = require('./endPoints/supplyChainCore/cooperativeManagement&Collection/routes/cooperativeRoutes');
const deliveryRouter = require('./endPoints/supplyChainCore/cooperativeManagement&Collection/routes/deliveryRoutes');

const qualityReportsRouter = require('./endPoints/supplyChainCore/processingAndQualityControl/routes/qualityReportsRoutes');

const documentRouter = require('./endPoints/supplyChainCore/exportOperations/routes/documentRouter');
const exportOrderRouter = require('./endPoints/supplyChainCore/exportOperations/routes/exportOrderRouter');

const ShipmentRouter = require('./endPoints/supplyChainCore/importOperations/routes/shipmentRouters');
const WarehouseInventoryRouter = require('./endPoints/supplyChainCore/importOperations/routes/warehouseInventoryRouters');
const ContractRouter = require('./endPoints/supplyChainCore/importOperations/routes/contractRouters');

const ProductRouter = require('./endPoints/E-commerceFeatures/productManagement/routes/productRouter');
const PriceRouter = require('./endPoints/E-commerceFeatures/productManagement/routes/priceRouter')
const ReviewRouter = require('./endPoints/E-commerceFeatures/reviews&Ratings/routes/reviewRouter');

const CartRouter = require('./endPoints/E-commerceFeatures/shoppingExperience/routes/cartRoutes');
const CartItemRouter = require('./endPoints/E-commerceFeatures/shoppingExperience/routes/cartItemRoutes');
const OrderRouter = require('./endPoints/E-commerceFeatures/shoppingExperience/routes/orderRoutes');
const wishListRouter = require('./endPoints/E-commerceFeatures/shoppingExperience/routes/wishListRoutes');
const wishListItemRouter = require('./endPoints/E-commerceFeatures/shoppingExperience/routes/wishlistItemRoutes');
const PaymentRouter = require('./endPoints/E-commerceFeatures/shoppingExperience/routes/paymentRoutes')

const PricingRouter = require('./endPoints/TripsAndEvents/travelLogistics/routes/pricingRoutes');
const TripRouter = require('./endPoints/TripsAndEvents/travelLogistics/routes/tripRoutes');

const HotelRouter = require('./endPoints/TripsAndEvents/tripManagement/routes/hotelRoutes');
const OverlandTravelRouter = require('./endPoints/TripsAndEvents/tripManagement/routes/overLandTravelRoutes');

const BookingRouter = require('./endPoints/TripsAndEvents/userEngagement/routes/bookingRoutes')

const initializeDatabase  = require('./middleware/dbMiddleware');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);


// Middleware
app.use(cors());
app.use(express.json());

//Initialize Database
initializeDatabase();

// Routes
app.use('/api/auth', authRouter);

// Cooperative Management & Collection Routes
app.use('/api/batches', batchRouter);
app.use('/api/cooperatives', cooperativeRouter);
app.use('/api/deliveries', deliveryRouter);

//processing and Quality Control Routes
app.use('/api/quality-reports', qualityReportsRouter);

// Export Operations Routes
app.use('/api/documents', documentRouter);
app.use('/api/export-orders', exportOrderRouter);

// Import Operations Routes
app.use('/api/shipments', ShipmentRouter);
app.use('/api/warehouse-inventory', WarehouseInventoryRouter);
app.use('/api/contracts', ContractRouter);

//Product Management
app.use('/api/products',ProductRouter)
app.use('/api/prices',PriceRouter)
app.use('/api/product/reviews', ReviewRouter)

//Shopiing Experiences
app.use('/api/shopping-experience/cart', CartRouter);
app.use('/api/shopping-experience/cart-items', CartItemRouter);
app.use('/api/shopping-experience/orders', OrderRouter);
app.use('/api/shopping-experience/wishlists', wishListRouter);
app.use('/api/shopping-experience/wishlist-items', wishListItemRouter);
app.use('/api/shopping-experience/payment', PaymentRouter);

//Travel Logistics
app.use('/api/trips-&-events/travel-logistics/pricing', PricingRouter)
app.use('/api/trips-&-events/travel-logistics/trips', TripRouter)

//Trip management
app.use('/api/trips-&-events/trip-management/hotels', HotelRouter)
app.use('/api/trips-&-events/trip-management/over-land-travel', OverlandTravelRouter)

//User Engagement
app.use('/api/trips-&-events/user-engagement/booking', BookingRouter)


server.listen(port)