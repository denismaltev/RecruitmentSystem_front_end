import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import PanelHeader from "../components/PanelHeader";
import { getAllCompanyJobs } from "../api/JobsApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

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
              starRatedColor="#2CA8FF"
              numberOfStars={5}
              name="rating"
              starDimension="25px"
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
      <>
      <PanelHeader size="sm" />
      <div className="content">
      <Row>
        <Col>
          <Card>
          <CardHeader>
          <h5 className="card-category">Job Rating</h5>
          </CardHeader> 
            <CardBody>
                <Table responsive>
                  <thead className="text-primary">
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
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
      </>
    );
  }
}
