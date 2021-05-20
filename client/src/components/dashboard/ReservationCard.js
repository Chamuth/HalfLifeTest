import React from "react";
import "./ReservationCard.scss";

import {
  dateParse,
  BookingType,
  GuestCount,
  boolParse,
  emptyTest,
  PaymentMethod,
} from "./../../utils/parsers";

const ReservationCard = ({ reservation, onCancel }) => {
  return (
    <tr className={reservation.cancelled ? "cancelled" : ""}>
      <td>{reservation.roomid}</td>
      <td>{dateParse(reservation.start)}</td>
      <td>{dateParse(reservation.end)}</td>
      <td>{BookingType(reservation.type)}</td>
      <td>{GuestCount(reservation.guestCount)}</td>
      <td>{boolParse(reservation.reserveParking)}</td>
      <td>{boolParse(reservation.roomAmenities)}</td>
      <td>{emptyTest(reservation.specialNotes)}</td>
      <td>{PaymentMethod(reservation.paymentMethod)}</td>
      <td>{boolParse(reservation.paid)}</td>
      {reservation.cancelled && (
        <td>
          <a class="waves-effect disabled rounded waves-dark btn-small red">
            Reservation Cancelled
          </a>
        </td>
      )}
      {!reservation.cancelled && (
        <td>
          <a
            class="waves-effect rounded waves-dark btn-small red"
            onClick={() => onCancel(reservation.id)}
          >
            Cancel Reservation
          </a>
        </td>
      )}
    </tr>
  );
};

export default ReservationCard;
