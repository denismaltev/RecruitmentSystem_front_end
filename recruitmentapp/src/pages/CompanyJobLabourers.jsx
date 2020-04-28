import React, { useState, useEffect }from "react";
import { Table } from "react-bootstrap";
import { getAllLabourerjobs } from "../api/labourerJobApi";


export default class CompanyJobLabourers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        labourers: [],
      };
    }

    componentDidMount() {
      this.getLabourersListFromAPI();
    }

    getLabourersListFromAPI = async () => {
      const token    = this.props.auth.JWToken;
      var count      = 10;
      var pageNumber = this.state.page;
      var jobId      = this.state.jobId;
      var today      = new Date();
      var fromDate   = today.toISOString().split("T")[0];
      var toDate     = today.toISOString().split("T")[0];

      const param = `count=${count}&page=${pageNumber}&jobId=${jobId}&fromDate=${fromDate}&toDate=${toDate}`;
      await getAllLabourerjobs({ token, param }).then((res) => {
        this.setState({ labourers: res.data.result });
      });
    }

    render() {
      return (
        <div className="page-content">
          <h1>Job Title Placeholder Labourers List</h1>
          <Table striped bordered hover>
            <thead className="table-secondary">
              <tr>
                <th scope="col">Skill Name</th>
                <th scope="col">Labourer Full Name</th>
                <th scope="col">Labourer Phone Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Placeholder - Painter</td>
                <td>Placeholder - John Smith</td>
                <td>Placeholder - 777-888-9999</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }
}