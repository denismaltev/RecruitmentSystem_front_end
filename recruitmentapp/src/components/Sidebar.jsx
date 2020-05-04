import React, { Component } from "react";
import logo from "../logo-white.svg";
import { Nav } from "reactstrap";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a href="/" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo" />
            </div>
          </a>
          <a href="/" className="simple-text logo-normal">
            Recruit Me
          </a>
        </div>
        <div className="sidebar-wrapper ps">
          <Nav>
            {this.props.routes
              .filter(
                route =>
                  route.isNavLink &&
                  (!route.role || route.role === this.props.auth.userRole) &&
                  (!route.profileNeeded || this.props.auth.profileId)
              )
              .map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={this.activeRoute(prop.layout + prop.path)}
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={"now-ui-icons " + prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
