const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReservationSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  roomid: {
    type: String,
    required: true,
  },
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
    specialNotes: String,
  },
  paymentMethod: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  cancelled: {
    type: Boolean,
    required: true,
  },
});

module.exports = Reservation = mongoose.model(
  "reservations",
  ReservationSchema
);
