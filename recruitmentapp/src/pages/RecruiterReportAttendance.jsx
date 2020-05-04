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
  }
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col>
              <LabourerAttendance
                {...this.props}
                auth={this.props.auth}
                onLabourerSelect={(detailPageId) =>
                  this.setState({ detailPageId: detailPageId })
                }
              />
            </Col>
            <Col>
              <LabourerAttendanceDetailedJob
                {...this.props}
                auth={this.props.auth}
                detailPageId={this.props.detailPageId}
                fromDate={this.props.fromDate}
                toDate={this.props.toDate}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
