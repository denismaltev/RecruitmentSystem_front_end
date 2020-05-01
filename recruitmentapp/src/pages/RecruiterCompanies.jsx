import React from "react";
import { Table } from "react-bootstrap";
import RecruiterCompany from "../components/RecruiterCompany";
import { getCompaniesList } from "../api/CompaniesApi";
import Pagination from "../components/Pagination";
import {config} from "../api/config.json"

export default class RecruiterCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      totalCompanies : 1,
      page: 1
    };
    this.getCompaniesListFromAPI = this.getCompaniesListFromAPI.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    this.getCompaniesListFromAPI();
  }

  getCompaniesListFromAPI = async () => {
    const TOKEN = this.props.auth.JWToken;
    const PAGE = this.state.page;
    const PARAM = `count=${config.NUMBER_OF_ROWS_PER_PAGE}&page=${PAGE}`
    await getCompaniesList({ TOKEN, PARAM }).then((res) => {
      if (res.status === 200) {
        this.setState({ 
          companies: res.data.result,
          totalCompanies: res.data.totalRows });
      }
    });
  };

  paginate = (number) => {
    this.setState({
        page : number
     },
    () => {this.getCompaniesListFromAPI();} )
  }

  render() {
    return (
      <div className="page-content">
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
        <Pagination itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE} totalItem={this.state.totalCompanies} paginate={this.paginate} />
      </div>
    );
  }
}
