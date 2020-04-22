import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getAllLabourerjobs } from "../api/labourerJobApi";

export default class LabourerPastJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      jobResponse: [],
    };
    this.showJobList = this.showJobList.bind(this);
  }
  componentDidMount() {
    this.showJobList();
  }

  async showJobList() {
    const TOKEN = this.props.auth.JWToken;
    var count = 20;
    var today = new Date();
    var toDate = today.toISOString().split("T")[0];
    var currentDay = new Date();
    currentDay.setDate(today.getDate() - 14);
    var fromDate = currentDay.toISOString().split("T")[0];
    var page = 1;
    const PARAM = `count=${count}&toDate=${toDate}&page=${page}&fromDate=${fromDate}`;
    console.log(PARAM);

    await getAllLabourerjobs({ TOKEN, PARAM })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          this.setState({ jobResponse: res.data });
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
        <tr key={item.id}>
          <td> {item.CompnayName} </td>
          <td> {item.Title} </td>
          <td> {item.Address} </td>
          <td> {item.StartDate} </td>
          <td> {item.Wage} </td>
          <td>
            {" "}
            <StarRatings
              rating={item.Rating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
            />{" "}
          </td>
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
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
