function PaymentMethod(i) {
  switch (i) {
    case "1":
      return "CARD_ONLINE";
    case "2":
      return "CARD_LOCATION";
    case "3":
      return "CASH";
    default:
      return "CASH";
  }
}

function BookingType(i) {
  switch (i) {
    case "1":
      return "BED_BREAKFAST";
    case "2":
      return "HALF_BOARD";
    case "3":
      return "FULL_BOARD";
    default:
      return "BED_BREAKFAST";
  }
}

module.exports = {
  PaymentMethod,
  BookingType,
};
