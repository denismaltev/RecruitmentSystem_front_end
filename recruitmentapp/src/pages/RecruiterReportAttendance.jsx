import React from "react";
import { Table } from "react-bootstrap";
import LabourersSelector from "../components/LabourersSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class RecruiterReportAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourerId: 0,
      searchClicked: false,
      result: [],
    };
    this.search = this.search.bind(this);
  }
  selectLabourer = (selected) => {
    console.log(selected);
    this.setState({ labourerId: selected.id });
  };

  search() {
    this.setState({ searchClicked: true });
  }

  displayTableData() {
    return this.state.result.map((item) => {
      return (
        <tr>
          <td>{item.date}</td>
          <td>{item.companyName}</td>
          <td>{item.jobTitle}</td>
          <td>{item.qualityRating}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <div>
          <LabourersSelector
            auth={this.props.auth}
            selected={this.state.labourerId || 0}
            placeholder="Choose the labourer"
            onChange={this.selectLabourer}
          />
          <button onClick={this.search}>
            <FontAwesomeIcon icon={["fas", "fa-search"]} color="blue" />
          </button>
        </div>
        <div>
          {this.state.searchClicked && (
            <Table striped bordered hover>
              <thead className="table-secondary">
                <tr>
                  <th></th>
                  <th>Company</th>
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
