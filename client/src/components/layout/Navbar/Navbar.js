import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../../../images/logo.png";
import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link to="/" className="col s5 brand-logo center black-text">
              <div className="logo-container">
                <img src={logo} className="logo" />
                <h5>MangoHolidays (Pvt) Ltd</h5>
              </div>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
