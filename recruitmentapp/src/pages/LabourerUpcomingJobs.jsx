import React from "react";
import { Table } from "react-bootstrap";
import { getAlljobs } from "../api/labourerJobApi";

export default class LabourerUpcomingJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
    };
    this.showJobList = this.showJobList.bind(this);
  }
  componentDidMount() {
    this.showJobList();
  }

  async showJobList() {
    //hard coded response example
    var hardcodeddata = [
      {
        Id: 1,
        Title: "Painter",
        CompnayName: "ABC",
        Address: "Vancouver",
        StartDate: 2020 - 4 - 12,
        Wage: 18,
      },
      {
        Id: 2,
        Title: "Electrician",
        CompnayName: "DEF",
        Address: "Montreal",
        StartDate: 2020 - 5 - 22,
        Wage: 16,
      },
    ];
    const TOKEN = this.props.auth.JWToken;
    // this.setState({ jobList: hardcodeddata });
    await getAlljobs({ TOKEN })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ jibList: data });
      })
      .catch((error) => {
        alert(error);
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
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1> Upcoming Jobs</h1>
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Company</th>
              <th>Job</th>
              <th>Address</th>
              <th>Date</th>
              <th>Wage</th>
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
