import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardBody, Table } from "reactstrap";
import { getCompanyInvoiceDetails } from "../api/labourerJobApi";
import { config } from "../api/config.json";
import Pagination from "../components/Pagination";

const InvoiceDetails = props => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    if (props.filter.companyId) {
      getCompanyInvoiceDetails({
        token: props.auth.JWToken,
        count: config.NUMBER_OF_ROWS_PER_PAGE,
        page: page,
        companyId: props.filter.companyId,
        fromDate: props.filter.fromDate,
        toDate: props.filter.toDate
      })
        .then(response => {
          if (response?.data?.result) {
            setData(response.data.result);
            setTotalRows(response.data.totalRows);
          } else {
            setData([]);
            setTotalRows(0);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [page, props.filter.companyId]);

  return (
    <Card>
      <CardHeader>
        <CardHeader tag="h5" style={{ paddingBottom: "20px" }}>
          Invoice Details
        </CardHeader>
        <CardTitle tag="h5">{props.filter.companyName}</CardTitle>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th style={{ verticalAlign: "text-top" }}>Date</th>
              <th>Job Title</th>
              <th style={{ verticalAlign: "text-top" }}>Skill</th>
              <th>Labourer Name</th>
              <th className="text-right">Charge Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.jobTitle}</td>
                <td>{item.skillName}</td>
                <td>{item.labourerName}</td>
                <td className="text-right">${item.chargeAmount}</td>
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

export default InvoiceDetails;
