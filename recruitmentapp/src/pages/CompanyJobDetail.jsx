import React, { useState, useEffect } from "react";
import { getJobById } from "../api/JobsApi";
import { getAllSkills } from "../api/SkillsApi";
import { putJob, postJob } from "../api/JobsApi";
import Weekdays from "../components/Weekdays";
import Select from "react-dropdown-select";

const CompanyJobDetail = props => {
  const TOKEN = props.auth.JWToken;
  const id = props.match.params.id; // gets id from parent node URL
  const isAddForm = id === "add" ? true : false; // locical flag that helps to check if it is Add or Edit form
  const [jobOriginal, setJobOriginal] = useState({}); // variable for storing Initial state of job or job that was reciver from server
  const [allSkills, setAllSkills] = useState([]); // variable for storing list of all skills from server
  const [skills, setSkills] = useState([]);
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
    isActive: true,
    jobSkills: []
  });

  // JobSkills to Skills Converter
  const getSkillsFromJobSkills = jobSkills => {
    let skills = [];
    jobSkills.forEach(js => {
      skills.push({ id: js.skillId, name: js.skillName });
    });
    return skills;
  };

  // Skills to JobSkills Converter
  const getJobSkillsFromSkills = skills => {
    let jobSkills = [];
    skills.forEach(s => {
      jobSkills.push({
        skillId: s.id,
        skillName: s.name,
        numberOfLabourersNeeded: 0
      });
    });
    return jobSkills;
  };

  const getJobByIdFromAPI = async () => {
    await getJobById({ TOKEN, id }).then(res => {
      console.log("API-Call: Get Job By Id");
      if (res.status === 200) {
        setJob(res.data);
        setJobOriginal(res.data);
        setSkills(getSkillsFromJobSkills(res.data.jobSkills)); // gets Initial State of skiils for "Skills Needed" field
        //console.log(res.data);
        //console.log(res.data.skills);
      } else {
        alert("ERROR");
      }
    });
  };

  const getAllSkillsFromAPI = async () => {
    await getAllSkills({ TOKEN }).then(res => {
      console.log("API-Call: Get All Skills From API");
      if (res.status === 200) {
        setAllSkills(res.data);
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
    job.jobSkills = getJobSkillsFromSkills(skills);
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
  function updateSkills(selected) {
    //console.log("SKILLS" + job.jobSkills);
    setSkills(selected);
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
        <Select
          values={skills}
          multi
          labelField="name"
          valueField="id"
          onChange={selected => updateSkills(selected)}
          options={allSkills}
          placeholder={props.placeholder ?? "Skills"}
        />
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
