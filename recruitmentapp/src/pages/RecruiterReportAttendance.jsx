import React from "react";
import LabourersSelector from "../components/LabourersSelector";

export default class RecruiterReportAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourerId: 0,
    };
  }

  selectLabourer = (selected) => {
    console.log(selected);
    this.setState({ labourerId: selected.id });
  };

  render() {
    return (
      <div className="labourer-selector">
        <LabourersSelector
          auth={this.props.auth}
          // onChange={this.updateSkills}
          selected={this.state.labourerId || 0}
          placeholder="Choose the labourer"
          onChange={this.selectLabourer}
        />
      </div>
    );
  }
}
