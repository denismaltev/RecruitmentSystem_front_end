import React, { useState } from "react";
import LabourerAttendance from "../components/LabourerAttendance";
import LabourerAttendanceDetail from "../components/LabourerAttendanceDetail";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";

const RecruiterReportAttendance = (props) => {
  const [filter, setFilter] = useState({});

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12} md={6}>
            <LabourerAttendance
              {...props}
              auth={props.auth}
              onSelectLabourer={(filter) => setFilter(filter)}
            />
          </Col>
          <Col xs={12} md={6}>
            <LabourerAttendanceDetail
              {...props}
              auth={props.auth}
              filter={filter}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RecruiterReportAttendance;
