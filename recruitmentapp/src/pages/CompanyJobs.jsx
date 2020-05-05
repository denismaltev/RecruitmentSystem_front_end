import React, { useState, useEffect } from "react";
//import Pagination from "../components/Pagination";
import PanelHeader from "../components/PanelHeader";
import { getCompanyJobs, putJob, getJobById } from "../api/JobsApi";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import JobLabourers from "../components/JobLabourers";
import JobDetails from "../components/JobDetails";

//var count = config.NUMBER_OF_ROWS_PER_PAGE;

export default function CompanyJobs(props) {
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState(null);

  const [selectedJob, setSelectedJob] = useState({});

  useEffect(() => {
    getCompanyJobs({ token: props.auth.JWToken }).then(response => {
      setJobs(response.data.result);
      if (response.data.result && response.data.result.length > 0) {
        setJobId(response.data.result[0].id);
        setSelectedJob(response.data.result[0]);
      }
    });
  }, [props.auth.JWToken]); //anytime token changes, run use effect block again. Without this part use effect only gets run once.

  function handleAddJobClick(job) {
    if (job) {
      setJobId(job.id);
      setSelectedJob(job);
    } else {
      props.history.push("./company-job-detail/" + (job ? job.id : "add"));
    }
  }

  const changeActiveStatus = (currentJob, currentStatus) => {
    setJobs(
      jobs.map(item =>
        item.id === currentJob.id ? { ...item, isActive: currentStatus } : item
      )
    );

    // for changing state in back-end start
    getJobById({ token: props.auth.JWToken, id: currentJob.id }).then(
      response => {
        let job = response.data;
        job.isActive = job.isActive ? false : true;
        putJob({
          token: props.auth.JWToken,
          id: response.data.id,
          job: job
        });
      }
    );
    // for changing state in back-end end
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12} md={6}>
            <Card>
              <CardBody>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleAddJobClick()}
                >
                  Add Job
                </button>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Start date</th>
                      <th scope="col">End date</th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <tr
                        key={index}
                        onClick={() => handleAddJobClick(job)}
                        id={index + "style"}
                      >
                        <td>{job.title}</td>
                        <td>{job.startDate.toString().slice(0, 10)}</td>
                        <td>{job.endDate.toString().slice(0, 10)}</td>
                        <td style={{ textAlign: "right" }}>
                          {job.isActive === true ? (
                            <span class="status-bage badge badge-pill badge-success">
                              Active
                            </span>
                          ) : (
                            <span class="status-bage badge badge-pill badge-secondary">
                              Inactive
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            {/* Undefined check: verify there's at least one job object */}
            {Object.keys(selectedJob).length > 0 && (
              <JobDetails
                {...props}
                selectedJob={selectedJob}
                changeParentIsActiveStatusOfJob={(currentJob, currentStatus) =>
                  changeActiveStatus(currentJob, currentStatus)
                }
              />
            )}
            <JobLabourers {...props} jobId={jobId} />
          </Col>
        </Row>
      </div>
    </>
  );
}
