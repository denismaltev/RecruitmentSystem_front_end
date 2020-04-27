import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getAllLabourerjobs } from "../api/labourerJobApi";
import { postRatings } from "../api/labourerJobApi";
export default class LabourerPastJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      idToGrade: 0,
      rating: 0,
    };
    this.showJobList = this.showJobList.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }
  componentDidMount() {
    this.showJobList();
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
  }

  addRating = (event) => {
    const token = this.props.auth.JWToken;

    // const PARAM = `idToGrade=${this.state.idToGrade}&rating=${this.state.newRating}`;
    // postRatings({ token, PARAM })
    //   .then((res) => {
    //     if (res.status === 200) {
    //     } else {
    //       alert("ERROR: Something went wrong! " + res.statusText);
    //     }
    //   })
    //   .catch(function (error) {
    //     alert("Something went wrong! " + error.response.data.message);
    //   });
  };

  async showJobList() {
    const token = this.props.auth.JWToken;
    var count = 20;
    var today = new Date();
    var toDate = today.toISOString().split("T")[0];
    var currentDay = new Date();
    currentDay.setDate(today.getDate() - 14);
    var fromDate = currentDay.toISOString().split("T")[0];
    var page = 1;
    const param = `count=${count}&toDate=${toDate}&page=${page}&fromDate=${fromDate}`;
    console.log(param);
    await getAllLabourerjobs({ token, param })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          this.setState({ jobList: res.data });
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch(function (error) {
        alert("Something went wrong! " + error.response.data.message);
      });
  }

  displayTableData() {
    return this.state.jobList.map((item) => {
      return (
        <tr key={item.id} onClick={() => this.addRating(item)}>
          <td> {item.companyName} </td>
          <td> {item.jobTitle} </td>
          <td> {item.companyAddress} </td>
          <td> {item.date.toString().slice(0, 10)} </td>
          <td> {item.wageAmount} </td>
          <td>
            <StarRatings
              rating={item.jobRating ? item.jobRating : this.state.rating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
              changeRating={item.jobRating ? "" : this.changeRating}
            />
          </td>
          {/* {item.jobRating ? (
            <td></td>
          ) : (
            <td>
              <button onClick={this.addRating}>Rate the Job</button>
            </td>
          )} */}
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <h1> Past Jobs</h1>
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Company</th>
              <th>Job</th>
              <th>Address</th>
              <th>Date</th>
              <th>Wage</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
