import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      {/* if recruter */}
      <div>
        <Link to="/recruiter-skills">Skills</Link>
      </div>
      <div>
        <Link to="/recruiter-companies">Companies</Link>
      </div>
      <div>
        <Link to="/recruiter-labourers">Labourers</Link>
      </div>
      <div>
        <Link to="/recruiter-report-attendance">Report attendance</Link>
      </div>
      <div>
        <Link to="/recruiter-report-invoices">Report invoices</Link>
      </div>
      <div>
        <Link to="/recruiter-jobs-ratings">Jobs ratings</Link>
      </div>
      <div>
        <Link to="/recruiter-labourer-ratings">Labourer ratings</Link>
      </div>

      {/* if labourer */}
      <div>
        <Link to="/labourer-profile">Profile</Link>
      </div>
      <div>
        <Link to="/labourer-upcoming-jobs">Upcoming jobs</Link>
      </div>
      <div>
        <Link to="/labourer-past-jobs">Past jobs</Link>
      </div>

      {/* if company */}
      <div>
        <Link to="/company-profile">Profile</Link>
      </div>
      <div>
        <Link to="/company-jobs">Jobs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
