import React from "react";
import UpcomingJobs from "../components/UpcomingJobs";
import PanelHeader from "../components/PanelHeader";

export default class LabourerUpcomingJobs extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        {/* <div className="content"> */}
        <UpcomingJobs {...this.props} labourerId={1} />
        {/* </div> */}
      </>
    );
  }
}
