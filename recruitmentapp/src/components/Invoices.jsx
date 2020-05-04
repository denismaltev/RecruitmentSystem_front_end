import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  FormGroup,
  InputGroup
} from "reactstrap";
import { config } from "../api/config.json";
import Pagination from "../components/Pagination";
import { getInvoices } from "../api/labourerJobApi";
import DatePicker from "react-datepicker";
import CompaniesSelector from "./CompaniesSelector";

const Invoices = props => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [filter, setFilter] = useState({
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), //default filter last month
    toDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    companyId: null
  });

  useEffect(() => {
    getInvoices({
      token: props.auth.JWToken,
      count: config.NUMBER_OF_ROWS_PER_PAGE,
      page: page,
      fromDate: filter.fromDate,
      toDate: filter.toDate,
      companyId: filter.companyId
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
  }, [page, filter]);

  return (
    <Card>
      <CardHeader>
        <h5 className="card-category">Invoices</h5>
        <h5 className="card-category">
          <Row>
            <Col md={12} lg={4}>
              <FormGroup>
                <label>Company</label>
                <InputGroup>
                  <CompaniesSelector
                    auth={props.auth}
                    placeholder="Select company"
                    onChange={company =>
                      setFilter({
                        ...filter,
                        companyId:
                          company && company.length > 0 ? company[0].id : null
                      })
                    }
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={12} lg={4}>
              <FormGroup>
                <label>From date</label>
                <InputGroup>
                  <DatePicker
                    className="form-control"
                    name="fromDate"
                    selected={filter.fromDate}
                    onChange={selected =>
                      setFilter({ ...filter, fromDate: selected })
                    }
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={12} lg={4}>
              <FormGroup>
                <label>To date</label>
                <InputGroup>
                  <DatePicker
                    className="form-control"
                    name="toDate"
                    selected={filter.toDate}
                    onChange={selected =>
                      setFilter({ ...filter, toDate: selected })
                    }
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </h5>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-right">Total to invoice</th>
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
                    toDate: filter.toDate
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
          paginate={page => setPage(page)}
        />
      </CardBody>
    </Card>
  );
};

export default Invoices;
