import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ReservationCard from "./ReservationCard";
import {
  retrieveReservations,
  cancelReservationAction,
} from "../../actions/reserveActions";
import Footer from "./../footer/Footer";
import "./Dashboard.scss";

import {
  dateParse,
  BookingType,
  GuestCount,
  boolParse,
  emptyTest,
  PaymentMethod,
} from "./../../utils/parsers";

const Dashboard = ({ auth }) => {
  const [reservations, setReservations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [cancelReservation, setCancelReservation] = useState(null);

  useEffect(() => {
    const { user } = auth;

    retrieveReservations(user.id).then((val) => {
      if (!val.error) {
        var final = val.value.map((entry) => ({
          id: entry._id,
          userid: entry.userid,
          roomid: entry.roomid,
          name: entry.name,
          start: entry.start,
          end: entry.end,
          type: entry.type,
          guestCount: entry.guestCount,
          reserveParking: entry.services.reserveParking,
          roomAmenities: entry.services.roomAmenities,
          specialNotes: entry.specialNotes,
          paymentMethod: entry.paymentMethod,
          paid: entry.paid,
          cancelled: entry.cancelled || false,
          cancellationFee: entry.cancelationFee || 0,
        }));

        setReservations(final);
        setLoaded(true);
      }
    });
  }, []);

  const onCancel = (reservation_id) => {
    setCancelReservation(reservations.find((i) => i.id === reservation_id));
    var elems = document.querySelector("#cancel-modal");
    window.M.Modal.init(elems, {}).open();
  };

  const cancelReservationHandle = () => {
    cancelReservationAction(cancelReservation.id, auth.user.id).then((val) => {
      console.log(val);
      // reload page
      window.location.reload();
    });
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <React.Fragment>
      <div className="container" style={{ marginTop: 50 }}>
        <h4 style={{ display: "inline" }}>My Reservations</h4>

        <a href="/" className="btn right primary rounded btn-large">
          <i className="material-icons left">add</i>
          Reserve Room
        </a>

        <div className="reservations-container" style={{ marginTop: 50 }}>
          {reservations.length > 0 && loaded && (
            <table class="highlight fadeIn centered responsive-table">
              <thead>
                <tr>
                  <th>Room ID</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Guests</th>
                  <th>Parking</th>
                  <th>Amenities</th>
                  <th>Notes</th>
                  <th>Payment</th>
                  <th>Paid</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {reservations.map((reservation) => (
                  <ReservationCard
                    reservation={reservation}
                    onCancel={onCancel}
                  />
                ))}
              </tbody>
            </table>
          )}
          {reservations.length === 0 && loaded && (
            <div className="empty-message fadeIn">
              <h4>It's empty here!</h4>
              <h5>You haven't made any reservations yet</h5>
              <a
                style={{ marginTop: 25 }}
                href="/"
                className="btn btn rounded primary waves-effect waves-light"
              >
                Make Reservations
                <i class="material-icons right">send</i>
              </a>
            </div>
          )}
          <div id="cancel-modal" class="modal">
            {cancelReservation && (
              <div class="modal-content">
                <h5>Cancel Reservation</h5>

                <p>
                  Are you sure you want to cancel reservation of{" "}
                  <strong>{BookingType(cancelReservation.type)}</strong> of{" "}
                  <strong>{cancelReservation.roomid || "a room"}</strong> for{" "}
                  <strong>{GuestCount(cancelReservation.guestCount)}</strong>{" "}
                  from <strong>{dateParse(cancelReservation.start)}</strong> to{" "}
                  <strong>{dateParse(cancelReservation.end)}</strong>?
                </p>

                <div className="cancellation-fee-container">
                  <span className="op">A</span>
                  <strong className="left">
                    Cancellation Fee (including all applicable Tax)
                  </strong>
                  <span className="right">
                    {formatter.format(cancelReservation.cancellationFee)}
                  </span>
                </div>
              </div>
            )}
            <div
              class="modal-footer center-align"
              style={{ textAlign: "center" }}
            >
              <a
                href="#!"
                onClick={cancelReservationHandle}
                class="modal-close waves-effect waves-light btn red"
              >
                Proceed to Pay Cancellation Fee
                <i class="material-icons right">send</i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
