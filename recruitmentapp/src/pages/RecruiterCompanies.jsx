import React from "react";
import { Table } from "react-bootstrap";
const URL = "https://recruitmentsystemapi.azurewebsites.net/api/companies";

export default class RecruiterCompanies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      companies: []
    };
    this.getCompaniesList = this.getCompaniesList.bind(this);
  }

  componentDidMount(){
    this.getCompaniesList();
  }

  getToken(){
    this.setState({token: this.props.token});
    console.log(this.state.token)
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
    .then(res => res.json())
    .then(data => {
      this.setState({ companies: data });
    })
    .catch(error => {
      console.log(error);
    });
  };

  renderTableData(){
    return this.state.companies.map(company => {
      return (
        <tr key={company.id}>
          <th scope="row">{company.name}</th>
          <td>{company.email}</td>
          <td>{company.phone}</td>
          <td>{company.address}</td>
          <td>{company.city}</td>
          <td>{company.province}</td>
          <td>{company.isActive === true ? "Yes" : "No"}</td>
        </tr>
      );
    });
  }
  
  render() {
    return (
      <div className="admin-companies">
        <h1> Recruiter Companies</h1>
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
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
