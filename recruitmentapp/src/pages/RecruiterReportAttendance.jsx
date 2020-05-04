import React, { useState } from "react";
import LabourerAttendance from "../components/LabourerAttendance";
import LabourerAttendanceDetailedJob from "../components/LabourerAttendanceDetailedJob";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";

export default class RecruiterReportAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailPageId: 0,
    };

    componentDidMount() {
      this.search();
    }
  }
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <h1>{this.state.detailPageId}</h1>
            <Col>
              <LabourerAttendance
                {...this.props}
                auth={this.props.auth}
                onLabourerSelect={(selected) =>
                  this.setState({ detailPageId: selected })
                }
              />
            </Col>
            <Col>
              <LabourerAttendanceDetailedJob
                {...this.props}
                auth={this.props.auth}
                detailPageId={this.state.detailPageId}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
