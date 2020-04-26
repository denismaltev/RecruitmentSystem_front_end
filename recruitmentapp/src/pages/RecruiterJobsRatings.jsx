import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getAllCompanyJobs } from "../api/JobsApi";

export default class RecruiterJobsRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
    };
    this.getCompanyJobsFromAPI = this.getCompanyJobsFromAPI.bind(this);
    this.displayTableData = this.displayTableData.bind(this);
  }
  componentDidMount() {
    this.getCompanyJobsFromAPI();
    this.displayTableData();
  }

  getCompanyJobsFromAPI = async () => {
    const token = this.props.auth.JWToken;
    await getAllCompanyJobs({ token })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ jobList: res.data });
        }
      });
  };

  displayTableData() {
    return this.state.jobList.map((job, index) => {
      return (
        <tr key={index}>
          <td>{job.companyName}</td>
          <td> {job.title} </td>
          <td>
            {" "}
            <StarRatings
              rating={job.rating}
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
      <div className="page-content">
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
