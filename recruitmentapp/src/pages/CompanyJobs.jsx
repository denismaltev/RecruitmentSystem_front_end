import React, { useState, useEffect } from "react";
import { getCompanyJobs, putJob, getJobById } from "../api/JobsApi";
import { Table } from "react-bootstrap";
import Weekdays from "../components/Weekdays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompanyJobs = props => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getCompanyJobs({ token: props.auth.JWToken }).then(response => {
      setJobs(response.data.result);
    });
  }, [props.auth.JWToken]);

  const handleAddJobClick = job => {
    props.history.push("./company-job-detail/" + (job ? job.id : "add"));
  };

  const handleViewLabourers = job => {
    props.history.push("./company-job-labourers/" + job.id);
  };

  const changeActiveStatus = currentJob => {
    // if (currentJob.isActive) {
    //   setJobs(
    //     jobs.map(item =>
    //       item.id === currentJob.id ? { ...item, isActive: false } : item
    //     )
    //   );
    //   console.log(false);
    // } else {
    //   setJobs(
    //     jobs.map(item =>
    //       item.id === currentJob.id ? { ...item, isActive: true } : item
    //     )
    //   );
    //   console.log(true);
    // }
    getJobById({ TOKEN: props.auth.JWToken, id: currentJob.id }).then(
      response => {
        let job = response.data;
        job.isActive = job.isActive ? false : true;
        putJob({
          TOKEN: props.auth.JWToken,
          id: response.data.id,
          job: job
        }).then(response => {
          //console.log(response.data);
        });
      }
    );
    //console.log(job);
    //job.isActive = job.isActive ? false : true;
    // await putJob({ TOKEN: props.auth.JWToken, id: job.id, job }).then(
    //   response => {
    //     //setJobs(response.data.result);
    //   }
    // );
  };

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
                    sun: job.sunday
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
    </div>
  );
};

export default CompanyJobs;
