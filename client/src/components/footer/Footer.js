import React from "react";
import { logoutUser } from "./../../actions/authActions";
import { connect } from "react-redux";
import "./Footer.scss";

const Footer = ({ auth, logoutUser }) => {
  const logout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  return (
    <footer class="footer center-align">
      <div class="container">
        <span>You are logged in as {auth.user.name || "User"}. </span>
        <a href="#" onClick={logout}>
          Logout
        </a>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Footer);
