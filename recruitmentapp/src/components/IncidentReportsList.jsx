import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import Pagination from "./Pagination";
import { config } from "../api/config.json";
import { getIncidentReports } from "../api/IncidentReportsApi";

const IncidentReportsList = (props) => {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    getIncidentReports({
      token: props.auth.JWToken,
      count: config.NUMBER_OF_ROWS_PER_PAGE,
      page: page,
    })
      .then((response) => {
        if (response.status === 200) {
          if (mounted) {
            setData(response.data.result);
            setTotalRows(response.data.totalRows);
          }
        }
      })
      .catch((error) => {
        alert("Something went wrong! " + error.response.data.message);
      });
    return () => (mounted = false);
  }, [page]);

  return (
    <Card>
      <CardHeader>
        {props.auth.userRole === "company" && (
          <p className="text-right">
            <a href="#/incident-report">Add Incident</a>
          </p>
        )}
        <h5 className="card-category">Incident reports</h5>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Company</th>
              <th>Job</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.companyName}</td>
                <td>{item.jobTitle}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
          totalItem={totalRows}
          paginate={(page) => setPage(page)}
        />
      </CardBody>
    </Card>
  );
};

export default IncidentReportsList;
