import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  FormGroup,
  InputGroup,
} from "reactstrap";
import { config } from "../api/config.json";
import Pagination from "../components/Pagination";
import { getInvoices } from "../api/labourerJobApi";
import DatePicker from "react-datepicker";
import CompaniesSelector from "./CompaniesSelector";

const Invoices = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [filter, setFilter] = useState({
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), //default filter last month
    toDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    companyId: null,
  });

  useEffect(() => {
    let mounted = true;
    getInvoices({
      token: props.auth.JWToken,
      count: config.NUMBER_OF_ROWS_PER_PAGE,
      page: page,
      fromDate: filter.fromDate,
      toDate: filter.toDate,
      companyId: filter.companyId,
    })
      .then((response) => {
        if (mounted) {
          if (response?.data?.result) {
            setData(response.data.result);
            setTotalRows(response.data.totalRows);
          } else {
            setData([]);
            setTotalRows(0);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, [page, filter, props.auth.JWToken]);

  const onChangeCompany = (company) => {
    setFilter({
      ...filter,
      companyId: company && company.length > 0 ? company[0].id : null,
    });
    props.onInvoiceSelect({});
  };

  const onChangeFromDate = (fromDate) => {
    setFilter({ ...filter, fromDate: fromDate });
    props.onInvoiceSelect({});
  };

  const onChangeToDate = (toDate) => {
    setFilter({ ...filter, toDate: toDate });
    props.onInvoiceSelect({});
  };

  return (
    <Card>
      <CardHeader>
        <h5 className="card-category">Invoices</h5>
        <Row>
          <Col md={12} lg={4}>
            <FormGroup>
              <label style={{ paddingLeft: "15px" }}>Company</label>
              <InputGroup className="company-selector">
                <CompaniesSelector
                  auth={props.auth}
                  placeholder="Select Company"
                  onChange={(company) => onChangeCompany(company)}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={12} lg={4}>
            <FormGroup>
              <label style={{ paddingLeft: "15px" }}>From date</label>
              <InputGroup>
                <DatePicker
                  className="form-control"
                  name="fromDate"
                  selected={filter.fromDate}
                  onChange={(fromDate) => onChangeFromDate(fromDate)}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={12} lg={4}>
            <FormGroup>
              <label style={{ paddingLeft: "15px" }}>To date</label>
              <InputGroup>
                <DatePicker
                  className="form-control"
                  name="toDate"
                  selected={filter.toDate}
                  maxDate={new Date()}
                  onChange={(toDate) => onChangeToDate(toDate)}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Table hover responsive>
          <thead className="text-primary">
            <tr>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-right">Total to Invoice</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() =>
                  props.onInvoiceSelect({
                    companyId: item.companyId,
                    companyName: item.companyName,
                    fromDate: filter.fromDate,
                    toDate: filter.toDate,
                  })
                }
              >
                <td>{item.companyName}</td>
                <td>{item.companyEmail}</td>
                <td>{item.companyPhone}</td>
                <td className="text-right">${item.totalToInvoice}</td>
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

export default Invoices;
