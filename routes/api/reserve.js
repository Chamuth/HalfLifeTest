const express = require("express");
const router = express.Router();

const validateReserveInput = require("../../validation/reserve");
const availabilityCheck = require("../../validation/availabilityCheck");
const processReservation = require("./../utils/reservationProcessor");
const roomCheck = require("./../utils/roomCheck");

// Load models
const Property = require("../../models/Property");
const Room = require("../../models/Room");
const Reservation = require("../../models/Reservation");
const Rate = require("../../models/Rate");

const {
  reservationCreatedEmail,
  reservationCancelledEmail,
} = require("./../services/emailService");

router.get("/properties", (req, res) => {
  Property.find({})
    .then((val) => {
      res.send(
        JSON.stringify({
          error: false,
          value: val,
        })
      );
    })
    .catch((err) => {
      res.send(
        JSON.stringify({
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
        JSON.stringify({
          error: false,
          value: val,
        })
      );
    })
    .catch((err) => {
      res.send(
        JSON.stringify({
          error: true,
          value: err,
        })
      );
    });
});

router.get("/property/:propid/availability", (req, res) => {});

router.get("/room/:roomid/availability", (req, res) => {
  // availability at current time!
  var roomid = req.params.roomid;
  roomCheck(roomid).then((value) => {
    res.send(
      JSON.stringify({
        available: value.available,
      })
    );
  });
});

router.get("/reservations/:userid", (req, res) => {
  Reservation.find({
    userid: req.params.userid,
  }).then((reservations) => {
    if (reservations) {
      res.send(
        JSON.stringify({
          error: false,
          value: reservations,
        })
      );
    } else {
      res.send(
        JSON.stringify({
          error: true,
        })
      );
    }
  });
});

router.post("/reserve", (req, res) => {
  const { errors, isValid } = validateReserveInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // create reservation
  processReservation(req.body).then((processed) => {
    var reservation = new Reservation(processed);

    reservation.save().then((v) => {
      console.log(v);

      // Reservation succesful, notify through email
      reservationCreatedEmail(processed);
    });

    res.send(JSON.stringify(processed));
  });
});

router.post("/cost", (req, res) => {
  const { errors, isValid } = validateReserveInput(req.body, false);
  let err = false;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (isValid) {
    processReservation(req.body).then(
      ({ guestCount, type, duration, start, end, roomid }) => {
        availabilityCheck(start, end, roomid).then((availability) => {
          if (availability.available) {
            Rate.find({
              guestCount,
              bookingType: type,
            }).then((rate) => {
              if (rate) {
                if (rate.length > 0) {
                  res.send(
                    JSON.stringify({
                      error: false,
                      availability: availability,
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
          } else {
            res.send(
              JSON.stringify({
                error: true,
                availability: availability,
              })
            );
          }
        });
      }
    );
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

router.post("/cancel", (req, res) => {
  var reservationid = req.body.reservationid;
  var userid = req.body.userid;

  // consider they paid the cancellation fee
  if (reservationid && userid) {
    Reservation.findOneAndUpdate(
      { _id: reservationid },
      {
        cancelled: true,
      },
      {},
      (err, doc) => {
        if (err) {
          res.send(
            JSON.stringify({
              error: true,
              err: err,
            })
          );
        } else {
          // send reservation cancelled email
          reservationCancelledEmail(userid);

          res.send(
            JSON.stringify({
              error: false,
            })
          );
        }
      }
    );
  } else {
    return res.send(
      JSON.stringifY({
        error: true,
        message: "Reservation ID or User ID not provided",
      })
    );
  }
});

router.post("/cancelcost", (req, res) => {
  var reservationid = req.body.reservationid;

  if (reservationid) {
    Reservation.findOne({ _id: reservationid }).then((doc) => {
      if (!doc) {
        res.send(
          JSON.stringify({
            error: true,
          })
        );
      } else {
        let hours = Math.floor(
          (new Date(doc.start) - Date.now()) / 1000 / 60 / 60
        );
        let cost = 0;

        // instructions not clear so, just 24 hours or less
        if (hours < 24) {
          // 20% of initial price
          cost = (20 / 100) * doc.originalPrice;
        }

        res.send(
          JSON.stringify({
            error: false,
            cost: cost,
          })
        );
      }
    });
  }
});

module.exports = router;
