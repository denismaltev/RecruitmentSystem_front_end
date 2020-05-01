import React, { useState, useEffect } from "react";
import { getCompanyJobs, putJob, getJobById } from "../api/JobsApi";
import { Table } from "react-bootstrap";
import Weekdays from "../components/Weekdays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "../api/config.json";
import PanelHeader from "../components/PanelHeader";
import { Row, Col, Card, CardBody } from "reactstrap";

var count = config.NUMBER_OF_ROWS_PER_PAGE;
const CompanyJobs = (props) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getCompanyJobs({ token: props.auth.JWToken }).then((response) => {
      setJobs(response.data.result);
    });
  }, [props.auth.JWToken]);

  const handleAddJobClick = (job) => {
    props.history.push("./company-job-detail/" + (job ? job.id : "add"));
  };

  const handleViewLabourers = (job) => {
    props.history.push("./company-job-labourers/" + job.id);
  };

  const changeActiveStatus = (currentJob) => {
    // for changing picture start
    setJobs(
      jobs.map((item) =>
        item.id === currentJob.id
          ? { ...item, isActive: item.isActive ? false : true }
          : item
      )
    );
    // for changing picture end

    // for changing state in back-end start
    getJobById({ TOKEN: props.auth.JWToken, id: currentJob.id }).then(
      (response) => {
        let job = response.data;
        job.isActive = job.isActive ? false : true;
        putJob({
          TOKEN: props.auth.JWToken,
          id: response.data.id,
          job: job,
        });
      }
    );
    // for changing state in back-end end
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleAddJobClick()}
                >
                  Add Job
                </button>
                <Table striped bordered hover>
                  <thead className="table-secondary">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Address</th>
                      <th scope="col">Start date</th>
                      <th scope="col">End date</th>
                      <th scope="col">Days of week</th>
                      <th scope="col">Active</th>
                      <th scope="col">Assigned Labourers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <tr key={index}>
                        <td onClick={() => handleAddJobClick(job)}>
                          {job.title}
                        </td>
                        <td onClick={() => handleAddJobClick(job)}>
                          {job.address}, {job.city}
                        </td>
                        <td onClick={() => handleAddJobClick(job)}>
                          {new Date(job.startDate).toLocaleDateString()}
                        </td>
                        <td onClick={() => handleAddJobClick(job)}>
                          {new Date(job.endDate).toLocaleDateString()}
                        </td>
                        <td onClick={() => handleAddJobClick(job)}>
                          <Weekdays
                            days={{
                              mon: job.monday,
                              tue: job.tuesday,
                              wed: job.wednesday,
                              thu: job.thursday,
                              fri: job.friday,
                              sat: job.saturday,
                              sun: job.sunday,
                            }}
                          />
                        </td>
                        <td onClick={() => changeActiveStatus(job)}>
                          {job.isActive === true ? (
                            <FontAwesomeIcon icon="check-circle" color="blue" />
                          ) : (
                            <div>X</div>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleViewLabourers(job)}
                          >
                            View Labourers
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CompanyJobs;
