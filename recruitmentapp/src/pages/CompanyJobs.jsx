import React, { useState, useEffect } from "react";
import { getCompanyJobs } from "../api/JobsApi";
import { Table, Form } from "react-bootstrap";
import Weekdays from "../components/Weekdays";

const CompanyJobs = props => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getCompanyJobs({ token: props.auth.JWToken }).then(response => {
      setJobs(response.data);
    });
  }, [props.auth.JWToken]);

  const handleAddJobClick = job => {
    props.history.push("./company-job-detail/" + (job ? job.id : "add"));
  };

  const handleViewLabourers = job => {
    props.history.push("./company-job-labourers" + (job ? job.id : ""))
  }

  return (
    <div className="page-content">
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
              <td onClick={() => handleAddJobClick(job)}>{job.title}</td>
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
              <td>
                <Form.Check checked={job.isActive} disabled />
              </td>
              <td>
                <button className="btn btn-success" onClick={() => handleViewLabourers()}>View Labourers</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyJobs;
