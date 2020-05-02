import React from "react";
import { Table } from "react-bootstrap";
import RecruiterCompany from "../components/RecruiterCompany";
import { getCompaniesList } from "../api/CompaniesApi";
import Pagination from "../components/Pagination";
import {config} from "../api/config.json"
import PanelHeader from "../components/PanelHeader";
import { Row, Col, Card, CardBody } from "reactstrap";
import CompanyDetail from "../components/CompanyDetail";

export default class RecruiterCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      totalCompanies : 1,
      companyId : 0,
      page: 1
    };
    this.getCompaniesListFromAPI = this.getCompaniesListFromAPI.bind(this);
    this.paginate = this.paginate.bind(this);
    this.setCompId = this.setCompId.bind(this);
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

  setCompId = (id) =>{
    this.setState({
       companyId : id
    });
    console.log("ID"+this.state.companyId)
  }

  render() {
    return (
      <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={4}>
            <Card>
              <CardBody>
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
                        this.state.companies.map((company) => (
                          <tr key={company.id}>
                            <RecruiterCompany {...this.props} company={company}/>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE} 
                              totalItem={this.state.totalCompanies} 
                              paginate={this.paginate}
                  />
              </CardBody>
            </Card>
        </Col>
        <Col xs={8}>
        {/* compId={this.props.jobId} */}
        <CompanyDetail {...this.props} compId={this.state.companyId} />
        </Col>
      </Row>
    </div>
  </>
    );
  }
}
