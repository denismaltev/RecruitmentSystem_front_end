import React from "react";
import { Table } from "react-bootstrap";
import LabourersSelector from "../components/LabourersSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getLabourerJobs } from "../api/labourerJobApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";

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
    console.log(toDate);
    console.log(fromDate);
    await getLabourerJobs({
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

  search = (event) => {
    const token = this.props.auth.JWToken;
    var page = this.state.page;
    if (this.state.idToSearch) {
      var labourerId = this.state.idToSearch;
    } else {
      var labourerId = "";
    }
    if (this.state.filterByDate) {
      var fromDate = this.state.fromDate.toISOString().split("T")[0];
      var toDate = this.state.toDate.toISOString().split("T")[0];
    } else {
      var fromDate = "";
      var toDate = "";
    }

    getLabourerJobs({
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
        <tr key={item.id}>
          <td> {item.date.toString().slice(0, 10)}</td>
          <td>{item.labourerFullName}</td>
          <td>{item.companyName}</td>
          <td>{item.jobTitle}</td>
          {item.qualityRating ? (
            <td>
              <FontAwesomeIcon icon={faCheck} color="green" />
            </td>
          ) : (
            <td>
              <FontAwesomeIcon icon={faTimes} color="red" />
            </td>
          )}
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="page-content">
        <div className="search-filter">
          <button className="search-button" onClick={this.showDate}>
            Filter by Date
          </button>
          {this.state.filterByDate && (
            <div className="date-picker">
              <DatePicker
                name="fromDate"
                selected={this.state.fromDate}
                onSelect={this.handleSelect}
                onChange={(date) => this.handleChange(date, 1)}
              />
              <DatePicker
                name="toDate"
                selected={this.state.toDate}
                onSelect={this.handleSelect}
                onChange={(date) => this.handleChange(date, 2)}
              />
            </div>
          )}
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
          <div>
            <Table striped bordered hover>
              <thead className="table-secondary">
                <tr>
                  <th>Date</th>
                  <th>Labourer Name</th>
                  <th>Company Name</th>
                  <th>Job Title</th>
                  <th>Attendance</th>
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
      </div>
    );
  }
}
