import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getLabourerJobs, postRatings } from "../api/labourerJobApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import ReactTooltip from "react-tooltip";

const todayDate = new Date().getTime();
export default class LabourerPastJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      page: 1,
      message: "",
      rowToUpdate: {},
      totalJob: 0,
    };
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    this.showJobList();
  }

  componentDidUpdate() {
    setTimeout(() => this.setState({ message: "" }), 7000);
  }

  changeRating = (item, newRating) => {
    const array = this.state.jobList;
    array[array.indexOf(item)].jobRating = newRating;
    this.setState({
      jobList: array,
    });
    const token = this.props.auth.JWToken;
    const param = `idToGrade=${item.id}&rating=${newRating}`;
    postRatings({ token, param })
      .then((res) => {
        if (res.status === 200) {
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
        console.log("Something went wrong! " + error.response.data.message);
      });
  };

  displayTableData = () => {
    return this.state.jobList.map((item) => {
      return (
        <tr key={item.id}>
          <td> {item.date.toString().slice(0, 10)} </td>
          <td> {item.companyName} </td>
          <td> {item.jobTitle} </td>
          <td> {item.companyAddress} </td>
          <td> {item.wageAmount} </td>
          {Math.round(
            Math.abs(todayDate - new Date(item.date).getTime()) / 120960000
          ) > 14 ? (
            <td>
              <p data-tip="You are not allowed to add or change the rating after 2 weeks">
                <StarRatings
                  rating={item.jobRating}
                  starRatedColor="blue"
                  numberOfStars={5}
                />
              </p>
              <ReactTooltip />
            </td>
          ) : (
            <td>
              <StarRatings
                rating={item.jobRating || 0}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
                changeRating={(newRating) => this.changeRating(item, newRating)}
              />
            </td>
          )}
        </tr>
      );
    });
  };

  showJobList = () => {
    const token = this.props.auth.JWToken;
    const count = config.NUMBER_OF_ROWS_PER_PAGE;
    var today = new Date();
    var toDate = today.toISOString().split("T")[0];
    var page = this.state.page;
    getLabourerJobs({ token, count, page, toDate })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            jobList: res.data.result,
            totalJob: res.data.totalRows,
          });
          this.paginate = this.paginate.bind(this);
        } else {
          this.setState({
            message: `ERROR: Something went wrong! + ${res.statusText}`,
          });
        }
      })
      .catch(function (error) {
        console.log("Something went wrong! " + error.response.data.message);
      });
  };

  paginate = (number) => {
    this.setState({ page: number }, () => {
      this.showJobList();
    });
  };

  render() {
    return (
      <div className="page-content">
        <h6> {this.state.message && this.state.message}</h6>
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Job</th>
              <th>Address</th>
              <th>Wage</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
        <Pagination
          itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
          totalItem={this.state.totalJob}
          paginate={this.paginate}
        />
      </div>
    );
  }
}
