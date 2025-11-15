const TripModel = require('../../../endPoints/TripsAndEvents/travelLogistics/models/Trips/tripsModel')
const PricingModel = require('../../../endPoints/TripsAndEvents/travelLogistics/models/Pricing/pricingModel')
const HotelModel = require('../../../endPoints/TripsAndEvents/tripManagement/models/Hotels/hotelModel')
const OverLandTravelModel = require('../../../endPoints/TripsAndEvents/tripManagement/models/OverLandTravels/overLandTravelModel')
const BookingModel = require('../../../endPoints/TripsAndEvents/userEngagement/models/Bookings/bookingModel')

const { initDb, create, findAll, findById, update, remove } = require('../../base/baseTest');

beforeAll(async () => {
    const tablesSql = [
        TripModel.getCreateTableQuery(),
        PricingModel.getCreateTableQuery(),
        HotelModel.getCreateTableQuery(),
        OverLandTravelModel.getCreateTableQuery(),
        BookingModel.getCreateTableQuery(),
    ]
    .map(sql => sql.trim().replace(/};?$/, ';'))
    .join('\n');
  await initDb(tablesSql);
});

