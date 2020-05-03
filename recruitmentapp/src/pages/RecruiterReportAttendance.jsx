import React from "react";
import LabourerAttendance from "../components/LabourerAttendance";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";

export default class RecruiterReportAttendance extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12} md={6}>
              <LabourerAttendance {...this.props} auth={this.props.auth} />
            </Col>
            <Col xs={12} md={6}></Col>
          </Row>
        </div>
      </>
    );
  }
}
