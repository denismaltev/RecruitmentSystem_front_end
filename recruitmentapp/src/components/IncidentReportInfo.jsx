import React, { useState, useEffect } from "react";
import { Card, CardBody, Table } from "reactstrap";
import { getIncidentReportDetails } from "../api/IncidentReportsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IncidentReportInfo = (props) => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (props.reportId) {
      getIncidentReportDetails({
        token: props.auth.JWToken,
        id: props.reportId,
      })
        .then((response) => {
          if (mounted) {
            if (response.status === 200) {
              setReport(response.data);
            } else {
              setReport({});
            }
          }
        })
        .catch((error) => {
          console.log("Something went wrong! " + error.response.data.message);
        });
    }
    return () => (mounted = false);
  }, [props.reportId, props.auth.JWToken]);

  return (
    <Card className="card-user">
      {report && (
        <CardBody>
          <div className="author">
            {props.auth.userRole === "company" && (
              <div className="text-right">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push(`/incident-report/${props.reportId}`);
                  }}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: "20px" }}
                    icon="edit"
                    color="#f96332"
                  />
                </a>
              </div>
            )}
            <a href="/" onClick={(e) => e.preventDefault()}>
              <h5 className="title">{report.companyName || ""}</h5>
            </a>
            <p className="description">Job: {report.jobTitle || ""}</p>
            <p className="description">
              Date:{" "}
              {report.date ? new Date(report.date).toLocaleDateString() : ""}
            </p>
          </div>
          <p className="description text-center">
            Summary: {report.summary || ""}
          </p>
          <div className="description">
            {report && report.labourers && report.labourers.length > 0 && (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Labourers involved</th>
                  </tr>
                </thead>
                <tbody>
                  {report.labourers.map((item, index) => (
                    <tr key={index}>
                      <td>{item.labourerFullName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default IncidentReportInfo;
