import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const NavbarTop = () => {
  return (
<nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
  <div class="container-fluid">
    <button
      data-mdb-collapse-init
      class="navbar-toggler"
      type="button"
      data-mdb-target="#navbarCenteredExample"
      aria-controls="navbarCenteredExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <div
      className="collapse navbar-collapse justify-content-center"
      id="navbarCenteredExample"
    >
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
        <a className="navbar-brand d-flex justify-content-center" href="/">
          <img src="favicon.ico" alt="Logo" width="30" height="30" />
        </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/">Egg File Processor</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">How To Use</a>
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
