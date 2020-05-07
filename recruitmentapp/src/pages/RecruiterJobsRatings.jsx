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
import CompaniesSelector from "../components/CompaniesSelector";
import StarRatings from "react-star-ratings";
import PanelHeader from "../components/PanelHeader";
import { getAllCompanyJobsRatings } from "../api/JobsApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";

const RecruiterJobsRatings = (props) => {
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    let mounted = true;
    getAllCompanyJobsRatings({
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

  const onChangeCompany = (company) => {
    if (company && company.length > 0) {
      setCompanyId(company[0].id);
    } else {
      setCompanyId(null);
    }
  };

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
