import React from "react";
import { Table } from "react-bootstrap";
import LabourersSelector from "../components/LabourersSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getLabourerJobs } from "../api/labourerJobApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class RecruiterReportAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idToSearch: 0,
      searchClicked: false,
      result: [],
      errorMessage: "",
      fromDate: new Date(),
      toDate: new Date(),
    };
    this.search = this.search.bind(this);
  }

  selectLabourer = (selected) => {
    this.setState({ idToSearch: selected[0].id });
  };

  search = async (event) => {
    if (this.state.idToSearch) {
      const token = this.props.auth.JWToken;
      var count = 20;
      var page = 1;
      var labourerId = this.state.idToSearch;
      var fromDate = this.state.fromDate.toISOString().split("T")[0];
      var toDate = this.state.toDate.toISOString().split("T")[0];
      var jobId = "";
      await getLabourerJobs({
        token,
        count,
        page,
        fromDate,
        toDate,
        jobId,
        labourerId,
      })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ result: res.data.result });
          } else {
            alert("ERROR: Something went wrong! " + res.statusText);
          }
        })
        .catch(function (error) {
          alert("Something went wrong! " + error.response.data.message);
        });
      this.setState({ errorMessage: "" });
      this.setState({ searchClicked: true });
    } else {
      this.setState({ errorMessage: "Please choose a labourer" });
    }
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

  displayTableData() {
    return this.state.result.map((item) => {
      return (
        <tr key={item.id}>
          <td> {item.date.toString().slice(0, 10)}</td>
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
        <div>
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
          <LabourersSelector
            auth={this.props.auth}
            selected={this.state.labourerId || 0}
            placeholder="Choose the labourer"
            onChange={this.selectLabourer}
          />
          <button className="search-button" onClick={this.search}>
            <FontAwesomeIcon icon={faSearch} color="blue" />
          </button>
          <h6>{this.state.errorMessage}</h6>
        </div>

        <div>
          {this.state.searchClicked && (
            <Table striped bordered hover>
              <thead className="table-secondary">
                <tr>
                  <th>Date</th>
                  <th>Company Name</th>
                  <th>Job Title</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>{this.displayTableData()}</tbody>
            </Table>
          )}
        </div>
      </div>
    );
  }
}
