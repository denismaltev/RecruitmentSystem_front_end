import React from "react";
import { Table } from "react-bootstrap";
import { getCompanyInfo, getCompanyJobs } from "../api/CompaniesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, CardBody } from "reactstrap";
import StarRatings from "react-star-ratings";
import Pagination from "./Pagination";
import PanelHeader from "../components/PanelHeader";
import { config } from "../api/config.json";

export default class CompanyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyname: " ",
      phone: "",
      country: "",
      province: "",
      city: "",
      address: "",
      email: "",
      jobs: [],
      hasjob: false,
      page: 1,
      totalJobs: 1,
      compId: this.props.compId
    };
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    this.fetchprofileInfo();
    this.fetchJobs();
  }

  componentDidUpdate(prevProps) {
    if (this.state.compId && prevProps.compId !== this.state.compId) {
      this.fetchprofileInfo();
      this.fetchJobs();
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      compId: props.compId
    });
  }

  fetchprofileInfo = async () => {
    // const PROF_ID = this.props.match.params.id;
    const PROF_ID = this.state.compId;
    console.log("Company ID : " + PROF_ID);
    const TOKEN = this.props.auth.JWToken;

    await getCompanyInfo({ TOKEN, PROF_ID })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            companyname: res.data.name,
            phone: res.data.phone,
            country: res.data.country,
            province: res.data.province,
            city: res.data.city,
            address: res.data.address,
            email: res.data.email
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  fetchJobs = async () => {
    //   const COMP_ID = this.props.location.state.companyID
    // const COMP_ID = this.props.match.params.id;
    const COMP_ID = this.props.compId;
    console.log("Company ID : " + COMP_ID);
    const TOKEN = this.props.auth.JWToken;
    const PAGE = this.state.page;
    const PARAM = `companyId=${COMP_ID}&count=${config.NUMBER_OF_ROWS_PER_PAGE}&page=${PAGE}`;

    await getCompanyJobs({ TOKEN, PARAM })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            jobs: res.data.result,
            totalJobs: res.data.totalRows
          });

          if (this.state.totalJobs > 0) {
            this.setState({ hasjob: true });
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ hasjob: false });
      });
  };

  paginate = number => {
    this.setState(
      {
        page: number
      },
      () => {
        this.fetchJobs();
      }
    );
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <h2>{this.state.companyname}</h2>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <th> Company name: </th>
                        <td> {this.state.companyname} </td>
                      </tr>

                      <tr>
                        <th> Email: </th>
                        <td> {this.state.email} </td>
                      </tr>

                      <tr>
                        <th> Phone: </th>
                        <td> {this.state.phone} </td>
                      </tr>

                      <tr>
                        <th> Address: </th>
                        <td>
                          {" "}
                          {this.state.address}, {this.state.city},{" "}
                          {this.state.province},{this.state.country}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  {!this.state.hasjob ? (
                    <h2>
                      {" "}
                      {this.state.companyname} have not posted any job yet .
                    </h2>
                  ) : (
                    <div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th scope="col">Job Title</th>
                            <th scope="col">Address</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Active</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.jobs.map(item => (
                            <tr key={item.id}>
                              <td> {item.title} </td>
                              <td> {item.address} </td>
                              <td>{item.startDate.toString().slice(0, 10)}</td>
                              <td> {item.endDate.toString().slice(0, 10)} </td>
                              <td>
                                <StarRatings
                                  rating={item.rating}
                                  starRatedColor="blue"
                                  numberOfStars={5}
                                  starDimension="30px"
                                  starSpacing="1px"
                                  name="rating"
                                />
                              </td>
                              <td>
                                {item.isActive ? (
                                  <FontAwesomeIcon
                                    icon="check-circle"
                                    color="blue"
                                  />
                                ) : (
                                  "X"
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <Pagination
                        itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
                        totalItem={this.state.totalJobs}
                        paginate={this.paginate}
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
