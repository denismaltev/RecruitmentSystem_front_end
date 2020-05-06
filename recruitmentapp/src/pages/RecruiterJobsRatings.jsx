import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import PanelHeader from "../components/PanelHeader";
import { getAllCompanyJobs } from "../api/JobsApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

const RecruiterJobsRatings = (props) => {
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    let mounted = true;
    getAllCompanyJobs({
      token: props.auth.JWToken,
      count: config.NUMBER_OF_ROWS_PER_PAGE,
      page: page,
      companyId: companyId,
    })
      .then((response) => {
        if (mounted) {
          if (response?.data?.result) {
            setJobList(response.data.result);
            setTotalRows(response.data.totalRows);
          } else {
            setJobList([]);
            setTotalRows(0);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, [page, companyId, props.auth.JWToken]);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5 className="card-category">Job Rating</h5>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Company Name</th>
                      <th>Job Title</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.companyName}</td>
                        <td>{item.title}</td>
                        <td>
                          {" "}
                          <StarRatings
                            rating={item.rating}
                            starRatedColor="#2CA8FF"
                            numberOfStars={5}
                            name="rating"
                            starDimension="25px"
                            starSpacing="1px"
                          />{" "}
                        </td>
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RecruiterJobsRatings;
