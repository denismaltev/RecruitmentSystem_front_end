import React from "react";
import { Table } from "react-bootstrap";
import LabourersSelector from "../components/LabourersSelector";
import { getLabourerJobsReport } from "../api/labourerJobApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

var count = 5;
export default class RecruiterReportAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idToSearch: 0,
      searchClicked: false,
      result: [],
      fromDate: null,
      toDate: null,
      totalLabourer: null,
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
            totalLabourer: res.data.totalRows,
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
        fromDateselected: true,
      });
    }
    if (flag === 2) {
      this.setState({
        toDate: date,
        toDateselected: true,
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
          </td>
          <td>{item.totalWage}$</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="page-content">
        <div className="filter">
          <div>
            <DatePicker
              isClearable
              name="fromDate"
              placeholderText=" From Date"
              selected={this.state.fromDate}
              onSelect={this.handleSelect}
              onChange={(date) => this.handleChange(date, 1)}
              maxDate={this.state.fromDate || null}
            />
            <DatePicker
              isClearable
              name="toDate"
              placeholderText=" To Date"
              selected={this.state.toDate}
              onSelect={this.handleSelect}
              onChange={(date) => this.handleChange(date, 2)}
              maxDate={this.state.toDate || null}
            />
          </div>
          <LabourersSelector
            auth={this.props.auth}
            selected={this.state.labourerId || 0}
            placeholder="Select labourer"
            onChange={this.selectLabourer}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={this.search}
          />
        </div>
        <div>
          <h3>{this.state.errorMessage}</h3>
          <Table striped bordered hover>
            <thead className="table-secondary">
              <tr>
                <th>Labourer Name</th>
                <th>Jobs</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>{this.displayTableData()}</tbody>
          </Table>
          <Pagination
            itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
            totalItem={this.state.totalLabourer}
            paginate={this.paginate}
          />
        </div>
      </div>
    );
  }
}
