import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardBody, Table } from "reactstrap";
import { getLabourerJobsDetailedReport } from "../api/labourerJobApi";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./Pagination";
import { config } from "../api/config.json";

const LabourerAttendanceDetail = (props) => {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalLabourers, setTotalLabourers] = useState(0);

  useEffect(() => {
    if (props.detailPageId) {
      getLabourerJobsDetailedReport({
        token: props.auth.JWToken,
        count: config.NUMBER_OF_ROWS_PER_PAGE,
        page: page,
        detailPageId: props.detailPageId,
        fromDate: props.fromDate,
        toDate: props.toDate,
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
  }, [page, props.labourer]);

  return (
    <Card>
      <CardHeader>
        <h5 className="card-category">Invoice details</h5>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Date</th>
              <th>Job Title</th>
              <th>skillName</th>
              <th>Company Name</th>
              <th>Company Phone</th>
              <th>Wage/hr</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr key={index}>
                <td>{item.date.toString().slice(0, 10)}</td>
                <td>{item.jobTitle}</td>
                <td>{item.skillName}</td>
                <td>{item.companyName}</td>
                <td>{item.companyPhone}</td>
                <td>${item.wageAmount}</td>
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
