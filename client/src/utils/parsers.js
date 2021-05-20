export const dateParse = (str) => {
  return new Date(str).toLocaleString();
};

export const boolParse = (bool) => {
  return bool ? "Yes" : "No";
};

export const emptyTest = (str) => {
  return str ? str : "No";
};

export const PaymentMethod = (i) => {
  switch (i) {
    case 1:
      return "Online Card";
    case 2:
      return "Card at Location";
    case 3:
      return "Cash";
    default:
      return "Cash";
  }
};

export const BookingType = (i) => {
  switch (i) {
    case 1:
      return "Bed & Breakfast";
    case 2:
      return "Half Board";
    case 3:
      return "Full Board";
    default:
      return "Bed & Breakfast";
  }
};

export const GuestCount = (i) => {
  switch (i) {
    case 1:
      return "1 (Single)";
    case 2:
      return "2 (Double)";
    case 3:
      return "3 (Triple)";
    default:
      return "1 (Single)";
  }
};
