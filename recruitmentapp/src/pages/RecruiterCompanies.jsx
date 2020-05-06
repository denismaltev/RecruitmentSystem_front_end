import React from "react";
import { Table } from "react-bootstrap";
import { getCompaniesList, getCompanyInfo } from "../api/CompaniesApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import PanelHeader from "../components/PanelHeader";
import { Row, Col,Button, Card, CardBody, InputGroup } from "reactstrap";
import CompanyDetail from "../components/CompanyDetail";
import CompaniesSelector from "../components/CompaniesSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class RecruiterCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      totalCompanies: 1,
      companyId: 1,
      page: 1,
      companyname: "",
      phone: "",
      email: "",
      isActive: true,
      profId: 1,
    };
    this.getCompaniesListFromAPI = this.getCompaniesListFromAPI.bind(this);
    this.paginate = this.paginate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getCompaniesListFromAPI();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.state.profId && prevProps.profId !== this.state.profId) {
  //     console.log("Selected company : " +this.state.profId)
  //     this.handleSearch();
  //   }else{
  //     this.getCompaniesListFromAPI()
  //   }
  // }

  // componentWillReceiveProps(props) {
  //   this.setState({
  //     ...this.state,
  //     profId: props.compId,
  //   });
  // }

  getCompaniesListFromAPI = async () => {
    const token = this.props.auth.JWToken;
    await getCompaniesList({
      token,
      count: config.NUMBER_OF_ROWS_PER_PAGE,
      page: this.state.page,
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          companies: res.data.result,
          totalCompanies: res.data.totalRows,
          companyId: res.data.totalRows,
        });
      }
    });
  };

  paginate = (number) => {
    this.setState(
      {
        page: number,
      },
      () => {
        this.getCompaniesListFromAPI();
      }
    );
  };

  showCompanyDetail = (id) => {
    this.setState({
      companyId: id,
    });
  };

  handleSearch = async () => {
    const companyId = this.state.profId;
    const token = this.props.auth.JWToken;

    if(companyId >=1 ){
    await getCompanyInfo({ token, companyId })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            companyname: res.data.name,
            phone: res.data.phone,
            email: res.data.email,
            isActive: res.data.isActive,
            totalCompanies: 1,
            // companies : res.data.result
          });
        }
      })
      .catch((error) => {
        console.log(error);
      }); 
    } else{
      this.getCompaniesListFromAPI()
    }
  }

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12} md={7}>
              <Card>
                <CardBody>
                  <label>Company</label>
                  <InputGroup>
                    <CompaniesSelector
                      auth={this.props.auth}
                      placeholder="Select Company"
                      onChange={(company) =>
                        this.setState({
                          profId:
                            company && company.length > 0
                              ? company[0].id
                              : null,
                        })
                      }
                    />
                    <button
                      className="search-icon-button"
                      onClick={this.handleSearch}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </InputGroup>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col" className="text-right">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.totalCompanies === 1 ? (
                        <tr
                          key={this.state.profId}
                          onClick={() => {
                            this.showCompanyDetail(this.state.profId);
                          }}
                        >
                          <td>{this.state.companyname}</td>

                          <td>{this.state.email}</td>

                          <td>{this.state.phone}</td>
                          <td>
                            {this.state.isActive === true ? (
                              <Button
                                className="btn btn-success"
                                size="sm"
                                width="10px"
                                onClick={this.handleIsActiveButton}
                              >
                                Active
                              </Button>
                            ) : (
                              <Button
                                className="btn btn-secondary"
                                size="sm"
                                width="10px"
                                onClick={this.handleIsActiveButton}
                              >
                                Inactive
                              </Button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        this.state.companies.map((company) => (
                          <tr
                            key={company.id}
                            onClick={() => {
                              this.showCompanyDetail(company.id);
                            }}
                          >
                            <td>{company.name}</td>

                            <td>{company.email}</td>

                            <td>{company.phone}</td>
                            <td style={{ textAlign: "right" }}>
                              {company.isActive === true ? (
                                <span className="status-badge badge badge-pill badge-success">
                                  Active
                                </span>
                              ) : (
                                <span className="status-badge badge badge-pill badge-secondary">
                                  Inactive
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
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
            <Col xs={12} md={5}>
              <CompanyDetail {...this.props} compId={this.state.companyId} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}