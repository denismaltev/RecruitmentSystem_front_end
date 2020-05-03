import React from "react";
import LabourerAttendance from "../components/LabourerAttendance";
import LabourerAttendanceDetailedJob from "../components/LabourerAttendanceDetailedJob";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";

export default class RecruiterReportAttendance extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col>
              <LabourerAttendance {...this.props} auth={this.props.auth} />
            </Col>
            <Col>
              {/* <LabourerAttendanceDetailedJob
                {...this.props}
                labourerId={this.state.labourerId}
                auth={this.props.auth} */}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
