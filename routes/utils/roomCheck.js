const Reservation = require("../../models/Reservation");

module.exports = roomCheck = (roomid) => {
  return new Promise((res, rej) => {
    Reservation.find({
      roomid,
    })
      .then((reservations) => {
        if (reservations) {
          var available = true;

          for (var i = 0; i < reservations.length; i++) {
            reservation = reservations[i];

            if (
              Date.now() > Date.parse(reservation.start) &&
              Date.now() < Date.parse(reservation.end)
            ) {
              available = false;
              break;
            }
          }

          res({ available });
        } else {
          res({ available: false });
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
};
