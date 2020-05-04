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
      labourerId: 0,
      result: [],
      toDate: new Date(),
      fromDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 7
      ),
      //default from date is last week
      detailPageId: 0,
      page: 1,
      dateFilterd: false,
    };
    this.paginate = this.paginate.bind(this);
  }

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
    }
    var labourerId = this.state.labourerId;
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
        <tr
          key={item.labourerId}
          onClick={() => this.props.onLabourerSelect(2)}
        >
          <td>{item.labourerFullName}</td>
          <td>{item.labourerPhone}</td>
          <td>{item.labourerEmail}</td>
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
                      onChange={(selected) =>
                        this.setState({ labourerId: selected[0].id })
                      }
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
                      // isClearable
                      placeholderText=" From Date"
                      selected={this.state.fromDate}
                      onSelect={this.handleSelect}
                      onChange={(date) => this.handleChange(date, 1)}
                      maxDate={this.state.fromDate || null}
                    />
                  </InputGroup>
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
          <Row>
            <Col>
              <FormGroup>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="search-icon"
                  onClick={this.search}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
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
