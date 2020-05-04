import React from "react";
import { Card, CardHeader, Button } from "reactstrap";

const IncidentReportsList = (props) => {
  return (
    <Card>
      <CardHeader>
        <p className="text-right">
          <a href="#/incident-report">Add Incident</a>
        </p>
      </CardHeader>
    </Card>
  );
};

export default IncidentReportsList;
