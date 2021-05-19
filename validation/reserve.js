const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateReserveInput(data, costonly) {
  if (!costonly) costonly = false;
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.roomid = !isEmpty(data.roomid) ? data.roomid : "";
  data.id = !isEmpty(data.id) ? data.id : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.reserveDate = !isEmpty(data.reserveDate) ? data.reserveDate : "";
  data.reserveDuration = !isEmpty(data.reserveDuration)
    ? data.reserveDuration
    : "";
  data.reserveType = !isEmpty(data.reserveType) ? data.reserveType : "";
  data.guestCount = !isEmpty(data.guestCount) ? data.guestCount : "";
  data.paymentMethod = !isEmpty(data.paymentMethod) ? data.paymentMethod : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Password checks
  if (Validator.isEmpty(data.id)) {
    errors.id = "User Id field is required";
  }

  if (Validator.isEmpty(data.reserveDate)) {
    errors.reserveDate = "Reservation date is required";
  } else if (!Validator.isAfter(data.reserveDate)) {
    errors.reserveDate = "Reservation date must be in the future";
  }

  if (!Validator.isInt(data.reserveType)) {
    errors.reserveType = "Reservation Type must be selected";
  }

  if (!Validator.isInt(data.reserveDuration)) {
    errors.reserveDuration = "Reservation duration must be given";
  }

  if (!Validator.isInt(data.guestCount)) {
    errors.guestCount = "Guest count must be given";
  }

  if (!Validator.isInt(data.paymentMethod) || costonly) {
    errors.paymentMethod = "A payment method must be selected to reserve";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
