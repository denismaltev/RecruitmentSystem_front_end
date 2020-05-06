import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { getLabourerJobsDetailedReport } from "../api/labourerJobApi";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./Pagination";
import { config } from "../api/config.json";

const LabourerAttendanceDetail = (props) => {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalLabourers, setTotalLabourers] = useState(0);

  useEffect(() => {
    if (props.filter.labourerId) {
      getLabourerJobsDetailedReport({
        token: props.auth.JWToken,
        count: config.NUMBER_OF_ROWS_PER_PAGE,
        page: page,
        detailPageId: props.filter.labourerId,
        fromDate: props.filter.fromDate,
        toDate: props.filter.toDate,
      })
        .then((response) => {
          if (response?.data?.result) {
            setResult(response.data.result);
            setTotalLabourers(response.data.totalRows);
          } else {
            setResult([]);
            setTotalLabourers(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [page, props.filter, props.auth.JWToken]);

  return (
    <Card>
      <CardHeader>
        <h5 className="card-category">Payroll Details</h5>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th style={{ verticalAlign: "text-top", whiteSpace: "nowrap" }}>
                Date
              </th>
              <th>Company Name</th>
              <th>Job Title</th>
              <th style={{ verticalAlign: "text-top" }}>Skill</th>
              <th className="text-right" style={{ verticalAlign: "text-top" }}>
                Wage /hr
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr key={index}>
                <td style={{ whiteSpace: "nowrap" }}>
                  {item.date.toString().slice(0, 10)}
                </td>
                <td>{item.companyName}</td>
                <td>{item.jobTitle}</td>
                <td>{item.skillName}</td>
                <td className="text-right">${item.wageAmount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
          totalItem={totalLabourers}
          paginate={(page) => setPage(page)}
        />
      </CardBody>
    </Card>
  );
};
export default LabourerAttendanceDetail;
