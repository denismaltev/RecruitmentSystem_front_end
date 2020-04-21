import React from "react";
import { Table } from "react-bootstrap";
import RecruiterCompany from "../components/RecruiterCompany";
import { getCompaniesList } from "../api/CompaniesApi";

export default class RecruiterCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };
    this.getCompaniesListFromAPI = this.getCompaniesListFromAPI.bind(this);
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

  render() {
    return (
      <div className="admin-companies">
        <h1> Recruiter Companies</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>
            {typeof this.state.companies !== "undefined" &&
              this.state.companies.map((company) => (
                <tr key={company.id}>
                  <RecruiterCompany {...this.props} company={company} />
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
