import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import Pagination from "../components/Pagination";
import PanelHeader from "../components/PanelHeader";
import { config } from "../api/config.json";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import ReactTooltip from "react-tooltip";
import {
  getJobInfoByCompany,
  postJobRatingsByCompany,
} from "../api/labourerJobApi";

export default class LabourerAttendence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      totalJobs: 1,
      page: 1,
      message: "",
      rowToUpdate: {},
      PassedDays: null,
    };

    this.paginate = this.paginate.bind(this);
    this.fetchJobInfo = this.fetchJobInfo.bind(this);
  }

  componentDidMount() {
    this.fetchJobInfo();
  }
  fetchJobInfo = async () => {
    const token = this.props.auth.JWToken;
    const PAGE = this.state.page;
    const param = `count=${config.NUMBER_OF_ROWS_PER_PAGE}&page=${PAGE}`;
    await getJobInfoByCompany({ token, param })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            jobs: res.data.result,
            totalJobs: res.data.totalRows,
          });
          console.log("Success !!" + this.state.totalJobs);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeRating = (item, labourerjobId, newRating) => {
    const array = this.state.jobs;
    array[array.indexOf(item)].qualityRating = newRating;
    console.log("ID : " + labourerjobId + " Item id :" + item);
    this.setState({
      jobs: array,
    });
    const token = this.props.auth.JWToken;
    const param = `qualityRating=${newRating}`;
    postJobRatingsByCompany({ token, param, labourerjobId })
      .then((res) => {
        if (res.status === 200) {
          console.log("Success !!");
          this.setState({
            message: "The rating has been added",
          });
        } else {
          this.setState({
            message: `ERROR: Something went wrong! + ${res.statusText}`,
          });
        }
      })
      .catch(function (error) {
        this.setState({
          message: `ERROR: Something went wrong! + ${error.response.data.message}`,
        });
      });
  };

  paginate = (number) => {
    this.setState({ page: number }, () => {
      this.fetchJobInfo();
    });
  };

  displayTableData = () => {
    const todayDate = new Date().getTime();
    const fourteenDaysSeconds = 120960000;
    return this.state.jobs.map((item) => {
      return (
        <tr key={item.id + 1}>
          <td> {item.jobTitle} </td>
          <td> {item.labourerFullName}</td>
          <td> {item.skillName} </td>
          <td> {item.labourerPhone}</td>
          <td> {item.date.toString().slice(0, 10)}</td>
          {Math.round(
            (todayDate - new Date(item.date).getTime()) / fourteenDaysSeconds
          ) < 0 ? (
            <td>
              <p data-tip="You are not allowed to rate the job after 2 weeks or before it is done">
                <StarRatings
                  rating={item.qualityRating}
                  starRatedColor="blue"
                  numberOfStars={5}
                  starDimension="25px"
                  starSpacing="1px"
                />
              </p>
              <ReactTooltip />
            </td>
          ) : (
            <td>
              <StarRatings
                rating={item.qualityRating || 0}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
                starDimension="25px"
                starSpacing="1px"
                changeRating={(newRating) =>
                  this.changeRating(item, item.id, newRating)
                }
              />
            </td>
          )}
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h5 className="card-category">Labourer Attendence</h5>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th scope="col">Job Title</th>
                        <th scope="col">Labourer Name</th>
                        <th scope="col">Job Skill</th>
                        <th scope="col">Labourer Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Quality Rating</th>
                      </tr>
                    </thead>
                    <tbody>{this.displayTableData()}</tbody>
                  </Table>

                  <Pagination
                    itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
                    totalItem={this.state.totalJobs}
                    paginate={this.paginate}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
