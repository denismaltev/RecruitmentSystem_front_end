import React, { useState, useEffect } from "react";
import { getJobById } from "../api/JobsApi";
import { getAllSkills } from "../api/SkillsApi";
import { putJob, postJob } from "../api/JobsApi";
import Weekdays from "../components/Weekdays";

const CompanyJobDetail = props => {
  const id = props.match.params.id; // gets id from parent node URL
  const isAddForm = id === "add" ? true : false; // locical flag that helps to check if it is Add or Edit form
  const [jobOriginal, setJobOriginal] = useState({}); // variable for storing Initial state of job or job that was reciver from server
  const [skills, setSkills] = useState([]);
  const TOKEN = props.auth.JWToken;
  //variable for storing current state of job
  const [job, setJob] = useState({
    id: id,
    title: "",
    description: "",
    city: "",
    province: "",
    country: "",
    address: "",
    startDate: new Date(),
    endDate: new Date(),
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    isActive: true
  });

  const getJobByIdFromAPI = async () => {
    await getJobById({ TOKEN, id }).then(res => {
      console.log("API-Call: Get Job By Id");
      if (res.status === 200) {
        setJob(res.data);
        setJobOriginal(res.data);
      } else {
        alert("ERROR");
      }
    });
  };

  const getAllSkillsFromAPI = async () => {
    await getAllSkills({ TOKEN }).then(res => {
      console.log("API-Call: Get All Skills From API");
      if (res.status === 200) {
        setSkills(res.data);
      }
    });
  };

  const start = async () => {
    if (!isAddForm) {
      getJobByIdFromAPI();
    } else {
      // if this is Add form (not Edit), we need to store initial state of job's fields for cancel form logic as jobOriginal
      setJobOriginal(job);
    }
    getAllSkillsFromAPI();
  };

  useEffect(() => {
    start();
  }, []);

  function inputHandler(event) {
    setJob({ ...job, [event.target.name]: event.target.value });
  }

  // Identify the button pressed in Weekdays-component and invert the value in the state
  function dayClickHandler(day) {
    setJob({ ...job, [day]: job[day] ? false : true });
  }

  function clearForm() {
    setJob(jobOriginal);
  }

  async function updateJob() {
    await putJob({
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
    //console.log(job);
  }

  async function addJob() {
    delete job.id;
    await postJob({
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
  }

  return (
    <div className="page-content">
      <h1>{jobOriginal.title}</h1>
      <div className="form-group">
        Job Title
        <input
          onChange={inputHandler}
          name="title"
          value={job.title}
          //type="text"
          className="form-control"
          //id="exampleFormControlInput1"
          placeholder="Eg. Painter"
        />
      </div>
      <div className="form-group">
        Country
        <input
          onChange={inputHandler}
          name="country"
          value={job.country}
          //type="text"
          className="form-control"
          //id="exampleFormControlInput1"
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
          value={job.province}
          type="text"
          className="form-control"
          //id="exampleFormControlInput1"
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
          value={job.city}
          type="text"
          className="form-control"
          //id="exampleFormControlInput1"
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
          value={job.address}
          type="text"
          className="form-control"
          //id="exampleFormControlInput1"
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
          value={new Date(Date.parse(job.startDate)).toISOString().slice(0, 10)}
          //value={job.startDate}
          type="date"
          className="form-control"
          //id="exampleFormControlInput1"
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
          //value={job.endDate}
          value={new Date(Date.parse(job.endDate)).toISOString().slice(0, 10)}
          type="date"
          className="form-control"
          //id="exampleFormControlInput1"
          placeholder="Eg. British Columbia"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" />
        Description
        <textarea
          onChange={event => {
            inputHandler(event);
          }}
          id="w3mission"
          rows="4"
          cols="50"
          name="description"
          value={job.description}
          type="text"
          className="form-control"
          //id="exampleFormControlInput1"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect2">
          Skills Needed (Hold ctrl to select multiple)
        </label>
        <select
          multiple
          className="form-control"
          id="exampleFormControlSelect2"
        >
          <option>Skill 1</option>
          <option>Skill 2</option>
          <option>Skill 3</option>
          <option>Skill 4</option>
          <option>Skill 5</option>
        </select>
      </div>
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
        onDayCheck={day => {
          dayClickHandler(day);
        }}
      />
      <button
        onClick={() => {
          clearForm();
        }}
      >
        Cancel
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
