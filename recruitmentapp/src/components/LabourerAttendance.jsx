import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  FormGroup,
  InputGroup,
} from "reactstrap";
import React from "react";
import LabourersSelector from "../components/LabourersSelector";
import { getLabourerJobsReport } from "../api/labourerJobApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class LabourerAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idToSearch: 0,
      searchClicked: false,
      result: [],
      fromDate: null,
      toDate: null,
      totalLabourers: null,
      page: 1,
      dateFilterd: false,
    };
    this.paginate = this.paginate.bind(this);
  }

  selectLabourer = (selected) => {
    this.setState({ idToSearch: selected[0].id });
  };

  componentDidMount() {
    this.search();
  }

  search = async (event) => {
    const token = this.props.auth.JWToken;
    var page = this.state.page;
    var count = config.NUMBER_OF_ROWS_PER_PAGE;
    if (this.state.dateFilterd) {
      var fromDate = this.state.fromDate;
      var toDate = this.state.toDate;
    } else {
      var today = new Date();
      var toDate = today;
      var fromDate = new Date();
      fromDate.setDate(today.getDate() - 7);
    }
    var labourerId = this.state.idToSearch;
    await getLabourerJobsReport({
      token,
      count,
      page,
      fromDate,
      toDate,
      labourerId,
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
    this.setState({ searchClicked: true });
  };

  handleChange(date, flag) {
    this.setState({
      dateFilterd: true,
    });
    if (flag === 1) {
      this.setState({
        fromDate: date,
      });
    }
    if (flag === 2) {
      this.setState({
        toDate: date,
      });
    }
  }

  paginate = async (number) => {
    await this.setState({
      page: number,
    });
    this.search();
  };

  displayTableData() {
    return this.state.result.map((item) => {
      return (
        <tr key={item.labourerId}>
          <td>{item.labourerFullName}</td>
          <td>
            <div className="internal-table-wrapper">
              <Table className="internal-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>wageAmount</th>
                  </tr>
                </thead>
                {item.jobs.map((x) => {
                  return (
                    <tr key={x.jobId}>
                      <td>{x.jobTitle}</td>
                      <td>{x.wageAmount}$</td>
                    </tr>
                  );
                })}
              </Table>
            </div>
            <yd>{item.totalWage}</yd>
          </td>
          <td>{item.totalWage}$</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <h5 className="card-category">Attendance</h5>
          <h5 className="card-category">
            <Row>
              <Col md={12} lg={4}>
                <FormGroup>
                  <label>Labourer</label>
                  <InputGroup>
                    <LabourersSelector
                      auth={this.props.auth}
                      selected={this.state.labourerId || 0}
                      placeholder="Select labourer"
                      onChange={this.selectLabourer}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md={12} lg={4}>
                <FormGroup>
                  <label>From date</label>
                  <InputGroup>
                    <DatePicker
                      className="form-control"
                      name="fromDate"
                      isClearable
                      placeholderText=" From Date"
                      selected={this.state.fromDate}
                      onSelect={this.handleSelect}
                      onChange={(date) => this.handleChange(date, 1)}
                      maxDate={this.state.fromDate || null}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon"
                    onClick={this.search}
                  />
                </FormGroup>
              </Col>
              <Col md={12} lg={4}>
                <FormGroup>
                  <label>To date</label>
                  <InputGroup>
                    <DatePicker
                      className="form-control"
                      name="toDate"
                      placeholderText=" To Date"
                      selected={this.state.toDate}
                      onSelect={this.handleSelect}
                      onChange={(date) => this.handleChange(date, 2)}
                      maxDate={this.state.toDate || null}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
          </h5>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Labourer Name</th>
                {/* <th>Jobs</th> */}
                <th>Total Amount</th>
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
