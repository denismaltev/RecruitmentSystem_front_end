import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import RecruiterSkills from "./pages/RecruiterSkills";
import RecruiterCompanies from "./pages/RecruiterCompanies";
import RecruiterLabourers from "./pages/RecruiterLabourers";
import RecruiterReportAttendance from "./pages/RecruiterReportAttendance";
import RecruiterReportInvoices from "./pages/RecruiterReportInvoices";
import RecruiterJobsRatings from "./pages/RecruiterJobsRatings";
import RecruiterLabourerRatings from "./pages/RecruiterLabourerRatings";
import LabourerProfile from "./pages/LabourerProfile";
import LabourerUpcomingJobs from "./pages/LabourerUpcomingJobs";
import LabourerPastJobs from "./pages/LabourerPastJobs";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyJobs from "./pages/CompanyJobs";
import Navbar from "./components/Navbar";

import {
  faTools,
  faUsers,
  faPeopleCarry,
  faCalendarCheck,
  faHammer,
  faFileInvoiceDollar,
  faCheckCircle,
  faUserCheck,
  faUser,
  faClipboardList,
  faTasks,
  faList
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(
  faTools,
  faUsers,
  faPeopleCarry,
  faCalendarCheck,
  faHammer,
  faFileInvoiceDollar,
  faCheckCircle,
  faUserCheck,
  faUser,
  faClipboardList,
  faTasks,
  faList
);

export default class App extends React.Component {
  state = {
    isAuth: true,
    userRole: null,
    checkingAuth: true
  };
  authenticateUser = authenticated => {
    this.setState({ isAuth: authenticated });
  };

  setUserRole = userRole => {
    this.setState({ userRole: userRole });
  };

  async componentDidMount() {
    try {
      //CHECK HERE IF USER LOGGED IN AND WHAT IS THE ROLE
    } catch (error) {
      console.log(error);
    }
    this.setState({ checkingAuth: false });
  }

  render() {
    // this block for all components to understand if the user is authenteficated
    const authProps = {
      isAuth: this.state.isAuth,
      userRole: this.state.userRole,
      authenticateUser: this.authenticateUser,
      setUserRole: this.setUserRole
    };
    // end of block of auth

    return (
      //wait for Auth methods before rendering router
      !this.state.checkingAuth && (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LogIn} />
              <Route path="/registration" component={Registration} />
            </Switch>
          </Router>
          {this.state.isAuth && (
            <div className="navAndContent">
              <Router>
                <Navbar auth={authProps} />
                <Switch>
                  {/* recruiter section start */}
                  {this.state.userRole === "admin" && (
                    <div>
                      <Route
                        path="/recruiter-skills"
                        render={props => (
                          <RecruiterSkills {...props} auth={authProps} />
                        )}
                      />
                      <Route
                        path="/recruiter-companies"
                        render={props => (
                          <RecruiterCompanies {...props} auth={authProps} />
                        )}
                      />
                      <Route
                        path="/recruiter-labourers"
                        render={props => (
                          <RecruiterLabourers {...props} auth={authProps} />
                        )}
                      />
                      <Route
                        path="/recruiter-report-attendance"
                        render={props => (
                          <RecruiterReportAttendance
                            {...props}
                            auth={authProps}
                          />
                        )}
                      />
                      <Route
                        path="/recruiter-report-invoices"
                        render={props => (
                          <RecruiterReportInvoices
                            {...props}
                            auth={authProps}
                          />
                        )}
                      />
                      <Route
                        path="/recruiter-jobs-ratings"
                        render={props => (
                          <RecruiterJobsRatings {...props} auth={authProps} />
                        )}
                      />
                      <Route
                        path="/recruiter-labourer-ratings"
                        render={props => (
                          <RecruiterLabourerRatings
                            {...props}
                            auth={authProps}
                          />
                        )}
                      />
                    </div>
                  )}
                  {/* recruiter section end */}

                  {/* labourer section start */}
                  {this.state.userRole === "labourer" && (
                    <div>
                      <Route
                        path="/labourer-profile"
                        render={props => (
                          <LabourerProfile {...props} auth={authProps} />
                        )}
                      />
                      <Route
                        path="/labourer-upcoming-jobs"
                        render={props => (
                          <LabourerUpcomingJobs {...props} auth={authProps} />
                        )}
                      />
                      <Route
                        path="/labourer-past-jobs"
                        render={props => (
                          <LabourerPastJobs {...props} auth={authProps} />
                        )}
                      />
                    </div>
                  )}
                  {/* labourer section end */}

                  {/* company section start */}
                  {this.state.userRole === "company" && (
                    <div>
                      <Route
                        path="/company-profile"
                        render={props => (
                          <CompanyProfile {...props} auth={authProps} />
                        )}
                      />
                      <Route
                        path="/company-jobs"
                        render={props => (
                          <CompanyJobs {...props} auth={authProps} />
                        )}
                      />
                    </div>
                  )}
                  {/* company section end */}
                </Switch>
              </Router>
            </div>
          )}
        </div>
      )
    );
  }
}
