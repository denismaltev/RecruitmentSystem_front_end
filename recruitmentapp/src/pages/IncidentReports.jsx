import React from "react";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";
import IncidentReportsList from "../components/IncidentReportsList";

const IncidentReports = (props) => {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12} md={6}>
            <IncidentReportsList {...props} auth={props.auth} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default IncidentReports;
