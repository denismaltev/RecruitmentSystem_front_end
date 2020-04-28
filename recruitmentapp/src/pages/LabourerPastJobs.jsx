import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getAllLabourerjobs, postRatings } from "../api/labourerJobApi";
import Pagination from "../components/Pagination";
export default class LabourerPastJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      page: 1,
      message: "",
      rowToUpdate: {},
    };
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
        this.setState({
          message: `ERROR: Something went wrong! + ${error.response.data.message}`,
        });
      });
  };

  displayTableData = () => {
    return this.state.jobList.map((item) => {
      return (
        <tr key={item.id + 1}>
          <td> {item.companyName} </td>
          <td> {item.jobTitle} </td>
          <td> {item.companyAddress} </td>
          <td> {item.date.toString().slice(0, 10)} </td>
          <td> {item.wageAmount} </td>
          {item.jobRating ? (
            <td>
              <StarRatings
                rating={item.jobRating}
                starRatedColor="blue"
                numberOfStars={5}
              />
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
    var count = 10;
    var today = new Date();
    var toDate = today.toISOString().split("T")[0];
    var currentDay = new Date();
    currentDay.setDate(today.getDate() - 14);
    var pageNumber = this.state.page;
    const param = `count=${count}&toDate=${toDate}&page=${pageNumber}`;
    getAllLabourerjobs({ token, param })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ jobList: res.data.result });
          this.paginate = this.paginate.bind(this);
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
      this.showJobList();
    });
  };

  render() {
    return (
      <div>
        <h6> {this.state.message && this.state.message}</h6>
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Company</th>
              <th>Job</th>
              <th>Address</th>
              <th>Date</th>
              <th>Wage</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
        <Pagination paginate={this.paginate} />
      </div>
    );
  }
}
