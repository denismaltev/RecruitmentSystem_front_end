import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getAllCompanyJobs } from "../api/JobsApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";

export default class RecruiterJobsRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      page: 1,
      totalJobs: 0
    };
    this.getCompanyJobsFromAPI = this.getCompanyJobsFromAPI.bind(this);
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    this.getCompanyJobsFromAPI();
  }

  getCompanyJobsFromAPI = async () => {
    const token = this.props.auth.JWToken;
    const count = config.NUMBER_OF_ROWS_PER_PAGE;
    const page = this.state.page;
    await getAllCompanyJobs({ token, count, page }).then(res => {
      if (res.status === 200) {
        this.setState({
          jobList: res.data.result,
          totalJobs: res.data.totalRows
        });
        this.paginate = this.paginate.bind(this);
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
              starDimension="30px"
              starSpacing="1px"
            />{" "}
          </td>
        </tr>
      );
    });
  }

  paginate = number => {
    this.setState({ page: number }, () => {
      this.getCompanyJobsFromAPI();
    });
  };

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
        <Pagination
          itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
          totalItem={this.state.totalJobs}
          paginate={this.paginate}
        />
      </div>
    );
  }
}
