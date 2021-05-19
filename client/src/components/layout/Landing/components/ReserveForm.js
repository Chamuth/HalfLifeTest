import React, { useState } from "react";
import { connect } from "react-redux";

const ReserveForm = ({ roomid, auth }) => {
  const [specialNotes, setSpecialNotes] = useState(false);

  return (
    <div class="col s12 center-align logister">
      <h4>
        <strong>Make reservation</strong>
      </h4>

      <br />

      <form class="col s12 reservation-form left-align">
        <div class="row">
          <input type="hidden" name="roomid" value={roomid} />

          <div class="input-field col s12">
            <input
              value={auth.user.name}
              id="name"
              name="name"
              type="text"
              class="validate"
              disabled={true}
            />
            <label for="name">Customer Name</label>
          </div>
          <div class="input-field col s6">
            <input
              id="reserve-date"
              type="text"
              name="reserveDate"
              required={true}
              class="datepicker"
            />
            <label for="reserve-date">Reservation Date</label>
          </div>
          <div class="input-field col s6">
            <input
              name="reserveTime"
              id="reserve-time"
              type="text"
              class="timepicker"
            />
            <label for="reserve-time">Time of arrival (optional)</label>
          </div>
          <div class="input-field col s12">
            <select required={true} name="reserveDuration">
              <option value="" disabled selected>
                Select Reservation for
              </option>
              <option value="1">1 Night</option>
              <option value="2">2 Nights</option>
              <option value="3">3 Nights</option>
              <option value="4">4 Nights</option>
              <option value="5">5 Nights</option>
              <option value="6">6 Nights</option>
              <option value="7">7 Nights</option>
            </select>
            <label>Reservation Duration</label>
          </div>
          <div class="input-field col s12" required={true}>
            <select required={true} name="reserveType">
              <option value="" disabled selected>
                Select Booking Type
              </option>
              <option value="1">Bed &amp; Breakfast</option>
              <option value="2">Half-board</option>
              <option value="3">Full-board</option>
            </select>
            <label>Booking Type</label>
          </div>
          <div class="input-field col s12">
            <select required={true} name="guestCount">
              <option value="" disabled selected>
                Select Number of Guests
              </option>
              <option value="1">1 (Single)</option>
              <option value="2">2 (Double)</option>
              <option value="3">3 (Triple)</option>
            </select>
            <label>Number of Guests</label>
          </div>
          <div class="col s12" style={{ marginBottom: 15 }}>
            <h7>
              <strong>Additional Services</strong>
            </h7>
          </div>
          <div class="col s12">
            <label>
              <input
                name="reserveParking"
                required={true}
                type="checkbox"
                class="filled-in"
              />
              <span>Reserve Parking Spot</span>
            </label>
          </div>
          <div class="col s12">
            <label>
              <input
                required={true}
                name="reserveRoomAmenities"
                type="checkbox"
                class="filled-in"
              />
              <span>In Room Amenities (Free of Charge)</span>
            </label>
          </div>
          <div class="col s12">
            <label>
              <input
                type="checkbox"
                defaultValue={false}
                value={specialNotes}
                onChange={(event) => {
                  setSpecialNotes(event.target.checked);
                }}
                class="filled-in"
              />
              <span>Special Note(s)</span>
            </label>
          </div>

          {specialNotes && (
            <div class="input-field col s12">
              <textarea
                name="specialNotes"
                id="specialNotes"
                class="materialize-textarea"
              />
              <label for="specialNotes">Special Notes</label>
            </div>
          )}

          <div
            class="input-field col s12"
            style={{ marginTop: specialNotes ? 0 : 25 }}
          >
            <select>
              <option value="" disabled selected>
                Select Payment Method
              </option>
              <option value="1">Credit Card Online</option>
              <option value="2">Credit Card at Location</option>
              <option value="3">Cash at Location</option>
            </select>
            <label>Payment Method</label>
          </div>

          <div class="col s12 center-align">
            <button
              class="btn btn-large primary waves-effect waves-light"
              type="submit"
            >
              MAKE RESERVATION
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ReserveForm);
