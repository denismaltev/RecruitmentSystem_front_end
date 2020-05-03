import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardBody, Table } from "reactstrap";
import { getCompanyInvoiceDetails } from "../api/labourerJobApi";
import { config } from "../api/config.json";
import Pagination from "../components/Pagination";

const InvoiceDetails = (props) => {
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
        toDate: props.filter.toDate,
      })
        .then((response) => {
          if (response?.data?.result) {
            setData(response.data.result);
            setTotalRows(response.data.totalRows);
          } else {
            setData([]);
            setTotalRows(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [page, props.filter.companyId]);

  return (
    <Card>
      <CardHeader>
        <h5 className="card-category">Invoice details</h5>
        <CardTitle tag="h4">{props.filter.companyName}</CardTitle>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Date</th>
              <th>Job</th>
              <th>Skill</th>
              <th>Labourer</th>
              <th>Labourer phone</th>
              <th>Labourer email</th>
              <th className="text-right">Charge amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.jobTitle}</td>
                <td>{item.skillName}</td>
                <td>{item.labourerName}</td>
                <td>{item.labourerPhone}</td>
                <td>{item.labourerEmail}</td>
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
