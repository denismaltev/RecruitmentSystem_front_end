import React from "react";

const Navbar = () => {
  return (
    <nav>
      <a href="/">Logo</a>

      {/* if recruter */}
      <a href="/skills">Skills</a>
      <a href="/companies">Companies</a>
      <a href="/labourers">Labourers</a>
      <a href="/report-attendance">Report attendance</a>
      <a href="/report-invoices">Report invoices</a>
      <a href="/jobs-ratings">Jobs ratings</a>
      <a href="/labourer-ratings">Labourer ratings</a>

      {/* if labourer */}
      <a href="/profile-labourer">Profile</a>
      <a href="/upcoming-jobs">Upcoming jobs</a>
      <a href="/past-jobs">Past jobs</a>

      {/* if company */}
      <a href="/profile-company">Profile</a>
      <a href="/jobs">Jobs</a>
    </nav>
  );
};

export default Navbar;
