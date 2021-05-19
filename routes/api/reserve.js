const express = require("express");
const router = express.Router();

const validateReserveInput = require("../../validation/reserve");
const processReservation = require("./../utils/reservationProcessor");

// Load models
const Property = require("../../models/Property");
const Room = require("../../models/Room");
const Reservation = require("../../models/Reservation");

router.get("/properties", (req, res) => {
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

router.get("/property/:propid/rooms", (req, res) => {
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

router.get("/property/:propid/availability", (req, res) => {});

router.get("/room/:roomid/availability", (req, res) => {});

router.post("/reserve", (req, res) => {
  const { errors, isValid } = validateReserveInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // create reservation
  // var reservation = new Reservation();

  res.send(JSON.stringify(processReservation(req.body)));
});

module.exports = router;
