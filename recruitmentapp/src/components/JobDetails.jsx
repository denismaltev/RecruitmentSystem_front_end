import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import StarRatings from "react-star-ratings";
import { getJobById, putJob } from "../api/JobsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  "Dec",
];

export default function JobDetail(props) {
  const token = props.auth.JWToken;
  const id = props.selectedJob.id;
  const [job, setJob] = useState(props.selectedJob);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getJobById({ token, id }).then((res) => {
      if (res.status === 200) {
        if (mounted) {
          setJob(res.data);
          setIsLoading(false);
        }
      } else {
        console.log("ERROR");
      }
    });
    return () => (mounted = false);
  }, [id]);

  const changeActiveStatus = (status) => {
    // if laboreur has at least 1 upcomming job
    if (!isLoading) {
      setIsLoading(true);
      props.changeParentIsActiveStatusOfJob(job, status); // change button on parent page
      let jobToSend = job;
      jobToSend.isActive = status;
      putJob({ token, id, job: jobToSend }).then((response) => {
        if (response.status === 200) {
          setJob({ ...job, isActive: status });
          setIsLoading(false);
        } else {
          console.log("Error: Something went wrong");
        }
      });
    }
  };

  const handleEditJobClick = () => {
    props.history.push("./company-job-detail/" + job.id);
  };

  function formatDate(theDate) {
    var date = new Date(theDate);

    return `${
      MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <Card className="card-user">
      <CardBody>
        <div className="author">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <a href={`#/incident-report?jobId=${job.id}`}>Add Incident</a>
            </div>

            <FontAwesomeIcon
              onClick={() => {
                handleEditJobClick();
              }}
              style={{ fontSize: "20px" }}
              icon="edit"
              color="#f96332"
            />
          </div>
          <div style={{ opacity: job.isActive ? "1" : "0.4" }}>
            {job.isActive ? (
              <a href="#" onClick={(e) => e.preventDefault()}>
                <h5 className="title" style={{ margin: 0 }}>
                  {job.title}
                </h5>
              </a>
            ) : (
              <h5 className="title" style={{ margin: 0, color: "grey" }}>
                {job.title}
              </h5>
            )}

            <p className="description"></p>

            <div className="description">
              Average Rating
              <StarRatings
                rating={job.rating}
                starRatedColor="#ffb236"
                starDimension="25px"
                starSpacing="1px"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <p className="description"></p>
            <div className="description">Address: {job.address}</div>
            <p className="description"></p>
            <div className="description">
              Dates: {formatDate(job.startDate)} - {formatDate(job.endDate)}
            </div>
            <p className="description"></p>
            <p className="description">
              Skills Required:
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
            <div className="description">
              Weekdays:
              {job.sunday && (
                <button disabled className="weekday-tags-circle">
                  Sun
                </button>
              )}
              {job.monday && (
                <button disabled className="weekday-tags-circle">
                  Mon
                </button>
              )}
              {job.tuesday && (
                <button disabled className="weekday-tags-circle">
                  Tue
                </button>
              )}
              {job.wednesday && (
                <button disabled className="weekday-tags-circle">
                  Wed
                </button>
              )}
              {job.thursday && (
                <button disabled className="weekday-tags-circle">
                  Thu
                </button>
              )}
              {job.friday && (
                <button disabled className="weekday-tags-circle">
                  Fri
                </button>
              )}
              {job.saturday && (
                <button disabled className="weekday-tags-circle">
                  Sat
                </button>
              )}
            </div>
          </div>
          <br />
          {job.isActive ? (
            <Button
              size="sm"
              width="10px"
              onClick={() => {
                changeActiveStatus(false);
              }}
              className="btn btn-success btn-sm"
            >
              Active
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                changeActiveStatus(true);
              }}
            >
              Inactive
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
