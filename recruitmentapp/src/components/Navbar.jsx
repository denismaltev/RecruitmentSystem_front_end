import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <a href="/">Logo</a>
      <br />

      {/* if recruter */}
      <Link to="/recruter-skills">Skills</Link>
      <br />
      <Link to="/recruter-companies">Companies</Link>
      <br />
      <Link to="/recruter-labourers">Labourers</Link>
      <br />
      <Link to="/recruter-report-attendance">Report attendance</Link>
      <br />
      <Link to="/recruter-report-invoices">Report invoices</Link>
      <br />
      <Link to="/recruter-jobs-ratings">Jobs ratings</Link>
      <br />
      <Link to="/recruter-labourer-ratings">Labourer ratings</Link>
      <br />

      {/* if labourer */}
      <Link to="/labourer-profile">Profile</Link>
      <br />
      <Link to="/labourer-upcoming-jobs">Upcoming jobs</Link>
      <br />
      <Link to="/labourer-past-jobs">Past jobs</Link>
      <br />

      {/* if company */}
      <Link to="/company-profile">Profile</Link>
      <br />
      <Link to="/company-jobs">Jobs</Link>
      <br />
    </nav>
  );
};

export default Navbar;
