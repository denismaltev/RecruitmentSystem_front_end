import React from "react";
import logo from "./logo.svg";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import RecruterSkills from "./pages/RecruterSkills";
import RecruterCompanies from "./pages/RecruterCompanies";
import RecruterLabourers from "./pages/RecruterLabourers";
import RecruterReportAttendance from "./pages/RecruterReportAttendance";
import RecruterReportInvoices from "./pages/RecruterReportInvoices";
import RecruterJobsRatings from "./pages/RecruterJobsRatings";
import RecruterLabourerRatings from "./pages/RecruterLabourerRatings";
import LabourerProfile from "./pages/LabourerProfile";
import LabourerUpcomingJobs from "./pages/LabourerUpcomingJobs";
import LabourerPastJobs from "./pages/LabourerPastJobs";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyJobs from "./pages/CompanyJobs";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    */}
        <Router hashType="hashbang">
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LogIn} />
              <Route path="/registration" component={Registration} />
              <Route path="/recruter-skills" component={RecruterSkills} />
              <Route path="/recruter-companies" component={RecruterCompanies} />
              <Route path="/recruter-labourers" component={RecruterLabourers} />
              <Route
                path="/recruter-report-attendance"
                component={RecruterReportAttendance}
              />
              <Route
                path="/recruter-report-invoices"
                component={RecruterReportInvoices}
              />
              <Route
                path="/recruter-jobs-ratings"
                component={RecruterJobsRatings}
              />
              <Route
                path="/recruter-labourer-ratings"
                component={RecruterLabourerRatings}
              />
              <Route path="/labourer-profile" component={LabourerProfile} />
              <Route
                path="/labourer-upcoming-jobs"
                component={LabourerUpcomingJobs}
              />
              <Route path="/labourer-past-jobs" component={LabourerPastJobs} />
              <Route path="/company-profile" component={CompanyProfile} />
              <Route path="/company-jobs" component={CompanyJobs} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
