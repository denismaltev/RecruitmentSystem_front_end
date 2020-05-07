import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import {
  faTools,
  faUsers,
  faPeopleCarry,
  faCalendarCheck,
  faHammer,
  faFileInvoiceDollar,
  faCheckCircle,
  faUserCheck,
  faTimesCircle,
  faUser,
  faClipboardList,
  faTasks,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { createBrowserHistory } from "history";
import AppLayout from "./layouts/AppLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/now-ui-dashboard.scss?v1.2.0";
import "./assets/css/demo.css";
library.add(
  faTools,
  faUsers,
  faPeopleCarry,
  faCalendarCheck,
  faHammer,
  faFileInvoiceDollar,
  faCheckCircle,
  faUserCheck,
  faTimesCircle,
  faUser,
  faClipboardList,
  faTasks,
  faList,
  faEdit
);

const hist = createBrowserHistory();
export default class App extends React.Component {
  state = {
    isAuth: false, // true or false
    userRole: "", //admin or labourer or company
    JWToken: "",
    profileId: null,
    username: "",
  };
  authenticateUser = (authenticated) => {
    this.setState({ isAuth: authenticated });
    sessionStorage.setItem("isAuth", authenticated);
  };

  setUserRole = (userRole) => {
    this.setState({ userRole: userRole });
    sessionStorage.setItem("role", userRole);
  };

  settoken = (token) => {
    this.setState({ JWToken: token });
    sessionStorage.setItem("token", token);
  };

  setProfileId = (profileId) => {
    this.setState({ profileId: profileId });
    sessionStorage.setItem("profileId", profileId);
  };

  setUsername = (username) => {
    this.setState({ username: username });
    sessionStorage.setItem("username", username);
  };

  async componentDidMount() {
    //CHECK HERE IF USER LOGGED IN AND WHAT IS THE ROLE
    if (
      sessionStorage.getItem("isAuth") != null &&
      sessionStorage.getItem("role") != null &&
      sessionStorage.getItem("token") != null
    ) {
      this.setState({
        isAuth: sessionStorage.getItem("isAuth"),
        userRole: sessionStorage.getItem("role"),
        JWToken: sessionStorage.getItem("token"),
        profileId: sessionStorage.getItem("profileId"),
        username: sessionStorage.getItem("username"),
      });
    }
  }

  render() {
    // this block for all components to understand if the user is authenteficated
    const authProps = {
      isAuth: this.state.isAuth,
      userRole: this.state.userRole,
      JWToken: this.state.JWToken,
      profileId: this.state.profileId,
      username: this.state.username,
      authenticateUser: this.authenticateUser,
      setUserRole: this.setUserRole,
      settoken: this.settoken,
      setProfileId: this.setProfileId,
      setUsername: this.setUsername,
    };
    // end of block of auth
    if (!this.state.isAuth) {
      return (
        <>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <LogIn auth={authProps} />}
              />
              <Route path="/registration" component={Registration} />
            </Switch>
          </Router>
        </>
      );
    } else
      return (
        <Router history={hist}>
          <Switch>
            <Route
              path="/"
              render={(props) => <AppLayout {...props} auth={authProps} />}
            />
          </Switch>
        </Router>
      );
  }
}
