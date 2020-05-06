import React from "react";
import { Table } from "react-bootstrap";
import {
  getCompanyInfo,
  getCompanyJobs,
  putCompanies
} from "../api/CompaniesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import StarRatings from "react-star-ratings";
import Pagination from "./Pagination";
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
      compId: this.props.compId,
      rating: 0.0,
      isActive: true
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
    const PROF_ID = this.state.compId;
    // console.log("Company ID : " + PROF_ID);
    const token = this.props.auth.JWToken;

    await getCompanyInfo({ token, PROF_ID })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            companyname: res.data.name,
            phone: res.data.phone,
            country: res.data.country,
            province: res.data.province,
            city: res.data.city,
            address: res.data.address,
            email: res.data.email,
            rating: res.data.rating,
            isActive: res.data.isActive
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
    const comp_id = this.props.compId;
    const token = this.props.auth.JWToken;
    const current_page = this.state.page;
    const param = `companyId=${comp_id}&count=${config.NUMBER_OF_ROWS_PER_PAGE}&page=${current_page}`;

    await getCompanyJobs({ token, param })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            jobs: res.data.result,
            totalJobs: res.data.totalRows
          });

          if (this.state.totalJobs > 0) {
            this.setState({ hasjob: true });
          } else {
            this.setState({ hasjob: false });
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ hasjob: false });
      });
  };

  updateIsActive = event => {
    const token = this.props.auth.JWToken;
    const prof_id = this.state.compId;
    const name = this.state.companyname;
    const city = this.state.city;
    const province = this.state.province;
    const country = this.state.country;
    const address = this.state.address;
    const phone = this.state.phone;
    const email = this.state.email;
    const is_active = this.state.isActive;

    putCompanies({
      token,
      prof_id,
      name,
      email,
      city,
      province,
      country,
      address,
      phone,
      is_active
    }).then(res => {
      if (res.status === 200) {
        //this.setState({ isEditable: false });
        // console.log("Success !!")
      }
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

  handleIsActiveButton = () => {
    if (this.state.isActive === true) {
      this.setState({ isActive: false }, () => {
        this.updateIsActive();
      });
    } else {
      this.setState({ isActive: true }, () => {
        this.updateIsActive();
      });
    }
  };

  render() {
    return (
      <>
        <Card className="card-user">
          {/* <CardHeader>
          <h5 className="card-category">Company Details</h5>
          </CardHeader> */}
          <CardBody>
            <div className="author">
            <div className="company"> 
                <div className="companyName">
                    <a  href="#" onClick={e => e.preventDefault()}>
                      <h5 className="title">
                        {this.state.companyname}
                      </h5>
                    </a>
                    <p className="description">{this.state.email}</p>
                    <p className="description">{this.state.phone}</p>
                    <p className="description">
                        {" "}
                        {this.state.address}, {this.state.city},{" "}
                        {this.state.province},{this.state.country}{" "}
                    </p>
                    <div className="description">
                      Rating:
                      <StarRatings
                              id="rating"
                              rating={this.state.rating || 0}
                              starRatedColor="#ffb236"
                              numberOfStars={5}
                              name="rating"
                              starDimension="25px"
                              starSpacing="1px"
                      />           
                    </div>
                </div>
                <div className="isActive">
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
                        onClick={this.handleIsActiveButton}>
                        Inactive
                      </Button>
                      )}
              </div>
            </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            {!this.state.hasjob ? (
              <CardTitle tag="h4">
                {" "}
                {this.state.companyname} has not posted any jobs yet.
              </CardTitle>
            ) : (
              <div>
                <Table responsive>
                  <thead className="text-primary">
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
                            <FontAwesomeIcon icon="check-circle" color="blue" />
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
      </>
    );
  }
}
