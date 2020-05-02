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
      fromDate: new Date(),
      toDate: new Date(),
      totalLabourer: 0,
      page: 1,
      filterByDate: false,
    };
    this.paginate = this.paginate.bind(this);
  }

  selectLabourer = (selected) => {
    this.setState({ idToSearch: selected[0].id });
  };

  componentDidMount() {
    this.showAllLabourers();
  }

  showAllLabourers = async () => {
    const token = this.props.auth.JWToken;
    var page = this.state.page;
    var today = new Date();
    var toDate = today.toISOString().split("T")[0];
    var fromDate = new Date();
    fromDate.setDate(today.getDate() - 7);
    await getLabourerJobsReport({
      token,
      count,
      page,
      fromDate,
      toDate,
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
  };

  search = async (event) => {
    const token = this.props.auth.JWToken;
    var page = this.state.page;
    if (this.state.filterByDate) {
      var fromDate = this.state.fromDate.toISOString().split("T")[0];
      var toDate = this.state.toDate.toISOString().split("T")[0];
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

  showDate = (event) => {
    this.setState({
      filterByDate: true,
    });
  };

  paginate = async (number) => {
    await this.setState({
      page: number,
    });
    if (this.state.searchClicked) {
      this.search();
    } else {
      this.showAllLabourers();
    }
  };

  displayTableData() {
    return this.state.result.map((item) => {
      return (
        <tr key={item.labourerId}>
          <td>{item.labourerFullName}</td>
          <td>
            <table className="internal-table">
              <th>Job Title</th>
              <th>Amount</th>
              {item.jobs.map((x) => {
                return (
                  <tr key={x.jobId}>
                    <td>{x.jobTitle}</td>
                    <td>{x.wageAmount}</td>
                  </tr>
                );
              })}
            </table>
          </td>
          <td>{item.totalWage}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="page-content">
        <div>
          <DatePicker
            isClearable
            name="fromDate"
            selected={this.state.fromDate}
            onSelect={this.handleSelect}
            onChange={(date) => this.handleChange(date, 1)}
          />
          <DatePicker
            isClearable
            name="toDate"
            selected={this.state.toDate}
            onSelect={this.handleSelect}
            onChange={(date) => this.handleChange(date, 2)}
          />
          <LabourersSelector
            auth={this.props.auth}
            selected={this.state.labourerId || 0}
            placeholder="Choose the labourer"
            onChange={this.selectLabourer}
          />
          <button className="search-button" onClick={this.search}>
            <FontAwesomeIcon icon={faSearch} color="blue" />
          </button>
        </div>
        <div>
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
