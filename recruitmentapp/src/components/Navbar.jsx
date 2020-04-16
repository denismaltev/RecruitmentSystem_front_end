import React from "react";
//import { Nav, NavLink } from "react-router-dom";
import { Nav, NavLink, NavItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Navbar = () => {
  return (
    <div>
      <Nav className="nav flex-column" id="navbar">
        {/* if recruter */}
        <NavItem className="navitem">
          <FontAwesomeIcon icon="tools" color="white" />
          <NavLink
            to="/recruiter-skills"
            className="inactive"
            activeClassName="active"
          >
            Skills
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="users" color="white" />
          <NavLink
            to="/recruiter-companies"
            className="inactive"
            activeClassName="active"
          >
            Companies
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="hammer" color="white" />
          <NavLink
            to="/recruiter-labourers"
            className="inactive"
            activeClassName="active"
          >
            Labourers
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="calendar-check" color="white" />
          <NavLink
            to="/recruiter-report-attendance"
            className="inactive"
            activeClassName="active"
          >
            Report attendance
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="file-invoice-dollar" color="white" />
          <NavLink
            to="/recruiter-report-invoices"
            className="inactive"
            activeClassName="active"
          >
            Report invoices
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="check-circle" color="white" />
          <NavLink
            to="/recruiter-jobs-ratings"
            className="inactive"
            activeClassName="active"
          >
            Jobs ratings
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="user-check" color="white" />
          <NavLink
            to="/recruiter-labourer-ratings"
            className="inactive"
            activeClassName="active"
          >
            Labourer ratings
          </NavLink>
        </NavItem>

        {/* if labourer */}
        <NavItem className="navitem">
          <FontAwesomeIcon icon="user" color="white" />
          <NavLink
            to="/labourer-profile"
            className="inactive"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="clipboard-list" color="white" />
          <NavLink
            to="/labourer-upcoming-jobs"
            className="inactive"
            activeClassName="active"
          >
            Upcoming jobs
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="tasks" color="white" />
          <NavLink
            to="/labourer-past-jobs"
            className="inactive"
            activeClassName="active"
          >
            Past jobs
          </NavLink>
        </NavItem>

        {/* if company */}
        <NavItem className="navitem">
          <FontAwesomeIcon icon="user" color="white" />
          <NavLink
            to="/company-profile"
            className="inactive"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </NavItem>
        <NavItem className="navitem">
          <FontAwesomeIcon icon="list" color="white" />
          <NavLink
            to="/company-jobs"
            className="inactive"
            activeClassName="active"
          >
            Jobs
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Navbar;
