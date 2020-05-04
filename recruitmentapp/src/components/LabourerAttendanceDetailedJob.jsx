import { Card, CardBody, Table } from "reactstrap";
import React from "react";
import { getLabourerJobsDetailedReport } from "../api/labourerJobApi";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";

export default class LabourerAttendanceDetailedJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalLabourers: null,
      result: [],
      page: 1,
    };
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    this.detail();
  }

  detail = async () => {
    const token = this.props.auth.JWToken;
    var page = this.state.page;
    var count = config.NUMBER_OF_ROWS_PER_PAGE;
    var detailPageId = this.props.detailPageId;
    console.log(detailPageId);
    var fromDate = this.props.fromDate;
    var toDate = this.props.toDate;
    await getLabourerJobsDetailedReport({
      token,
      count,
      page,
      fromDate,
      toDate,
      detailPageId,
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            result: res.data.result,
            totalLabourers: res.data.totalRows,
          });
          this.paginate = this.paginate.bind(this);
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch(function (error) {
        alert("Something went wrong! " + error.response.data.message);
      });
  };

  paginate = async (number) => {
    await this.setState({
      page: number,
    });
    this.detail();
  };

  displayTableData() {
    return this.state.result.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.date.toString().slice(0, 10)}</td>
          <td>{item.jobTitle}</td>
          <td>{item.skillName}</td>
          <td>{item.companyName}</td>
          <td>{item.companyPhone}</td>
          <td>${item.wageAmount}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <Card>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Date</th>
                <th>Job Title</th>
                <th>skillName</th>
                <th>Company Name</th>
                <th>company Phone</th>
                <th>Wage</th>
              </tr>
            </thead>
            <tbody>{this.displayTableData()}</tbody>
          </Table>
          <Pagination
            itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
            totalItem={this.state.totalLabourers}
            paginate={this.paginate}
          />
        </CardBody>
      </Card>
    );
  }
}
