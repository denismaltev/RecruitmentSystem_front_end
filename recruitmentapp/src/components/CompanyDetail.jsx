import React from "react";
import { Table } from "react-bootstrap";
import { getCompanyInfo, getCompanyJobs, putCompanies } from "../api/CompaniesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, CardBody, CardHeader,CardTitle } from "reactstrap";
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
      rating : 0.0,
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
            email: res.data.email,
            rating : res.data.rating,
            isActive : res.data.isActive
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
   // console.log("Company ID : " + COMP_ID);
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
          }else{
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
    const TOKEN = this.props.auth.JWToken;
    const PROF_ID = this.state.compId;
    const NAME = this.state.companyname;
    const CITY = this.state.city;
    const PROVINCE = this.state.province;
    const COUNTRY = this.state.country;
    const ADDRESS = this.state.address;
    const PHONE = this.state.phone;
    const EMAIL = this.state.email;
    const IS_ACTIVE = this.state.isActive;

     putCompanies({
      TOKEN,
      PROF_ID,
      NAME,
      CITY,
      PROVINCE,
      COUNTRY,
      ADDRESS,
      PHONE,
      EMAIL,
      IS_ACTIVE
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
    
    if(this.state.isActive === true){
        this.setState({ isActive: false }, 
          () => {this.updateIsActive()})
     } else {
        this.setState({ isActive: true }, () => {
          this.updateIsActive();
        });
    }
};

  render() {
    return (
      <>
        <Card>
          <CardHeader className="companyHeader">
              <div className="compName">
                <CardTitle tag="h4">{this.state.companyname}</CardTitle>
              </div>
              <div>
                {this.state.isActive === true ? (
                  <button
                    className="isActiveCheckboxButton-true"
                    onClick={this.handleIsActiveButton}
                  >
                    <FontAwesomeIcon icon="check-circle" color="blue" size="2x"/>
                  </button>
                ) : (
                  <button
                    className="isActiveCheckboxButton-false" 
                    onClick={this.handleIsActiveButton}
                  >
                    X
                  </button>
            )}
              </div>
          </CardHeader>
          <CardBody>
            <Table responsive>
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
                <tr>
                  <th> Rating: </th>
                  <td>  
                      <StarRatings
                      id = "rating"
                      rating={this.state.rating || 0}
                      starRatedColor="blue"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="1px"
                    /> 
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      
        <Card>
          <CardBody>
            {!this.state.hasjob ? (
              <CardTitle tag="h4">
                {" "}
                {this.state.companyname} have not posted any job yet .
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
      </>
    );
  }
}
