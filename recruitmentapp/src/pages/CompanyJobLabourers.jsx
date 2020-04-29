import React, { useState, useEffect }from "react";
import { Table } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { getAllLabourerjobs } from "../api/labourerJobApi";


export default class CompanyJobLabourers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        page: 1,
        isLoading: false,
        jobId: props.match.params.id,
        // job: {
        //   id: props.match.params.id,
        // },
        labourers: [],
      };
    }

    componentDidMount() {
      this.getLabourersListFromAPI();
      console.log(this.state.jobId);
    }

    getLabourersListFromAPI = async () => {
      const token = this.props.auth.JWToken;
      var count = 10;
      var page = this.state.page;
      var jobId = this.state.jobId;

      await getAllLabourerjobs({ token, count, page, jobId }).then((res) => {
        if (res.state === 200) {
          this.setState({ labourers: res.data.result });
        } else {
        }
        //this.paginate = this.paginate.bind(this);
      });
    };

    // paginate = (number) => {
    //   this.setState({ page: number }, () => {
    //     this.getLabourersListFromAPI();
    //   });
    // };

    render() {
      return (
        <div className="page-content">
          <h1>Labourers List</h1>
          <h2>{this.state.labourers}</h2>
          <Table striped bordered hover>
            <thead className="table-secondary">
              <tr>
                <th scope="col">Skill Name</th>
                <th scope="col">Labourer Full Name</th>
                <th scope="col">Labourer Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {this.state.labourers.map((labourer, index) => (
              <tr key={index}>
                <td>{labourer.skillName}</td>
                <td>{labourer.labourerFullName}</td>
                <td>{labourer.labourerPhone}</td>
              </tr>))}
            </tbody>
          </Table>
        </div>
      );
    }
}