import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Table } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { getJobById, putJob, postJob } from "../api/JobsApi";
import { getLabourerJobs } from "../api/labourerJobApi";
import Weekdays from "../components/Weekdays";
import SkillsSelector from "../components/SkillsSelector";
import ValidationJob from "../components/ValidationJob";
import FormErrors from "../components/FormError";

export default function CompanyJobDetail(props) {
  const token = props.auth.JWToken;
  const id = props.match.params.id; // gets id from parent node URL
  const isAddForm = id === "add" ? true : false; // logical flag that helps to check if it is Add or Edit form
  const [jobOriginal, setJobOriginal] = useState({}); // variable for storing Initial state of job or job that was recived from server
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({
    blankfield: false,
    invalidNumberOfLabourersNeeded: false,
    invalidDate: false
  });
  const [job, setJob] = useState({
    startDate: new Date(),
    endDate: new Date(),
    jobSkills: []
  }); //variable for storing current state of job

  async function start() {
    // EDIT Job
    if (!isAddForm) {
      getJobByIdFromAPI();
    }
    // ADD Job
    else {
      setIsLoading(false);
      // if this is Add form (not Edit), we need to store initial state of job's fields for cancel form logic as jobOriginal
      setJobOriginal(job);

      //getLabourersListFromAPI();
    }
  }

  // GET List of All jobs from server
  const getJobByIdFromAPI = async () => {
    await getJobById({ token, id }).then(res => {
      console.log("API-Call: Get Job By Id");
      if (res.status === 200) {
        setJob(res.data);
        setJobOriginal(res.data);
        //console.log(res.data);
        //console.log(res.data.skills);
        setIsLoading(false);
      } else {
        alert("ERROR");
      }
    });
  };

  const inputHandler = event => {
    setJob({ ...job, [event.target.name]: event.target.value });
    //console.log(job);
  };

  // Identify the button pressed in Weekdays-component and invert the value in the state
  const dayClickHandler = day => {
    setJob({ ...job, [day]: job[day] ? false : true });
  };

  const numberOfLabourersInputHandler = id => event => {
    setJob({
      ...job,
      jobSkills: job.jobSkills.map(item =>
        item.id === id
          ? {
              ...item,
              [event.target.name]: event.target.value.replace(/[^0-9]/g, "")
            }
          : item
      )
    });
    //console.log(job);
  };

  const clearForm = () => {
    clearErrors();
    setJob(jobOriginal);
    //console.log(jobOriginal);
  };

  // PUT
  const updateJob = async event => {
    clearErrors();
    const error = ValidationJob(event, job);
    if (error) {
      setErrors(error);
      //console.log(errors);
    } else {
      putJob({
        token,
        id,
        job
      })
        .then(res => {
          if (res.status === 200) {
            //alert("Job was successful updated");
            window.history.back();
          } else {
            alert("ERROR");
          }
        })
        .catch(err => {
          console.log(err);
          alert("ERROR: Something went wrong! ");
        });
    }
  };

  // POST
  const addJob = async event => {
    clearErrors();
    const error = ValidationJob(event, job);
    if (error) {
      setErrors(error);
    } else {
      postJob({
        token,
        job
      })
        .then(res => {
          if (res.status === 200) {
            //alert("Job was successful added");
            window.history.back();
          } else {
            alert("ERROR");
          }
        })
        .catch(err => {
          console.log(err);
          alert("ERROR: Something went wrong! ");
        });
    }
  };

  const updateSkills = selected => {
    setJob({
      ...job,
      jobSkills: selected
    });
  };

  // clear all error messages
  const clearErrors = () => {
    setErrors({
      errors: {
        blankfield: false,
        invalidNumberOfLabourersNeeded: false,
        invalidDate: false
      }
    });
  };

  // Table of skills
  const getSkillsTable = () => {
    return (
      <table id="skill-table" className="table table-striped">
        <thead>
          <tr>
            <th colSpan="3">Skill</th>
            <th colSpan="1">How many ?</th>
          </tr>
        </thead>
        <tbody>
          {job.jobSkills.map(js => {
            return (
              <tr col="4" key={js.id + js.name}>
                <td colSpan="3">{js.name}</td>
                <td colSpan="1">
                  <input
                    onChange={numberOfLabourersInputHandler(js.id)}
                    name="numberOfLabourersNeeded"
                    type="number"
                    min="1"
                    step="1"
                    style={{ width: "60px" }}
                    value={js.numberOfLabourersNeeded || ""}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    start();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Card>
      <CardBody>
        <div className="container">
          <h1>{jobOriginal.title || ""}</h1>
          <hr />
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                Job Title
                <input
                  required
                  onChange={inputHandler}
                  id="title"
                  name="title"
                  value={job.title || ""}
                  type="text"
                  className="form-control"
                  placeholder="Eg. Bathroom Installer"
                />
              </div>
              <div className="form-group">
                Country
                <input
                  required
                  onChange={inputHandler}
                  id="country"
                  name="country"
                  value={job.country || ""}
                  type="text"
                  className="form-control"
                  placeholder="Eg. Canada"
                />
              </div>
              <div className="form-group">
                <label />
                Province
                <input
                  required
                  onChange={event => {
                    inputHandler(event);
                  }}
                  id="province"
                  name="province"
                  value={job.province || ""}
                  type="text"
                  className="form-control"
                  placeholder="Eg. British Columbia"
                />
              </div>
              <div className="form-group">
                <label />
                City
                <input
                  required
                  onChange={event => {
                    inputHandler(event);
                  }}
                  id="city"
                  name="city"
                  value={job.city || ""}
                  type="text"
                  className="form-control"
                  placeholder="Eg. Vancouver"
                />
              </div>
              <div className="form-group">
                <label />
                Address
                <input
                  required
                  onChange={event => {
                    inputHandler(event);
                  }}
                  id="address"
                  name="address"
                  value={job.address || ""}
                  type="text"
                  className="form-control"
                  placeholder="Eg. #20 - 1590 Johnson st."
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label />
                    Start Date
                    <input
                      required
                      onChange={event => {
                        inputHandler(event);
                      }}
                      id="startDate"
                      name="startDate"
                      value={new Date(Date.parse(job.startDate))
                        .toISOString()
                        .slice(0, 10)}
                      type="date"
                      className="form-control"
                      placeholder="Eg. British Columbia"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group2">
                    <label />
                    End Date
                    <input
                      required
                      onChange={event => {
                        inputHandler(event);
                      }}
                      id="endDate"
                      name="endDate"
                      value={new Date(Date.parse(job.endDate))
                        .toISOString()
                        .slice(0, 10)}
                      type="date"
                      className="form-control"
                      placeholder="Eg. British Columbia"
                    />
                  </div>
                </div>
              </div>
              <br />
              <Weekdays
                days={{
                  mon: job.monday || false,
                  tue: job.tuesday || false,
                  wed: job.wednesday || false,
                  thu: job.thursday || false,
                  fri: job.friday || false,
                  sat: job.saturday || false,
                  sun: job.sunday || false
                }}
                onDayCheck={day => {
                  dayClickHandler(day);
                }}
              />
              <br />
              <div className="form-group">
                <label />
                Description
                <textarea
                  required
                  onChange={event => {
                    inputHandler(event);
                  }}
                  rows="7"
                  cols="50"
                  id="description"
                  name="description"
                  value={job.description || ""}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <br />
          <h5>Skills needed for job</h5>
          <hr />
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label>Skills</label>
                <SkillsSelector
                  auth={props.auth}
                  selected={job.jobSkills || []}
                  onChange={selected => updateSkills(selected)}
                  placeholder="Choose your skills"
                />
              </div>
            </div>
            <div className="col-sm-6">
              {job.jobSkills.length === 0 ? (
                <div>
                  <br />
                  <div className="form-group">
                    ...Skills are not selected yet
                  </div>
                </div>
              ) : (
                <div className="form-group">{getSkillsTable()}</div>
              )}
            </div>
          </div>
          <FormErrors formerrors={errors} />
          <button
            className="btn btn-danger"
            onClick={() => {
              window.history.back();
            }}
          >
            Cancel
          </button>{" "}
          <button
            className="btn btn-primary"
            onClick={() => {
              clearForm();
            }}
          >
            Clear
          </button>{" "}
          {isAddForm ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                addJob();
              }}
            >
              Add
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                updateJob();
              }}
            >
              Update
            </button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
