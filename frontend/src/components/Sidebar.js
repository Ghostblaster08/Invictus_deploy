import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo-container">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
      </div>
      <ul>
        <li>
          <NavLink
            to="home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="prescription"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Prescription Reader
          </NavLink>
        </li>
        <li>
          <NavLink
            to="health-reports"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Health Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="medicines"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Medicines
          </NavLink>
        </li>
        <li>
          <NavLink
            to="support"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Support
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
