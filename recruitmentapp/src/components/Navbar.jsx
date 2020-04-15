import React from "react";

const Navbar = () => {
  return (
    <nav>
      <a href="/">Logo</a>

      {/* if recruter */}
      <a href="/recruter-skills">Skills</a>
      <a href="/recruter-companies">Companies</a>
      <a href="/recruter-labourers">Labourers</a>
      <a href="/recruter-report-attendance">Report attendance</a>
      <a href="/recruter-report-invoices">Report invoices</a>
      <a href="/recruter-jobs-ratings">Jobs ratings</a>
      <a href="/recruter-labourer-ratings">Labourer ratings</a>

      {/* if labourer */}
      <a href="/labourer-profile">Profile</a>
      <a href="/labourer-upcoming-jobs">Upcoming jobs</a>
      <a href="/labourer-past-jobs">Past jobs</a>

      {/* if company */}
      <a href="/company-profile">Profile</a>
      <a href="/company-jobs">Jobs</a>
    </nav>
  );
};

export default Navbar;
