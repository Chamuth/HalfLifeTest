const Validator = require("validator");
const { PaymentMethod } = require("./enums");

module.exports = processReservation = (body) => {
  // 1300H to 1100H is a single night

  let reserve_start = new Date(body.reserveDate);
  let reserve_duration = parseInt(body.reserveDuration);

  // set time
  if (Validator.isEmpty(body.reserveTime)) {
    // arrival time is not given so day starts at 1300H or that day
    reserve_start = new Date(
      reserve_start.getFullYear(),
      reserve_start.getMonth(),
      reserve_start.getDate(),
      13,
      0,
      0
    );
  } else {
    parts = body.reserveTime.match(/(\d+)\:(\d+) (\w+)/);
    var hours = /am/i.test(parts[3])
      ? parseInt(parts[1], 10)
      : parseInt(parts[1], 10) + 12;
    var minutes = parseInt(parts[2], 10);

    // If the user is arriving before 11 it counts for the first day as another night
    if (hours < 11) {
      reserve_duration--;
    }

    reserve_start.setHours(hours);
    reserve_start.setMinutes(minutes);
  }

  let reserve_end = new Date(reserve_start.getTime());
  reserve_end.setDate(reserve_start.getDate() + reserve_duration);

  // Set end time to 1100H
  reserve_end = new Date(
    reserve_end.getFullYear(),
    reserve_end.getMonth(),
    reserve_end.getDate(),
    11,
    0,
    0
  );

  const paid = PaymentMethod(body.paymentMethod) === "CARD_ONLINE";

  return {
    userid: body.id,
    roomid: body.roomid,
    name: body.name,
    start: reserve_start,
    end: reserve_end,
    type: parseInt(body.reserveType),
    guestCount: parseInt(body.guestCount),
    services: {
      reserveParking: body.reserveParking === "on",
      roomAmenities: body.reserveRoomAmenities === "on",
      specialNotes: body._specialNotes,
    },
    paymentMethod: parseInt(body.paymentMethod),
    paid,
    duration: parseInt(body.reserveDuration),
  };
};
