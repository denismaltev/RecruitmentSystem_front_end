import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import StarRatings from "react-star-ratings";
import { Table } from "react-bootstrap";
import { getJobById, putJob } from "../api/JobsApi";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export default function JobDetail(props) {
  const token = props.auth.JWToken;
  const id = props.selectedJob.id;
  const [selectedJob, setSelectedJob] = useState({});
  const [job, setJob] = useState(props.selectedJob);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSelectedJob(job);
    getJobByIdFromAPI();
  }, [id]);

  // GET List of All jobs from server
  const getJobByIdFromAPI = async () => {
    setIsLoading(true);
    await getJobById({ token, id }).then(res => {
      if (res.status === 200) {
        setJob(res.data);
        setIsLoading(false);
      } else {
        alert("ERROR");
      }
    });
  };

  const changeActiveStatus = status => {
    // if laboreur has at least 1 upcomming job
    if (!isLoading) {
      setIsLoading(true);
      props.changeParentIsActiveStatusOfJob(job, status); // change button on parent page
      let jobToSend = job;
      jobToSend.isActive = status;
      putJob({ token, id, job: jobToSend }).then(response => {
        if (response.status === 200) {
          console.log(jobToSend);
          setJob({ ...job, isActive: status });
          setIsLoading(false);
        } else {
          alert("Error: Something went wrong");
        }
      });
    }
  };

  const handleEditJobClick = () => {
    props.history.push("./company-job-detail/" + selectedJob.id);
  };

  function formatDate(theDate) {
    var date = new Date(theDate);

    return `${
      MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <Card>
      <CardBody>
        <CardHeader className="card-category job-details-card">
          <h5 style={{ margin: 0 }}>{job.title} Details</h5>
          <a href={`#/incident-report?jobId=${selectedJob.id}`}>Add Incident</a>
          {job.isActive ? (
            <button
              onClick={() => {
                changeActiveStatus(false);
              }}
              className="btn btn-primary btn-sm"
            >
              Deactivate
            </button>
          ) : (
            <button
              onClick={() => {
                changeActiveStatus(true);
              }}
              className="btn btn-primary btn-sm"
            >
              Activate
            </button>
          )}

          <button
            onClick={() => {
              handleEditJobClick();
            }}
            className="btn btn-primary btn-sm"
          >
            Edit
          </button>
        </CardHeader>
        <Table responsive>
          <tbody>
            <tr>
              <th>Average Rating</th>
              <td>
                <StarRatings
                  id="rating"
                  rating={job.rating}
                  starRatedColor="blue"
                  numberOfStars={5}
                  starDimension="30px"
                  name="rating"
                  starSpacing="4px"
                />
              </td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{job.address}</td>
            </tr>
            <tr>
              <th>Dates</th>
              <td>
                {formatDate(job.startDate)} - {formatDate(job.endDate)}
              </td>
            </tr>
            <tr>
              <th>Weekdays</th>
              <td>
                {job.sunday && (
                  <button disabled className="weekday-tags">
                    Sun
                  </button>
                )}
                {job.monday && (
                  <button disabled className="weekday-tags">
                    Mon
                  </button>
                )}
                {job.tuesday && (
                  <button disabled className="weekday-tags">
                    Tue
                  </button>
                )}
                {job.wednesday && (
                  <button disabled className="weekday-tags">
                    Wed
                  </button>
                )}
                {job.thursday && (
                  <button disabled className="weekday-tags">
                    Thu
                  </button>
                )}
                {job.friday && (
                  <button disabled className="weekday-tags">
                    Fri
                  </button>
                )}
                {job.saturday && (
                  <button disabled className="weekday-tags">
                    Sat
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <th>Skills Required</th>
              <td>
                <p className="description">
                  {job?.jobSkills &&
                    job.jobSkills.map((skill, index) => (
                      <span
                        key={index}
                        color="info"
                        className="m-1 badge badge-info"
                      >
                        {skill.name}
                      </span>
                    ))}
                </p>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
