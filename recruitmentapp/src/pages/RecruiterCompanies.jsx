import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCompaniesList,  updateCompany } from "../api/CompaniesApi";

export default class RecruiterCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      isEditable: false,

    };
    this.getCompaniesListFromAPI = this.getCompaniesListFromAPI.bind(this);
    this.updateCompanyToAPI = this.updateCompanyToAPI.bind(this);
    this.startEditing = this.startEditing.bind(this);
  }

  componentDidMount() {
    this.getCompaniesListFromAPI();
  }

  getCompaniesListFromAPI = async () => {
    const TOKEN = this.props.auth.JWToken;
    await getCompaniesList({ TOKEN }).then((res) => {
      if (res.status === 200) {
        this.setState({ companies: res.data });
      }
    });
  };

  // this gets run on click of update button
  updateCompanyToAPI = async event => {
    const TOKEN = this.props.auth.JWToken;
    const id = this.props.skill.id;
    const companyName = this.state.companyName;
    const city = this.state.city;
    const province = this.state.province;
    const country = this.state.country;
    const address = this.state.address;
    const phone = this.state.phone;
    const email = this.state.email;
    const isActive = this.props.skill.isActive;
    await updateCompany ({ TOKEN, id, companyName, city, province, country, address, phone, email, isActive }).then(res => {
      if(res.status === 200) {
        this.setState({ isEditable: false });
      } else {
        this.setState({ isEditable: false });
        alert("Error: Something went wrong, please try again" + res.statusText);
      }
    });
  };

  startEditing() {
    this.setState({ isEditable: true });
  }

  renderEditableTable(){
    return this.state.companies.map((company) => {
      return (
        <tr key={company.id}>
          <th scope="row">{company.name}</th>
          <td>
            <input placeholder={company.email}></input>
          </td>
          <td>
            <input placeholder={company.phone}></input>
          </td>
          <td>
            <input placeholder={company.address}></input>
          </td>
          <td>
            <input placeholder={company.city}></input>
          </td>
          <td>
            <input placeholder={company.province}></input>
          </td>
          <td>
            {company.isActive === true ? (
              <FontAwesomeIcon icon="check-circle" color="blue" />
            ) : (
              ""
            )}
          </td>
          <td>
            <button
              id = "update-button"
              className="btn btn-primary btn-sm"
              onClick={this.updateCompanyToAPI}
            >
              Update
            </button>
          </td>
        </tr>
      );
    });
  }

  renderTableData() {
    return this.state.companies.map((company) => {
      return (
        <tr key={company.id}>
          <th scope="row">{company.name}</th>
          <td>{company.email}</td>
          <td>{company.phone}</td>
          <td>{company.address} </td>
          <td>{company.city}</td>
          <td>{company.province}</td>
          <td>
            {company.isActive === true ? (
              <FontAwesomeIcon icon="check-circle" color="blue" />
            ) : (
              ""
            )}
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
          <tbody>
            {this.state.isEditable === false ? ( this.renderTableData() ) : ( this.renderEditableTable() ) }
            {/* {this.renderTableData()} */}
          </tbody>
        </Table>
      </div>
    );
  }
}
