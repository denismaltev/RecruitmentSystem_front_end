import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router hashType="hashbang">
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LogIn} />
              <Route path="/registration" component={Registration} />
              <Route path="/recruiter-skills" component={RecruiterSkills} />
              <Route
                path="/recruiter-companies"
                component={RecruiterCompanies}
              />
              <Route
                path="/recruiter-labourers"
                component={RecruiterLabourers}
              />
              <Route
                path="/recruiter-report-attendance"
                component={RecruiterReportAttendance}
              />
              <Route
                path="/recruiter-report-invoices"
                component={RecruiterReportInvoices}
              />
              <Route
                path="/recruiter-jobs-ratings"
                component={RecruiterJobsRatings}
              />
              <Route
                path="/recruiter-labourer-ratings"
                component={RecruiterLabourerRatings}
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
