import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./components/PropertyCard";
import RoomCard from "./components/RoomCard";
import ReserveForm from "./components/ReserveForm";

import * as Scroll from "react-scroll";

import { connect } from "react-redux";

import {
  retrieveProperties,
  retrieveRooms,
  checkRoom,
} from "./../../../actions/reserveActions";

import "./Landing.scss";

const scroll = Scroll.animateScroll;

const Landing = ({ auth }) => {
  const [activeProperty, setActiveProperty] = useState("");
  const [activeRoom, setActiveRoom] = useState("");
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomAvailability, setSelectedRoomAvailability] = useState(
    false
  );

  useEffect(() => {
    retrieveProperties().then((val) => {
      console.log(val);
      setProperties(val.value);
    });
  }, []);

  useEffect(
    () => {
      setActiveRoom("");
      setRooms([]);

      retrieveRooms(activeProperty).then((val) => {
        console.log(val);
        setRooms(val.value);
      });

      setTimeout(() => {
        scroll.scrollToBottom();
      }, 100);
    },
    [activeProperty]
  );

  useEffect(
    () => {
      setTimeout(() => {
        scroll.scrollToBottom();
      }, 100);

      setSelectedRoomAvailability(false);

      checkRoom(activeRoom).then((val) => {
        setSelectedRoomAvailability(val);

        window.M.updateTextFields();

        window.M.Datepicker.init(document.querySelectorAll(".datepicker"), {
          minDate: new Date(),
        });
        window.M.FormSelect.init(document.querySelectorAll("select"));
        window.M.Timepicker.init(document.querySelectorAll(".timepicker"));
      });
    },
    [activeRoom]
  );

  return (
    <div style={{ marginTop: 50 }} className="container">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Our Properties</b>
          </h4>
          <p className="flow-text grey-text text-darken-1">
            Select property to view rooms
          </p>
          <br />

          <div className="row">
            {properties.map((property, i) => (
              <div
                key={i}
                className="col s4"
                onClick={() => {
                  setActiveProperty(property.id);
                }}
              >
                <PropertyCard
                  key={i}
                  active={activeProperty === property.id}
                  property={property}
                />
              </div>
            ))}
          </div>
        </div>

        {activeProperty !== "" && (
          <div className="col s12">
            <h5>{properties.find((i) => i.id === activeProperty).title}</h5>
            <h6>{rooms.length} Bed rooms</h6>

            <div className="rooms row">
              {rooms.map((room, i) => (
                <div
                  className="col s4"
                  onClick={() => {
                    setActiveRoom(room.id);
                  }}
                >
                  <RoomCard
                    key={i}
                    room={room}
                    active={activeRoom === room.id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeRoom !== "" && !auth && (
          <div class="col s12 center-align logister">
            <h4>
              <strong>Sign in</strong> to reserve this room
            </h4>
            <h5>Manage reservations and more with a MangoHolidays account</h5>

            <Link to="/login">
              <button className="btn blue waves-effect waves-dark">
                SIGN IN
              </button>
            </Link>
            <Link to="/register">
              <button className="btn green waves-effect waves-dark">
                REGISTER NEW ACCOUNT
              </button>
            </Link>
          </div>
        )}

        {activeRoom !== "" && selectedRoomAvailability && auth && (
          <ReserveForm roomid={activeRoom} />
        )}

        {activeRoom !== "" && !selectedRoomAvailability && (
          <div
            class="col s12 center-align"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <h4>Sorry, this room is already reserved</h4>
            <h6>Please select another and retry</h6>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
