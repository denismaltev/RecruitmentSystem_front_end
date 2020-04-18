import React from "react";
const URL = "";


export default class RecruiterCompanies extends React.Component {
  render() {
    return (
      <div className="admin-companies">
        <h1> Recruiter Companies</h1>
        <div>
          <table className="table table-striped">
            <thead className="table-secondary">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Company A</th>
                <td>email@email.com</td>
                <td>777-888-9999</td>
                <td>Yes</td>
              </tr>
              <tr>
                <th scope="row">Company A</th>
                <td>email@email.com</td>
                <td>777-888-9999</td>
                <td>Yes</td>
              </tr>
              <tr>
                <th scope="row">Company A</th>
                <td>email@email.com</td>
                <td>777-888-9999</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
