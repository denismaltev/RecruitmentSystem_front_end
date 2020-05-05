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
import Pagination from "./Pagination";
import { config } from "../api/config.json";
import { getIncidentReports } from "../api/IncidentReportsApi";
import CompaniesSelector from "./CompaniesSelector";
import DatePicker from "react-datepicker";

const IncidentReportsList = (props) => {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    let mounted = true;
    getIncidentReports({
      token: props.auth.JWToken,
      count: config.NUMBER_OF_ROWS_PER_PAGE,
      page: page,
      companyId: filter.companyId,
      fromDate: filter.fromDate,
      toDate: filter.toDate,
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
  }, [page, filter]);

  return (
    <Card>
      <CardHeader>
        <Row>
          <Col>
            <h5 className="card-category">Incident reports</h5>
          </Col>
          {props.auth.userRole === "company" && (
            <Col>
              <p className="text-right">
                <a href="#/incident-report">Add Incident</a>
              </p>
            </Col>
          )}
        </Row>
        <Row>
          {props.auth.userRole === "admin" && (
            <Col md={12} lg={4}>
              <FormGroup>
                <label style={{ paddingLeft: "15px" }}>Company</label>
                <InputGroup className="company-selector">
                  <CompaniesSelector
                    auth={props.auth}
                    placeholder="Select Company"
                    onChange={(company) =>
                      setFilter({
                        ...filter,
                        companyId:
                          company && company.length > 0 ? company[0].id : null,
                      })
                    }
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          )}
          <Col md={12} lg={4}>
            <FormGroup>
              <label style={{ paddingLeft: "15px" }}>From date</label>
              <InputGroup>
                <DatePicker
                  isClearable
                  className="form-control"
                  name="fromDate"
                  selected={filter.fromDate}
                  onChange={(selected) =>
                    setFilter({ ...filter, fromDate: selected })
                  }
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={12} lg={4}>
            <FormGroup>
              <label style={{ paddingLeft: "15px" }}>To date</label>
              <InputGroup>
                <DatePicker
                  isClearable
                  className="form-control"
                  name="toDate"
                  selected={filter.toDate}
                  onChange={(selected) =>
                    setFilter({ ...filter, toDate: selected })
                  }
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
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
