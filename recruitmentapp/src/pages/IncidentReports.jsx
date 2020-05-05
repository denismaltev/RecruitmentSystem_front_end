import React, { useState } from "react";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";
import IncidentReportsList from "../components/IncidentReportsList";
import IncidentReportInfo from "../components/IncidentReportInfo";

const IncidentReports = (props) => {
  const [reportId, setReportId] = useState(null);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12} md={9}>
            <IncidentReportsList
              {...props}
              auth={props.auth}
              onReportSelect={(reportId) => setReportId(reportId)}
            />
          </Col>
          <Col xs={12} md={3}>
            <IncidentReportInfo
              {...props}
              auth={props.auth}
              reportId={reportId}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default IncidentReports;
