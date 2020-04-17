import React from "react";

export default class RecruiterCompanies extends React.Component {
  render() {
    return (
    <div>
      <h1> Recruiter Companies</h1>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Active</td>
          </tr>
        </thead>
      </table>
    </div>
    );
  }
}
