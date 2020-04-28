import React from "react";
import LabourersSelector from "../components/LabourersSelector";

export default class RecruiterReportAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourers: [],
    };
  }
  render() {
    return (
      <div>
        <LabourersSelector
          auth={this.props.auth}
          selected={this.state.labourers || []}
          // onChange={this.updateSkills}
          placeholder="Choose the labourer"
        />
      </div>
    );
  }
}
