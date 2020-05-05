import React from "react";
import PanelHeader from "../components/PanelHeader";
import IncidentReportForm from "../components/IncidentReportForm";
import { Row, Col } from "reactstrap";

const IncidentReport = (props) => {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col>
            <IncidentReportForm
              {...props}
              auth={props.auth}
              jobId={props.match.params.id}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default IncidentReport;
