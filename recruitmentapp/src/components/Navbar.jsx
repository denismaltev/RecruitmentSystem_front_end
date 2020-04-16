import React from "react";
//import { Nav, NavLink } from "react-router-dom";
import { Nav, NavLink, NavItem } from "react-bootstrap";

const Navbar = () => {
  return (
    <div>
      <Nav className="nav flex-column" id="navbar">
        {/* if recruter */}
        <NavItem>
          
          <NavLink
            to="/recruiter-skills"
            className="inactive"
            activeClassName="active"
          >
            Skills
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/recruiter-companies"
            className="inactive"
            activeClassName="active"
          >
            Companies
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/recruiter-labourers"
            className="inactive"
            activeClassName="active"
          >
            Labourers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/recruiter-report-attendance"
            className="inactive"
            activeClassName="active"
          >
            Report attendance
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/recruiter-report-invoices"
            className="inactive"
            activeClassName="active"
          >
            Report invoices
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/recruiter-jobs-ratings"
            className="inactive"
            activeClassName="active"
          >
            Jobs ratings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/recruiter-labourer-ratings"
            className="inactive"
            activeClassName="active"
          >
            Labourer ratings
          </NavLink>
        </NavItem>

        {/* if labourer */}
        <navitem>
          <NavLink
            to="/labourer-profile"
            className="inactive"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </navitem>
        <navitem>
          <NavLink
            to="/labourer-upcoming-jobs"
            className="inactive"
            activeClassName="active"
          >
            Upcoming jobs
          </NavLink>
        </navitem>
        <navitem>
          <NavLink
            to="/labourer-past-jobs"
            className="inactive"
            activeClassName="active"
          >
            Past jobs
          </NavLink>
        </navitem>

        {/* if company */}
        <navitem>
          <NavLink
            to="/company-profile"
            className="inactive"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </navitem>
        <navitem>
          <NavLink
            to="/company-jobs"
            className="inactive"
            activeClassName="active"
          >
            Jobs
          </NavLink>
        </navitem>
      </Nav>
    </div>
  );
};

export default Navbar;
