// Checks if there are other reservation between this start and end datetimes
const Moment = require("moment");
const MomentRange = require("moment-range");

const Reservation = require("../models/Reservation");

const moment = MomentRange.extendMoment(Moment);

const timeIntersectCheck = (start, end, rstart, rend) => {
  const range1 = moment.range(start, end);
  const range2 = moment.range(rstart, rend);
  return range1.overlaps(range2);
};

module.exports = function availabilityCheck(start, end, roomid) {
  start = new Date(start);
  end = new Date(end);

  return new Promise((res, rej) => {
    Reservation.find({ roomid }).then((reservations) => {
      if (reservations.length > 0) {
        reservations.forEach((reservation) => {
          let rstart = new Date(reservation.start);
          let rend = new Date(reservation.end);

          if (timeIntersectCheck(start, end, rstart, rend)) {
            res({
              available: false,
              start: start,
              end: end,
            });
          }
        });

        res({
          available: true,
          start: start,
          end: end,
        });
      } else {
        res({
          available: true,
          start: start,
          end: end,
        });
      }
    });
  });
};
