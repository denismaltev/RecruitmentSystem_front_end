import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import PanelHeader from "../components/PanelHeader";
import { getCompanyJobs, putJob, getJobById } from "../api/JobsApi";
//import { Table } from "react-bootstrap";
import { config } from "../api/config.json";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
  Table,
  FormGroup,
  InputGroup,
} from "reactstrap";
import JobLabourers from "../components/JobLabourers";
import JobDetails from "../components/JobDetails";

var count = config.NUMBER_OF_ROWS_PER_PAGE;

export default function CompanyJobs(props) {
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState(null);

  const [selectedJob, setSelectedJob] = useState({});

  useEffect(() => {
    getCompanyJobs({ token: props.auth.JWToken }).then((response) => {
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
    }
  }

  function changeActiveStatus(currentJob) {
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
    getJobById({ token: props.auth.JWToken, id: currentJob.id }).then(
      (response) => {
        let job = response.data;
        job.isActive = job.isActive ? false : true;
        putJob({
          token: props.auth.JWToken,
          id: response.data.id,
          job: job,
        });
      }
    );
    // for changing state in back-end end
  }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={6}>
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
                        <td style={{ textAlign: "right" }}>
                          {job.isActive === true ? (
                            <Button
                              disabled
                              className="btn btn-success"
                              size="sm"
                              width="10px"
                            >
                              Active
                            </Button>
                          ) : (
                            <div>
                              <Button disabled size="sm">
                                Inactive
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={6}>
            {/* Undefined check: verify there's at least one job object */}
            {Object.keys(selectedJob).length > 0 && (
              <JobDetails selectedJob={selectedJob} />
            )}
            <JobLabourers {...props} jobId={jobId} />
          </Col>
        </Row>
      </div>
    </>
  );
}
