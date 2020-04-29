import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Navbar extends React.Component {
  isActive = (match, location) => {
    if (match || location.pathname === "/") {
      return true;
    } else {
      return false;
    }
  };
  render() {
    // Checking if user is authorized
    if (this.props.auth.isAuth) {
      // Shows different NavBar depends on userRole: admin(Recruiter) / labourer / company
      switch (this.props.auth.userRole) {
        case "admin":
          return (
            <Nav className="nav flex-column" id="navbar">
              <NavItem className="navitem">
                <FontAwesomeIcon icon="tools" color="white" />
                <NavLink
                  to="/recruiter-skills"
                  className="inactive"
                  activeClassName="active"
                  isActive={this.isActive}
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
              <NavItem className="navitem">
                <FontAwesomeIcon icon="tools" color="white" />
                <NavLink
                  to="/logout"
                  className="inactive"
                  activeClassName="active"
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          );

        case "labourer":
          return (
            <Nav className="nav flex-column" id="navbar">
              <NavItem className="navitem">
                <FontAwesomeIcon icon="user" color="white" />
                <NavLink
                  to="/labourer-profile"
                  className="inactive"
                  activeClassName="active"
                  isActive={this.isActive}
                >
                  Profile
                </NavLink>
              </NavItem>
              {this.props.auth.profileId > 0 && (
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
              )}
              {this.props.auth.profileId > 0 && (
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
              )}
              <NavItem className="navitem">
                <FontAwesomeIcon icon="tools" color="white" />
                <NavLink
                  to="/logout"
                  className="inactive"
                  activeClassName="active"
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          );

        case "company":
          return (
            <Nav className="nav flex-column" id="navbar">
              <NavItem className="navitem">
                <FontAwesomeIcon icon="user" color="white" />
                <NavLink
                  to="/company-profile"
                  className="inactive"
                  activeClassName="active"
                  isActive={this.isActive}
                >
                  Profile
                </NavLink>
              </NavItem>
              {this.props.auth.profileId > 0 && (
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
              )}
              {this.props.auth.profileId > 0 && (
                <NavItem className="navitem">
                  <FontAwesomeIcon icon="list" color="white" />
                  <NavLink
                    to="/labourer-attendence"
                    className="inactive"
                    activeClassName="active"
                  >
                    Labourer Attendence
                  </NavLink>
                </NavItem>
              )}
              {this.props.auth.profileId > 0 && (
                <NavItem className="navitem">
                  <FontAwesomeIcon icon="clipboard-list" color="white" />
                  <NavLink
                    to="/safety-report"
                    className="inactive"
                    activeClassName="active"
                  >
                    Safety Report
                  </NavLink>
                </NavItem>
              )}
              <NavItem className="navitem">
                <FontAwesomeIcon icon="tools" color="white" />
                <NavLink
                  to="/logout"
                  className="inactive"
                  activeClassName="active"
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          );

        default:
          return <></>;
      }
    } else {
      return <></>;
    }
  }
}
