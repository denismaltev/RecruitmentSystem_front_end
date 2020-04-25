import React, { useState, useEffect } from "react";
import { getJobById } from "../api/JobsApi";
//import { getAllSkills } from "../api/SkillsApi";
import { putJob, postJob } from "../api/JobsApi";
import Weekdays from "../components/Weekdays";
import SkillsSelector from "../components/SkillsSelector";
import { Table } from "react-bootstrap";
//import Select from "react-dropdown-select";

const CompanyJobDetail = props => {
  const TOKEN = props.auth.JWToken;
  const id = props.match.params.id; // gets id from parent node URL
  const isAddForm = id === "add" ? true : false; // logical flag that helps to check if it is Add or Edit form
  const [jobOriginal, setJobOriginal] = useState({}); // variable for storing Initial state of job or job that was recived from server
  const [job, setJob] = useState({}); //variable for storing current state of job
  const [isLoading, setIsLoading] = useState(true);

  const start = async () => {
    if (!isAddForm) {
      getJobByIdFromAPI();
    } else {
      setIsLoading(false);
      // if this is Add form (not Edit), we need to store initial state of job's fields for cancel form logic as jobOriginal
      setJobOriginal(job);
    }
  };

  // JobSkills to Skills Converter
  // const getSkillsFromJobSkills = jobSkills => {
  //   let skills = [];
  //   jobSkills.forEach(js => {
  //     skills.push({ id: js.skillId, name: js.skillName });
  //   });
  //   return skills;
  // };

  // Skills to JobSkills Converter
  // const getJobSkillsFromSkills = skills => {
  //   let jobSkills = [];
  //   skills.forEach(s => {
  //     jobSkills.push({
  //       skillId: s.id,
  //       skillName: s.name,
  //       numberOfLabourersNeeded: 0
  //     });
  //   });
  //   return jobSkills;
  // };

  // GET List of All jobs from server
  const getJobByIdFromAPI = async () => {
    getJobById({ TOKEN, id }).then(res => {
      console.log("API-Call: Get Job By Id");
      if (res.status === 200) {
        setJob(res.data);
        setJobOriginal(res.data);
        setIsLoading(false);
        //console.log(res.data);
        //console.log(res.data.skills);
      } else {
        alert("ERROR");
      }
    });
  };

  const inputHandler = event => {
    setJob({ ...job, [event.target.name]: event.target.value });
    console.log(job);
  };

  // Identify the button pressed in Weekdays-component and invert the value in the state
  const dayClickHandler = day => {
    setJob({ ...job, [day]: job[day] ? false : true });
  };

  const numberOfLabourersInputHandler = event => {
    console.log(event.target.value);
    setJob({ ...job, [event.target.name]: event.target.value });
  };

  const clearForm = () => {
    setJob(jobOriginal);
    console.log(jobOriginal);
  };

  // PUT
  const updateJob = async () => {
    putJob({
      TOKEN,
      id,
      job
    })
      .then(res => {
        if (res.status === 200) {
          alert("Job was successful updated");
        } else {
          alert("ERROR");
        }
      })
      .catch(err => {
        console.log(err);
        alert("ERROR: Something went wrong! ");
      });
  };

  // POST
  const addJob = async () => {
    postJob({
      TOKEN,
      job
    })
      .then(res => {
        if (res.status === 200) {
          alert("Job was successful added");
        } else {
          alert("ERROR");
        }
      })
      .catch(err => {
        console.log(err);
        alert("ERROR: Something went wrong! ");
      });
  };

  const updateSkills = selected => {
    setJob({
      ...job,
      jobSkills: selected
    });
  };

  const getSkillsTable = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="4">Input Number of labourers needed</th>
          </tr>
          <tr>
            <th colSpan="1">Skill</th>
            <th colSpan="3">N</th>
          </tr>
        </thead>
        <tbody>
          {job.jobSkills.map(js => {
            return (
              <tr>
                <td>{js.name}</td>
                <td>
                  <input
                    onChange={numberOfLabourersInputHandler}
                    name="numberOfLabourersNeeded"
                    type="number"
                    value={js.numberOfLabourersNeeded}
                    // placeholder={js.numberOfLabourersNeeded}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  useEffect(() => {
    start();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="page-content">
      <h1>{jobOriginal.title || ""}</h1>
      <div className="form-group">
        Job Title
        <input
          onChange={inputHandler}
          name="title"
          value={job.title || ""}
          type="text"
          className="form-control"
          placeholder="Eg. Painter"
        />
      </div>
      <div className="form-group">
        Country
        <input
          onChange={inputHandler}
          name="country"
          value={job.country || ""}
          type="text"
          className="form-control"
          placeholder="Eg. Canada"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" />
        Province
        <input
          onChange={event => {
            inputHandler(event);
          }}
          name="province"
          value={job.province || ""}
          type="text"
          className="form-control"
          placeholder="Eg. British Columbia"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" />
        City
        <input
          onChange={event => {
            inputHandler(event);
          }}
          name="city"
          value={job.city || ""}
          type="text"
          className="form-control"
          placeholder="Eg. Vancouver"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" />
        Address
        <input
          onChange={event => {
            inputHandler(event);
          }}
          name="address"
          value={job.address || ""}
          type="text"
          className="form-control"
          placeholder="Eg. #20 - 1590 Johnson st."
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" />
        Start Date
        <input
          onChange={event => {
            inputHandler(event);
          }}
          name="startDate"
          value={new Date(Date.parse(job.startDate || "2020,01,01"))
            .toISOString()
            .slice(0, 10)}
          type="date"
          className="form-control"
          placeholder="Eg. British Columbia"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" />
        End Date
        <input
          onChange={event => {
            inputHandler(event);
          }}
          name="endDate"
          value={new Date(Date.parse(job.endDate || "2020,01,01"))
            .toISOString()
            .slice(0, 10)}
          type="date"
          className="form-control"
          placeholder="Eg. British Columbia"
        />
      </div>
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
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" />
        Description
        <textarea
          onChange={event => {
            inputHandler(event);
          }}
          rows="4"
          cols="50"
          name="description"
          value={job.description || ""}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect2">Skills needed for job</label>
        <SkillsSelector
          auth={props.auth}
          selected={job.jobSkills || []}
          onChange={selected => updateSkills(selected)}
          placeholder="Choose your skills"
        />
      </div>

      <div className="form-group">{getSkillsTable()}</div>

      <button
        onClick={() => {
          window.history.back();
        }}
      >
        Cancel
      </button>
      <button
        onClick={() => {
          clearForm();
        }}
      >
        Clear
      </button>
      {isAddForm ? (
        <button
          onClick={() => {
            addJob();
          }}
        >
          Add
        </button>
      ) : (
        <button
          onClick={() => {
            updateJob();
          }}
        >
          Update
        </button>
      )}
    </div>
  );
};
export default CompanyJobDetail;
