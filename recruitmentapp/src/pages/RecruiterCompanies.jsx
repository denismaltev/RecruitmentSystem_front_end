import React from "react";
import { Table } from "react-bootstrap";
const URL = "https://recruitmentsystemapi.azurewebsites.net/api/companies";

export default class RecruiterCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      isEditable: "false",
    };
    this.getCompaniesList = this.getCompaniesList.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    this.startEditing = this.startEditing.bind(this);
  }

  componentDidMount() {
    this.getCompaniesList();
  }

  getToken() {
    this.setState({ token: this.props.token });
    console.log(this.state.token);
  }

  getCompaniesList = async () => {
    await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.JWToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ companies: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateCompany = async (event) => {};

  startEditing() {
    this.setState({ isEditable: "true" });
    console.log(this.state.isEditable);
  }

  renderTableData() {
    return this.state.companies.map((company) => {
      return (
        <tr key={company.id}>
          <th scope="row" contenteditable={this.state.isEditable}>
            {company.name}
          </th>
          <td className="editable" contenteditable={this.state.isEditable}>
            {company.email}
          </td>
          <td className="editable" contenteditable={this.state.isEditable}>
            {company.phone}
          </td>
          <td className="editable" contenteditable={this.state.isEditable}>
            {company.address}
          </td>
          <td className="editable" contenteditable={this.state.isEditable}>
            {company.city}
          </td>
          <td className="editable" contenteditable={this.state.isEditable}>
            {company.province}
          </td>
          <td contenteditable={this.state.isEditable}>
            {company.isActive === true ? "Yes" : "No"}
          </td>
          <td>
            <button
              className="btn btn-success btn-sm"
              onClick={this.startEditing}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="admin-companies">
        <div className="h1andbutton">
          <h1> Recruiter Companies</h1>
          <button type="button" className="btn btn-primary btn-sm" onClick="">
            Add Company
          </button>
        </div>
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">Province</th>
              <th scope="col">Active</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
