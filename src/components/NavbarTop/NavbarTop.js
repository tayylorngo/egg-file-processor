import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';

const NavbarTop = () => {
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top" 
        style={{
        backgroundColor: "#f8f9fa", // Light gray color
        borderBottom: "1px solid #e0e0e0", // Optional border for definition
        color: "#343a40", // Dark gray text for contrast
      }}>
  <div className="container-fluid">
    <button
      data-mdb-collapse-init
      className="navbar-toggler"
      type="button"
      data-mdb-target="#navbarCenteredExample"
      aria-controls="navbarCenteredExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    <div
      className="collapse navbar-collapse justify-content-center"
      id="navbarCenteredExample"
    >
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="navbar-brand d-flex justify-content-center" to="/">
          <img src="favicon.ico" alt="Logo" width="30" height="30" />
        </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/">Egg File Processor</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/how-to-use">How To Use</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://github.com/tayylorngo/egg-file-processor">Source Code</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default NavbarTop;
