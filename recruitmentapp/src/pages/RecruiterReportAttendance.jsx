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
      fromDate: "",
      toDate: "",
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
                onSelectLabourer={(id, from, to) => {
                  this.setState({
                    detailPageId: id,
                    fromDate: from,
                    toDate: to,
                  });
                }}
              />
            </Col>
            <Col>
              {this.state.detailPageId > 0 && (
                <LabourerAttendanceDetailedJob
                  {...this.props}
                  auth={this.props.auth}
                  detailPageId={this.state.detailPageId}
                  fromDate={this.state.fromDate}
                  toDate={this.state.toDate}
                />
              )}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
