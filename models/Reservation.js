const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReservationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
  },
  services: {
    reserveParking: Boolean,
    roomAmenities: Boolean,
    specialNote: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
});

module.exports = Reservation = mongoose.model(
  "reservations",
  ReservationSchema
);
