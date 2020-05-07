import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import routes from "../routes";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import Header from "../components/Header";
var ps;

class AppLayout extends Component {
  state = {
    backgroundColor: "blue",
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <Header {...this.props} auth={this.props.auth} />
          <Switch>
            {routes
              .filter(
                (route) =>
                  (!route.role || route.role === this.props.auth.userRole) &&
                  (this.props.auth.profileId || !route.profileNeeded)
              )
              .map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    render={(props) => (
                      <prop.component {...props} auth={this.props.auth} />
                    )}
                    key={key}
                  />
                );
              })}
            {this.props.auth.userRole === "admin" && (
              <Redirect from="/" to="/dashboard" />
            )}
            {this.props.auth.userRole === "labourer" &&
              (this.props.auth.profileId ? (
                <Redirect from="/" to="/labourer-upcoming-jobs" />
              ) : (
                <Redirect from="/" to="/labourer-profile" />
              ))}
            {this.props.auth.userRole === "company" &&
              (this.props.auth.profileId ? (
                <Redirect from="/" to="/company-jobs" />
              ) : (
                <Redirect from="/" to="/company-profile" />
              ))}
          </Switch>
        </div>
      </div>
    );
  }
}

export default AppLayout;
