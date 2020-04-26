import React from "react";
import { Table } from "react-bootstrap";
import { getAllLabourerjobs } from "../api/labourerJobApi";
import Pagination from "../components/Pagination";

export default class LabourerUpcomingJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      jobResponse: [],
      page: 1,
    };
  }
  componentDidMount() {
    this.showJobList();
  }

  showJobList = async () => {
    const TOKEN = this.props.auth.JWToken;
    var count = 5;
    var today = new Date();
    var fromDate = today.toISOString().split("T")[0];
    var currentDay = new Date();
    currentDay.setDate(today.getDate() + 14);
    var toDate = currentDay.toISOString().split("T")[0];
    var pageNumber = this.state.page;
    const PARAM = `count=${count}&toDate=${toDate}&page=${pageNumber}&fromDate=${fromDate}`;
    await getAllLabourerjobs({ TOKEN, PARAM })
      .then((res) => {
        if (res.status === 200) {
          console.log(PARAM);
          this.setState({ jobList: res.data });
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
        this.paginate = this.paginate.bind(this);
      })
      .catch(function (error) {
        alert("Something went wrong! " + error.response.data.message);
      });
  };

  displayTableData() {
    return this.state.jobList.map((item) => {
      return (
        <tr key={item.id}>
          <td> {item.companyName} </td>
          <td> {item.jobTitle} </td>
          <td> {item.skillName} </td>
          <td> {item.companyAddress} </td>
          <td> {item.date.toString().slice(0, 10)} </td>
          <td> {item.wageAmount} </td>
        </tr>
      );
    });
  }

  paginate = (number) => {
    this.setState({ page: number }, () => {
      this.showJobList();
    });
  };

  render() {
    return (
      <div className="page-content">
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Company</th>
              <th>Job</th>
              <th>Skill</th>
              <th>Address</th>
              <th>Date</th>
              <th>Wage</th>
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
        <Pagination paginate={this.paginate} />
      </div>
    );
  }
}
