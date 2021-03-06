import React from "react";
import { Table } from "react-bootstrap";
import { getLabourerJobs } from "../api/labourerJobApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import { Card, CardBody } from "reactstrap";

export default class UpcomingJobs extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      jobResponse: [],
      page: 1,
      totalJob: 0,
      labourerId: props.labourerId,
    };
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      labourerId: props.labourerId,
    });
  }

  showJobList = async () => {
    const token = this.props.auth.JWToken;
    const count = config.NUMBER_OF_ROWS_PER_PAGE;
    var today = new Date();
    var fromDate = today.toISOString().split("T")[0];
    var page = this.state.page;
    await getLabourerJobs({
      token,
      count,
      page,
      fromDate,
      labourerId: this.state.labourerId,
    })
      .then((res) => {
        if (this._isMounted) {
          if (res.status === 200) {
            this.setState({
              jobList: res.data.result,
              totalJob: res.data.totalRows,
            });
            this.props.numberOfUpcomingJobs &&
              this.props.numberOfUpcomingJobs(res.data.totalRows);
          } else {
            console.log("ERROR: Something went wrong! " + res.statusText);
          }
          this.paginate = this.paginate.bind(this);
        }
      })
      .catch(function (error) {
        console.log("Something went wrong! " + error.response.data.message);
      });
  };

  displayTableData() {
    return this.state.jobList.map((item) => {
      return (
        <tr key={item.id}>
          <td> {item.date.toString().slice(0, 10)} </td>
          <td> {item.companyName} </td>
          <td> {item.jobTitle} </td>
          <td> {item.skillName} </td>
          <td> {item.companyAddress} </td>
          <td className="text-right"> ${item.wageAmount} </td>
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
      <Card className="card-user">
        <CardBody>
          <h5 className="card-category">Upcoming jobs</h5>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Date</th>
                <th>Company</th>
                <th>Job</th>
                <th>Skill</th>
                <th>Address</th>
                <th className="text-right">Wage / hr</th>
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
