import React, { useState, useEffect } from "react";
import { getJobById } from "../api/JobsApi";
import { getAllSkills } from "../api/SkillsApi";
import { putJob } from "../api/JobsApi";
import Weekdays from "../components/Weekdays";

//This view is for a company to view and / or edit a specific job's details like hours, skills needed, number of labourers required, and location
const CompanyJobDetail = props => {
  const [jobOriginal, setJobOriginal] = useState({});
  const [skills, setSkills] = useState([]);
  const TOKEN = props.auth.JWToken;
  const id = props.match.params.id;
  const [job, setJob] = useState({
    id: id,
    title: "",
    description: "",
    city: "",
    province: "",
    country: "",
    address: "",
    startDate: 1,
    endDate: 1,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });

  const getJobByIdFromAPI = async () => {
    await getJobById({ TOKEN, id }).then(res => {
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
      if (res.status === 200) {
        setSkills(res.data);
        //(console.log(res.data);
      }
    });
  };

  useEffect(() => {
    //setState({ startDate: new Date() });
    getJobByIdFromAPI();
    getAllSkillsFromAPI();
  }, []);

  function inputHandler(event) {
    setJob({ ...job, [event.target.name]: event.target.value });
  }

  // Identify the button pressed in Weekdays-component and invert the value in the state
  function dayClickHandler(day) {
    setJob({ ...job, [day]: job[day] ? false : true });
  }

  async function updateJob() {
    await putJob({
      TOKEN,
      id,
      job
    }).then(res => {
      if (res.status === 200) {
        alert("Job was successful updated");
      } else {
        alert("ERROR");
      }
    });
    //console.log(state.job);
    console.log(job);
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
          //placeholder={job.title} //"Eg. Painter"
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
          //placeholder={job.country} //"Eg. Vancouver"
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
          //placeholder={job.province} //"Eg. British Columbia"
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
          //placeholder={job.city} //"Eg. Vancouver"
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
          //placeholder={job.address} //"Eg. British Columbia"
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
          //placeholder={job.address} //"Eg. British Columbia"
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
          //placeholder={job.address} //"Eg. British Columbia"
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
          //placeholder={job.description} //"Eg. British Columbia"
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
          updateJob();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default CompanyJobDetail;
