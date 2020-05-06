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
import React, { useState, useEffect } from "react";
import LabourersSelector from "../components/LabourersSelector";
import { getLabourerJobsReport } from "../api/labourerJobApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";

const LabourerAttendance = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [filter, setFilter] = useState({
    fromDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 14
    ),
    toDate: new Date(new Date().getFullYear(), new Date().getMonth()),
    labourerId: null,
  });

  useEffect(() => {
    getLabourerJobsReport({
      token: props.auth.JWToken,
      count: config.NUMBER_OF_ROWS_PER_PAGE,
      page: page,
      fromDate: filter.fromDate,
      toDate: filter.toDate,
      labourerId: filter.labourerId,
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
  }, [page, filter]);

  return (
    <Card>
      <CardHeader>
        <h5 className="card-category">Payroll Report</h5>
        <h5 className="card-category">
          <Row>
            <Col md={12} lg={4}>
              <FormGroup>
                <label>Labourer</label>
                <InputGroup>
                  <LabourersSelector
                    auth={props.auth}
                    // selected={this.state.labourerId || 0}
                    placeholder="Select Labourer"
                    onChange={(selected) =>
                      setFilter({
                        ...filter,
                        labourerId:
                          selected && selected.length > 0
                            ? selected[0].id
                            : null,
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
                    onChange={(selected) =>
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
                    placeholderText=" To Date"
                    selected={filter.toDate}
                    onChange={(selected) =>
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
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th className="text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() =>
                  props.onSelectLabourer({
                    labourerId: item.labourerId,
                    fromDate: filter.fromDate,
                    toDate: filter.toDate,
                  })
                }
              >
                <td style={{ whiteSpace: "nowrap" }}>
                  {item.labourerFullName}
                </td>
                <td>{item.labourerPhone}</td>
                <td>{item.labourerEmail}</td>
                <td className="text-right">${item.totalWage}</td>
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

export default LabourerAttendance;
