import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { reserveRoom } from "../../../../actions/reserveActions";

const ReserveForm = ({ roomid, auth, reserveRoom, errors }) => {
  const [specialNotes, setSpecialNotes] = useState(false);

  const userid = useRef(null);
  const name = useRef(null);
  const reserveDate = useRef(null);
  const reserveTime = useRef(null);
  const reserveDuration = useRef(null);
  const reserveType = useRef(null);
  const guestCount = useRef(null);
  const reserveParking = useRef(null);
  const reserveRoomAmenities = useRef(null);
  const _specialNotes = useRef(null);
  const paymentMethod = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    var room = {
      roomid: roomid,
      id: userid.current.value,
      name: name.current.value,
      reserveDate: reserveDate.current.value,
      reserveTime: reserveTime.current.value,
      reserveDuration: reserveDuration.current.value,
      reserveType: reserveType.current.value,
      guestCount: guestCount.current.value,
      reserveParking: reserveParking.current.value,
      reserveRoomAmenities: reserveRoomAmenities.current.value,
      _specialNotes: _specialNotes.current ? _specialNotes.current.value : "",
      paymentMethod: paymentMethod.current.value,
    };

    reserveRoom(room);
  };

  return (
    <div class="col s12 center-align logister">
      <h4>
        <strong>Make reservation</strong>
      </h4>

      <br />

      <form
        className="col s12 reservation-form"
        onSubmit={onSubmit}
        noValidate={true}
      >
        <div class="row">
          <input
            type="hidden"
            ref={userid}
            name="userid"
            id="userid"
            value={auth.user.id}
          />

          <div class="input-field col s12">
            <input
              value={auth.user.name}
              ref={name}
              error={errors.name}
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
              ref={reserveDate}
              type="text"
              name="reserveDate"
              required={true}
              class="datepicker"
            />
            <label for="reserve-date">Reservation Date</label>
            {errors.reserveDate && (
              <span class="helper-text red-text" data-error="wrong">
                {errors.reserveDate}
              </span>
            )}
          </div>
          <div class="input-field col s6">
            <input
              name="reserveTime"
              ref={reserveTime}
              id="reserve-time"
              type="text"
              class="timepicker"
            />
            <label for="reserve-time">Time of arrival (optional)</label>
          </div>
          <div class="input-field col s12">
            <select
              required={true}
              name="reserveDuration"
              ref={reserveDuration}
            >
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
          {errors.reserveDuration && (
            <span class="helper-text red-text" data-error="wrong">
              {errors.reserveDuration}
            </span>
          )}
          <div class="input-field col s12" required={true}>
            <select required={true} ref={reserveType} name="reserveType">
              <option value="" disabled selected>
                Select Booking Type
              </option>
              <option value="1">Bed &amp; Breakfast</option>
              <option value="2">Half-board</option>
              <option value="3">Full-board</option>
            </select>
            <label>Booking Type</label>
            {errors.reserveType && (
              <span class="helper-text red-text" data-error="wrong">
                {errors.reserveType}
              </span>
            )}
          </div>
          <div class="input-field col s12">
            <select required={true} ref={guestCount} name="guestCount">
              <option value="" disabled selected>
                Select Number of Guests
              </option>
              <option value="1">1 (Single)</option>
              <option value="2">2 (Double)</option>
              <option value="3">3 (Triple)</option>
            </select>
            <label>Number of Guests</label>
            {errors.guestCount && (
              <span class="helper-text red-text" data-error="wrong">
                {errors.guestCount}
              </span>
            )}
          </div>
          <div class="col s12 left-align" style={{ marginBottom: 15 }}>
            <h7>
              <strong>Additional Services</strong>
            </h7>
          </div>
          <div class="col s12 left-align">
            <label>
              <input
                name="reserveParking"
                ref={reserveParking}
                required={true}
                type="checkbox"
                class="filled-in"
              />
              <span>Reserve Parking Spot</span>
            </label>
          </div>
          <div class="col s12 left-align">
            <label>
              <input
                required={true}
                ref={reserveRoomAmenities}
                name="reserveRoomAmenities"
                type="checkbox"
                class="filled-in"
              />
              <span>In Room Amenities (Free of Charge)</span>
            </label>
          </div>
          <div class="col s12 left-align">
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
                ref={_specialNotes}
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
            <select ref={paymentMethod}>
              <option value="" disabled selected>
                Select Payment Method
              </option>
              <option value="1">Credit Card Online</option>
              <option value="2">Credit Card at Location</option>
              <option value="3">Cash at Location</option>
            </select>
            <label>Payment Method</label>
            {errors.paymentMethod && (
              <span class="helper-text red-text" data-error="wrong">
                {errors.paymentMethod}
              </span>
            )}
          </div>

          <div class="col s6 left-align">
            <button
              class="btn btn-large primary waves-effect waves-light"
              type="submit"
            >
              MAKE RESERVATION
              <i class="material-icons right">check</i>
            </button>
          </div>
          <div className="cost-estimation col s6">
            <div className="pair col s12">
              <span className="left">Reservation Cost</span>
              <span className="right">$15.00</span>
            </div>
            <div className="pair col s12">
              <span className="left">Value Added Tax</span>
              <span className="right">$4.99</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { reserveRoom }
)(ReserveForm);
