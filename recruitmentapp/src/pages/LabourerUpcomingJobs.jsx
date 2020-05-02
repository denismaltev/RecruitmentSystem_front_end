import React from "react";
import UpcomingJobs from "../components/UpcomingJobs";

export default class LabourerUpcomingJobs extends React.Component {
  render() {
    return (
      <div className="page-content">
        <UpcomingJobs {...this.props} />
      </div>
    );
  }
}
