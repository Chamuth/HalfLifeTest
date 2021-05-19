import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./components/PropertyCard";
import RoomCard from "./components/RoomCard";
import ReserveForm from "./components/ReserveForm";

import * as Scroll from "react-scroll";

import { connect } from "react-redux";

import "./Landing.scss";

const scroll = Scroll.animateScroll;

const Landing = ({ auth }) => {
  const [activeProperty, setActiveProperty] = useState("");
  const [activeRoom, setActiveRoom] = useState("");

  useEffect(
    () => {
      setActiveRoom("");

      setTimeout(() => {
        scroll.scrollToBottom();
      }, 100);
    },
    [activeProperty]
  );

  useEffect(
    () => {
      window.M.updateTextFields();

      window.M.Datepicker.init(document.querySelectorAll(".datepicker"), {
        minDate: new Date(),
      });
      window.M.FormSelect.init(document.querySelectorAll("select"));
      window.M.Timepicker.init(document.querySelectorAll(".timepicker"));

      setTimeout(() => {
        scroll.scrollToBottom();
      }, 100);
    },
    [activeRoom]
  );

  const properties = [
    {
      id: "PROP_1",
      title: "Mango Sun",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quod libero deleniti beatae molestiae necessitatibus,
      corrupti enim modi! Dicta quo aspernatur atque error, omnis
      natus ut totam quisquam maxime earum cupiditate.`,
      availability: "1/3 rooms available",
      color: "green-text",
    },
    {
      id: "PROP_2",
      title: "Mango Sea",
      image:
        "https://cf.bstatic.com/images/hotel/max1024x768/260/260904966.jpg",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quod libero deleniti beatae molestiae necessitatibus,
      corrupti enim modi! Dicta quo aspernatur atque error, omnis
      natus ut totam quisquam maxime earum cupiditate.`,
      availability: "3/3 rooms available",
      color: "green-text",
    },
    {
      id: "PROP_3",
      title: "Mango Hill",
      image:
        "https://www.beautifullife.info/wp-content/uploads/2018/11/05/general.jpg",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quod libero deleniti beatae molestiae necessitatibus,
      corrupti enim modi! Dicta quo aspernatur atque error, omnis
      natus ut totam quisquam maxime earum cupiditate.`,
      availability: "Sorry no rooms available",
      color: "red-text",
    },
  ];

  const rooms = [
    {
      id: "RM_01",
      available: true,
      image:
        "http://cdn.home-designing.com/wp-content/uploads/2018/08/modern-platform-bedroom-sets.jpg",
      features: [
        { key: "Floor area", value: "35", color: "green-text" },
        { key: "WiFi", value: "Yes", color: "green-text" },
        { key: "Sea View", value: "Yes", color: "green-text" },
        { key: "Lake View", value: "Yes", color: "green-text" },
        { key: "Mountain View", value: "Yes", color: "green-text" },
        { key: "Bathtub", value: "Yes", color: "green-text" },
        { key: "Balcony", value: "Yes", color: "green-text" },
      ],
    },
    {
      id: "RM_02",
      available: false,
      image:
        "http://cdn.home-designing.com/wp-content/uploads/2018/08/modern-platform-bedroom-sets.jpg",
      features: [
        { key: "Floor area", value: "35", color: "green-text" },
        { key: "WiFi", value: "Yes", color: "green-text" },
        { key: "Sea View", value: "No", color: "red-text" },
        { key: "Lake View", value: "Yes", color: "green-text" },
        { key: "Mountain View", value: "Yes", color: "green-text" },
        { key: "Bathtub", value: "Yes", color: "green-text" },
        { key: "Balcony", value: "Yes", color: "green-text" },
      ],
    },
    {
      id: "RM_03",
      available: true,
      image:
        "http://cdn.home-designing.com/wp-content/uploads/2018/08/modern-platform-bedroom-sets.jpg",
      features: [
        { key: "Floor area", value: "35", color: "green-text" },
        { key: "WiFi", value: "Yes", color: "green-text" },
        { key: "Sea View", value: "Yes", color: "green-text" },
        { key: "Lake View", value: "Yes", color: "green-text" },
        { key: "Mountain View", value: "Yes", color: "green-text" },
        { key: "Bathtub", value: "Yes", color: "green-text" },
        { key: "Balcony", value: "Yes", color: "green-text" },
      ],
    },
  ];

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
            <h6>3 Bed rooms</h6>

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

        {activeRoom !== "" &&
          rooms.find((i) => i.id === activeRoom).available &&
          auth && <ReserveForm roomid={activeRoom} />}

        {activeRoom !== "" &&
          !rooms.find((i) => i.id === activeRoom).available && (
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
