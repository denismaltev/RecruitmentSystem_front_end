import React, { useState, useEffect } from "react";
import { getJobById } from "../api/JobsApi";
import { putJob, postJob } from "../api/JobsApi";
import Weekdays from "../components/Weekdays";
import SkillsSelector from "../components/SkillsSelector";

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
    setJob(jobOriginal);
    //console.log(jobOriginal);
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
      <table className="table table-striped">
        <thead>
          <tr>
            <th colSpan="4">Input Number of labourers needed</th>
          </tr>
          <tr>
            <th colSpan="3">Skill</th>
            <th colSpan="1">N</th>
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
    <div className="page-content">
      <h1>{jobOriginal.title || ""}</h1>
      <div className="form-group">
        Job Title
        <input
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
  );
};
export default CompanyJobDetail;
