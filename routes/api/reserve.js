const express = require("express");
const router = express.Router();

// Load models
const Property = require("../../models/Property");
const Room = require("../../models/Room");
const Reservation = require("../../models/Reservation");

router.get("/api/properties", (req, res) => {
  Property.find({})
    .then((val) => {
      res.send(
        JSON.stringifY({
          error: false,
          value: val,
        })
      );
    })
    .catch((err) => {
      res.send(
        JSON.stringifY({
          error: true,
          value: err,
        })
      );
    });
});

router.get("/api/property/:propid/rooms", (req, res) => {
  Room.find({ propertyid: req.params.propid })
    .then((val) => {
      res.send(
        JSON.stringifY({
          error: false,
          value: val,
        })
      );
    })
    .catch((err) => {
      res.send(
        JSON.stringifY({
          error: true,
          value: err,
        })
      );
    });
});

router.get("/api/property/:propid/availability", (req, res) => {});

router.get("/api/room/:roomid/availability", (req, res) => {});

router.post("/api/reserve", (req, res) => {});
