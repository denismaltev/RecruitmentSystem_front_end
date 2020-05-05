import React from "react";
import { getLabourerJobs } from "../api/labourerJobApi";
import { config } from "../api/config.json";
import { Card, CardBody, Table } from "reactstrap";
import Pagination from "./Pagination";

var count = config.NUMBER_OF_ROWS_PER_PAGE;
export default class JobLabourers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isLoading: true,
      jobId: this.props.jobId,
      jobTitle: this.props.title,
      labourers: []
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      page: 1,
      jobId: props.jobId,
      jobTitle: props.title
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.jobId && prevProps.jobId !== this.state.jobId) {
      this.getLabourersListFromAPI();
    }
  }

  componentDidMount() {
    this.getLabourersListFromAPI();
  }

  getLabourersListFromAPI = () => {
    const token = this.props.auth.JWToken;
    var count = 10;
    var page = this.state.page;
    var jobId = this.state.jobId;

    getLabourerJobs({ token, count, page, jobId }).then(res => {
      if (res.status === 200) {
        this.setState({
          labourers: res.data.result,
          isLoading: false
        });
        this.paginate = this.paginate.bind(this);
      }
    });
  };

  paginate = number => {
    this.setState({ page: number }, () => {
      this.getLabourersListFromAPI();
    });
  };

  render() {
    if (this.state.isLoading)
      return (
        <Card>
          <CardBody>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th scope="col">Skill Name</th>
                  <th scope="col">Labourer Full Name</th>
                  <th scope="col">Labourer Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="3">Your data is loading...</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <Pagination paginate={this.paginate} />
        </Card>
      );
    else {
      return (
        <Card>
          <CardBody>
            {/* <CardHeader className="card-category job-details-card">
              <h5 style={{ margin: 0, textAlign: "center"}}>Labourers List</h5>
            </CardHeader> */}
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th scope="col">Skill</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {this.state.labourers.map((labourer, index) => (
                  <tr key={index}>
                    <td>{labourer.skillName}</td>
                    <td>{labourer.labourerFullName}</td>
                    <td>{labourer.labourerPhone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          <Pagination paginate={this.paginate} />
        </Card>
      );
    }
  }
}
