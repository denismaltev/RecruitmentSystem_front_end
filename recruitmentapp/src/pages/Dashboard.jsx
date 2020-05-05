import React, { Component } from "react";
import PanelHeader from "../components/PanelHeader";

class Dashboard extends Component {
  render() {
    return (
      <>
        <PanelHeader size="lg" auth={this.props.auth} />
        <div className="content"></div>
      </>
    );
  }
}

export default Dashboard;
