import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const NavbarBottom = () => {
  return (
    <nav 
      className="navbar fixed-bottom navbar-light bg-body-tertiary"
      style={{
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #e0e0e0",
        color: "#343a40",
        minHeight: "60px",
      }}
    >
      <div className="container-fluid position-relative h-100">
        <div className="d-flex justify-content-between w-100 h-100">
          {/* Left-aligned GitHub link */}
          <div className="d-flex align-items-center">
          </div>

          {/* Right-aligned name */}
          <div className="d-flex align-items-center">
            <span className="navbar-text">
              Created by <span>Taylor Ngo</span>
            </span>
          </div>
        </div>

        {/* Centered copyright with vertical alignment */}
        <div className="position-absolute top-50 start-50 translate-middle h-100 d-flex align-items-center">
          <span className="navbar-text m-0">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarBottom;