import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Table } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { getJobById, putJob, postJob } from "../api/JobsApi";
//import { getLabourerJobs } from "../api/labourerJobApi";
import CompanyJobLabourers from "../components/CompanyJobLabourers";
import Weekdays from "../components/Weekdays";
import SkillsSelector from "../components/SkillsSelector";
import ValidationJob from "../components/ValidationJob";
import FormErrors from "../components/FormError";

export default function CompanyJobDetail(props){
  const token = props.auth.JWToken;
  const jobId = props.jobId;
  const id = props.jobId; // gets id from parent node URL
  const isAddForm = id === "add" ? true : false; // logical flag that helps to check if it is Add or Edit form
  const [jobOriginal, setJobOriginal] = useState({}); // variable for storing Initial state of job or job that was recived from server
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({
    blankfield: false,
    invalidNumberOfLabourersNeeded: false,
    invalidDate: false,
  });
  const [job, setJob] = useState({
    startDate: new Date(),
    endDate: new Date(),
    jobSkills: [],
  }); //variable for storing current state of job
  const [labourers, setLabourers] = useState({})

  async function start () {
    if (!isAddForm) {
      getJobByIdFromAPI();
    } else {
      setIsLoading(false);
      // if this is Add form (not Edit), we need to store initial state of job's fields for cancel form logic as jobOriginal
      setJobOriginal(job);
      //getLabourersListFromAPI();
    }
  };

  // GET List of All jobs from server
  const getJobByIdFromAPI = async () => {
    getJobById({ token, id }).then((res) => {
      console.log("API-Call: Get Job By Id");
      if (res.status === 200) {
        setJob(res.data.result);
        setJobOriginal(res.data.result);
        setIsLoading(false);
        //console.log(res.data);
        //console.log(res.data.skills);
      } else {
        alert("ERROR");
      }
    });
  };

  //  const getLabourersListFromAPI = async () => {
  //   const token = this.props.auth.JWToken;
  //   var count   = 10;
  //   var page    = this.state.page;
  //   var jobId   = this.state.jobId;

  //   getLabourerJobs({ token, count, page, jobId }).then((res) => {
  //     if (res.status === 200) {
  //       setLabourers(res.data.result);
  //       //this.paginate = this.paginate.bind(this);
  //     }
  //   });
  // };

  const inputHandler = (event) => {
    setJob({ ...job, [event.target.name]: event.target.value });
    //console.log(job);
  };

  // Identify the button pressed in Weekdays-component and invert the value in the state
  const dayClickHandler = (day) => {
    setJob({ ...job, [day]: job[day] ? false : true });
  };

  const numberOfLabourersInputHandler = (id) => (event) => {
    setJob({
      ...job,
      jobSkills: job.jobSkills.map((item) =>
        item.id === id
          ? {
              ...item,
              [event.target.name]: event.target.value.replace(/[^0-9]/g, ""),
            }
          : item
      ),
    });
    //console.log(job);
  };

  const clearForm = () => {
    clearErrors();
    setJob(jobOriginal);
    //console.log(jobOriginal);
  };

  // PUT
  const updateJob = async (event) => {
    clearErrors();
    const error = ValidationJob(event, job);
    if (error) {
      setErrors(error);
      //console.log(errors);
    } else {
      putJob({
        token,
        id,
        job,
      })
        .then((res) => {
          if (res.status === 200) {
            //alert("Job was successful updated");
            window.history.back();
          } else {
            alert("ERROR");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("ERROR: Something went wrong! ");
        });
    }
  };

  // POST
  const addJob = async (event) => {
    clearErrors();
    const error = ValidationJob(event, job);
    if (error) {
      setErrors(error);
    } else {
      postJob({
        token,
        job,
      })
        .then((res) => {
          if (res.status === 200) {
            //alert("Job was successful added");
            window.history.back();
          } else {
            alert("ERROR");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("ERROR: Something went wrong! ");
        });
    }
  };

  const updateSkills = (selected) => {
    setJob({
      ...job,
      jobSkills: selected,
    });
  };

  // clear all error messages
  const clearErrors = () => {
    setErrors({
      errors: {
        blankfield: false,
        invalidNumberOfLabourersNeeded: false,
        invalidDate: false,
      },
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
          {job.jobSkills.map((js) => {
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

 
  return(

    <Card>
    <CardBody>
      <Table striped bordered hover>
        {/* <thead className="table-secondary"> */}
  <h3>{job.title}</h3>
        <tbody>
           <tr>
            <th>Address</th>
            <td>{jobOriginal.address}</td>
          </tr>
          <tr>
            <th>Dates</th>
            <td>April 6 - June 24th 2020</td>
          </tr>
          <tr>
            <th>Weekdays</th>
            <td>Sun | Mon | Weds </td>
          </tr>
        </tbody>
         
          
        {/* </tbody> */}
      </Table>
    </CardBody>
    {/* <Pagination paginate={this.paginate} /> */}
  </Card>
  )
  
};
