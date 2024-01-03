import React from "react";
// style
import navBarStyle from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function NavBar(props) {
  //   console.log(navBarStyle);
  return (
    <nav
      className="navbar navbar-expand-md navbar-light bg-light"
      id={navBarStyle.navigation}
    >
      <div className="container">
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul
            className={clsx(
              "navbar-nav me-auto mt-2 mt-lg-0",
              navBarStyle.mainNav
            )}
          >
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/hotdeals">
                Hot Deals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/laptops">
                Laptops
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/smartphones">
                Smartphones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cameras">
                Cameras
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/accessories">
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
