import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../Helpers/auth";

const Header = ({ history }) => {

  const handleLogout = (e) => {
    auth.logout(() => {
      history.push('/signin');
    });

  }

  //views
  const showNavigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">
          Logo
        </Link>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {!auth.isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className='fas fa-home'></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  <i className='fas fa-edit'></i> Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                <i className='fas fa-sign-in-alt'></i> Signin
                </Link>
              </li>
            </Fragment>
          )}
          {auth.isAuthenticated() && auth.isAuthenticated().role === 0 && (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/user/dashboard">
                  <i className="fas fa-home"></i> Dashboard
                </Link>
              </li>
            </Fragment>
          )}

          {auth.isAuthenticated() && auth.isAuthenticated().role === 1 && (
            <Fragment>
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  <i className="fas fa-home"></i> Dashboard
                </Link>
              </li>
            </Fragment>
          )}

          {auth.isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <button
                  className="btn btn-link text-secondary text-decoration-none pl-0"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );

  return <header id="header">{showNavigation()}</header>;
};

export default withRouter(Header);
