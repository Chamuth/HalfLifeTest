const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = new Schema({
  guestCount: {
    type: Number,
    required: true,
  },
  bookingType: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = Rate = mongoose.model("rates", RateSchema);
