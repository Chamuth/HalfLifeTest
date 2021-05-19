const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoomSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  propertyid: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: [{ key: String, value: String }],
});

module.exports = Room = mongoose.model("rooms", RoomSchema);
