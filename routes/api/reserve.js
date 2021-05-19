const express = require("express");
const router = express.Router();

const validateReserveInput = require("../../validation/reserve");
const processReservation = require("./../utils/reservationProcessor");

// Load models
const Property = require("../../models/Property");
const Room = require("../../models/Room");
const Reservation = require("../../models/Reservation");
const Rate = require("../../models/Rate");

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
  var reservation = new Reservation(processReservation(req.body));
  reservation.save().then((v) => {
    console.log(v);
  });

  res.send(JSON.stringify(processReservation(req.body)));
});

router.post("/cost", (req, res) => {
  const { errors, isValid } = validateReserveInput(req.body, false);
  let err = false;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  console.log(isValid);

  if (isValid) {
    var { guestCount, type, duration } = processReservation(req.body);

    Rate.find({
      guestCount,
      bookingType: type,
    }).then((rate) => {
      if (rate) {
        if (rate.length > 0) {
          res.send(
            JSON.stringify({
              error: false,
              cost: {
                price: formatter.format(rate[0].price * duration),
                vat: formatter.format(4.99),
              },
            })
          );
        } else {
          err = true;
        }
      } else {
        err = true;
      }
    });
  }

  if (err) {
    res.send(
      JSON.stringify({
        error: true,
        cost: {
          price: "$...",
          vat: "$...",
        },
      })
    );
  }
});

module.exports = router;
