import React, { useState, useEffect } from "react";
import { getLabourerJobs } from "../api/labourerJobApi";
import { Table } from "react-bootstrap";
import { config } from "../api/config.json";
import PanelHeader from "../components/PanelHeader";
import SafetyReportItem from "../components/SafetyReportItem";
import Pagination from "../components/Pagination";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

const SafetyReport = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(100);

  useEffect(() => {
    getLabourerJobs({
      token: props.auth.JWToken,
      count: 20,
      page: page,
      fromDate: "",
      toDate: "",
    })
      .then((response) => {
        setData(response.data.result);
        setTotalRows(response.data.totalRows);
      })
      .catch((error) => {
        alert("Something went wrong! " + error.response.data.message);
      });
  }, [page, props.auth.JWToken]);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <h5 className="card-category">Safety Report</h5>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th scope="col">Labourer Full Name</th>
                      <th>Labourer Phone</th>
                      <th>Job Title</th>
                      <th>Job Skill</th>
                      <th>Date</th>
                      <th>Safety Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <SafetyReportItem key={index} {...props} item={item} />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <Pagination
                itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
                totalItem={totalRows}
                paginate={(page) => setPage(page)}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SafetyReport;
