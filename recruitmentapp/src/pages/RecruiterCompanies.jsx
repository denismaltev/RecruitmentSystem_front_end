import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import RecruiterCompany from "../components/RecruiterCompany";
import { getCompaniesList } from "../api/CompaniesApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import PanelHeader from "../components/PanelHeader";
import { Row, Col, Card, CardBody,  FormGroup,InputGroup, } from "reactstrap";
import CompanyDetail from "../components/CompanyDetail";
import CompaniesSelector from "../components/CompaniesSelector";

// Need to delete Recruiter company component !!!!!! IMPORTANT
export default class RecruiterCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      totalCompanies: 1,
      companyId: 1,
      page: 1,
      search: ""
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
    const PARAM = `count=${config.NUMBER_OF_ROWS_PER_PAGE}&page=${PAGE}`;
    await getCompaniesList({ TOKEN, PARAM }).then(res => {
      if (res.status === 200) {
        this.setState({
          companies: res.data.result,
          totalCompanies: res.data.totalRows,
          companyId: res.data.totalRows
        });
      }
    });
  };

  paginate = number => {
    this.setState(
      {
        page: number
      },
      () => {
        this.getCompaniesListFromAPI();
      }
    );
  };

  showCompanyDetail = id => {
    this.setState({
      companyId: id
    });
  };

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
        
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <CardBody>
                <label>Company</label>
                <InputGroup>
                  <CompaniesSelector
                    auth={this.props.auth}
                    placeholder="Select company"
                    onChange={(company) =>
                     this.setState({
                        companyId:
                          company && company.length > 0 ? company[0].id : null,
                      })
                    }
                  />
                </InputGroup>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {typeof this.state.companies !== "undefined" &&
                        this.state.companies.map(company => (
                          <tr
                            key={company.id}
                            onClick={() => {
                              this.showCompanyDetail(company.id);
                            }}
                          >
                            <th>{company.name}</th>

                            <td>{company.email}</td>

                            <td>{company.phone}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination
                    itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
                    totalItem={this.state.totalCompanies}
                    paginate={this.paginate}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <CompanyDetail {...this.props} compId={this.state.companyId} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
