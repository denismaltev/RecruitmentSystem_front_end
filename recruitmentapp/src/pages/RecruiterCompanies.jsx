import React from "react";
const BASE_URL = "http://localhost:49241/api/companies";
const AUTH_TOKEN = "auth_token";

export default class RecruiterCompanies extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn: true,
      companies: [],
      item: {}
    };
    this.getAll = this.getAll.bind(this);
  }

  componentDidMount(){
    this.getAll();
  }

  getAll(){
    const URL = BASE_URL;
    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(JSON.stringify(data));
      this.setState({ companies: data });
    })
    .catch(error => {
      console.log(error);
    });
  }

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
