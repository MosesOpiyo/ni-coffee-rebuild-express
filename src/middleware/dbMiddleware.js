const pool = require('../config/database');
const UserModel = require('../endPoints/auth/models/User/authModels');
const BatchModel = require('../endPoints/supplyChainCore/cooperativeManagement&Collection/models/Batches/batchModel');
const CooperativeModel = require('../endPoints/supplyChainCore/cooperativeManagement&Collection/models/Cooperatives/cooperativeModel');
const DeliveryModel = require('../endPoints/supplyChainCore/cooperativeManagement&Collection/models/Deliveries/deliveryModel');

const QualityReportModel = require('../endPoints/supplyChainCore/processingAndQualityControl/models/processingModels');

const DocumentModel = require('../endPoints/supplyChainCore/exportOperations/models/Documents/documentModel');
const ExportOrderModel = require('../endPoints/supplyChainCore/exportOperations/models/ExportOrders/exportOrderModel');

const ShipmentModel = require('../endPoints/supplyChainCore/importOperations/models/shipments/shipmentModel');
const WarehouseInventoryModel = require('../endPoints/supplyChainCore/importOperations/models/WarehouseInventory/warehouseInventoryModel');

const ProductModel = require('../endPoints/E-commerceFeatures/productManagement/models/productModel');
const ReviewModel = require('../endPoints/E-commerceFeatures/reviews&Ratings/models/Reviews/reviewsModel');
const OrderModel = require('../endPoints/E-commerceFeatures/shoppingExperience/models/Orders/ordersModel');

const CartModel = require('../endPoints/E-commerceFeatures/shoppingExperience/models/Cart/cartModel');
const CartItemModel = require('../endPoints/E-commerceFeatures/shoppingExperience/models/CartItems/cartItemModel');
const WishListModel = require('../endPoints/E-commerceFeatures/shoppingExperience/models/Wishlist/wishListModel');
const WishListItemModel = require('../endPoints/E-commerceFeatures/shoppingExperience/models/WishlistItems/wishListItemModel');
const PaymentModel = require('../endPoints/E-commerceFeatures/shoppingExperience/models/Payments/paymentModel');

const PricingModel = require('../endPoints/TripsAndEvents/travelLogistics/models/Pricing/pricingModel');
const TripModel = require('../endPoints/TripsAndEvents/travelLogistics/models/Trips/tripsModel');
const HotelModel = require('../endPoints/TripsAndEvents/tripManagement/models/Hotels/hotelModel');
const OverLandTravelModel = require('../endPoints/TripsAndEvents/tripManagement/models/OverLandTravels/overLandTravelModel');
const BookingModel = require('../endPoints/TripsAndEvents/userEngagement/models/Bookings/bookingModel');


const models = [
  UserModel,
  CooperativeModel,
  BatchModel,
  DeliveryModel,
  QualityReportModel,
  ExportOrderModel,
  ProductModel,
  ReviewModel,
  OrderModel,
  CartModel,
  CartItemModel,
  WishListModel,
  WishListItemModel,
  PaymentModel,
  DocumentModel,
  ShipmentModel,
  WarehouseInventoryModel,
  TripModel,
  PricingModel,
  OverLandTravelModel,
  HotelModel,
  BookingModel

];

const initializeDatabase = async() => {
  console.log("🧱 Initializing database...");

  for (const model of models) {
    const query = model.getCreateTableQuery();
    try {
      await pool.query(query);
      console.log(`✅ Table '${model.tableName}' ready.`);
    } catch (err) {
      console.error(`❌ Error creating table '${model.tableName}':`, err.message);
    }
  }

  console.log("✅ Database initialized successfully.");
};

module.exports = initializeDatabase;