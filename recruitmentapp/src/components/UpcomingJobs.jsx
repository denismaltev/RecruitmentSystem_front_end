import React from "react";
import { Table } from "react-bootstrap";
import { getLabourerJobs } from "../api/labourerJobApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import { Card, CardBody, CardHeader } from "reactstrap";

export default class UpcomingJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      jobResponse: [],
      page: 1,
      totalJob: 0,
      labourerId: props.labourerId
    };
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    this.showJobList();
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.labourerId &&
      prevProps.labourerId !== this.state.labourerId
    ) {
      this.showJobList();
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      labourerId: props.labourerId
    });
  }

  showJobList = async () => {
    const token = this.props.auth.JWToken;
    const count = config.NUMBER_OF_ROWS_PER_PAGE;
    var today = new Date();
    var fromDate = today.toISOString().split("T")[0];
    var currentDay = new Date();
    currentDay.setDate(today.getDate() + 14);
    var toDate = currentDay.toISOString().split("T")[0];
    var page = this.state.page;
    await getLabourerJobs({
      token,
      count,
      page,
      toDate,
      fromDate,
      labourerId: this.state.labourerId
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            jobList: res.data.result,
            totalJob: res.data.totalRows
          });
          this.props.numberOfUpcomingJobs &&
            this.props.numberOfUpcomingJobs(res.data.totalRows);
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
        this.paginate = this.paginate.bind(this);
      })
      .catch(function(error) {
        alert("Something went wrong! " + error.response.data.message);
      });
  };

  displayTableData() {
    return this.state.jobList.map(item => {
      return (
        <tr key={item.id}>
          <td> {item.date.toString().slice(0, 10)} </td>
          <td> {item.companyName} </td>
          <td> {item.jobTitle} </td>
          <td> {item.skillName} </td>
          <td> {item.companyAddress} </td>
          <td style={{textAlign: "right", paddingRight: "40px"}}> ${item.wageAmount} </td>
        </tr>
      );
    });
  }

  paginate = number => {
    this.setState({ page: number }, () => {
      this.showJobList();
    });
  };

  render() {
    return (
      <Card>
        <CardBody>
          <CardHeader tag="h5">Upcoming jobs</CardHeader>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Date</th>
                <th>Company</th>
                <th>Job</th>
                <th>Skill</th>
                <th>Address</th>
                <th>Wage / hr</th>
              </tr>
            </thead>
            <tbody>{this.displayTableData()}</tbody>
          </Table>
          <Pagination
            itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
            totalItem={this.state.totalJob}
            paginate={this.paginate}
          />
        </CardBody>
      </Card>
    );
  }
}
