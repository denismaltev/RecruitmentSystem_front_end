import React, { useState, useEffect } from "react";
import { getJobById } from "../api/JobsApi";
import { getAllSkills } from "../api/SkillsApi";

//This view is for a company to view and / or edit a specific job's details like hours, skills needed, number of labourers required, and location
const CompanyJobDetail = props => {
  const [job, setJob] = useState({});
  const [skills, setSkills] = useState([]);
  const TOKEN = props.auth.JWToken;
  const id = props.match.params.id;
  const [state, setState] = React.useState({
    title: "",
    description: "",
    city: "",
    province: "",
    country: "",
    address: "",
    startDate: "",
    endDate: ""
  });

  const getJobByIdFromAPI = async () => {
    await getJobById({ TOKEN, id }).then(res => {
      if (res.status === 200) {
        setJob(res.data);
        setState({
          title: res.data.title,
          description: res.data.description,
          city: res.data.city,
          province: res.data.province,
          country: res.data.country,
          address: res.data.address,
          startDate: res.data.startDate,
          endDate: res.data.endDate
        });
        //console.log(res.data);
        //console.log(res.data.job);
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
    getJobByIdFromAPI();
    getAllSkillsFromAPI();
  }, []);

  function inputHandler(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function updateJob() {
    console.log(state.title + " " + state.country);
    console.log(state.description + " " + state.province);
    console.log(state.address + " " + state.country);
  }

  return (
    <div className="page-content">
      <h1>{job.title}</h1>
      <form>
        <div className="form-group">
          Job Title
          <input
            onChange={inputHandler}
            name="title"
            value={state.title}
            //type="text"
            className="form-control"
            //id="exampleFormControlInput1"
            placeholder={job.title} //"Eg. Painter"
          />
        </div>
        <div className="form-group">
          Country
          <input
            onChange={inputHandler}
            name="country"
            value={state.country}
            //type="text"
            className="form-control"
            //id="exampleFormControlInput1"
            placeholder={job.country} //"Eg. Vancouver"
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1" />
          Province
          <input
            onChange={event => {
              inputHandler(event);
            }}
            name="province"
            value={state.province}
            type="text"
            class="form-control"
            //id="exampleFormControlInput1"
            //placeholder={job.province} //"Eg. British Columbia"
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1" />
          City
          <input
            onChange={event => {
              inputHandler(event);
            }}
            name="city"
            value={state.city}
            type="text"
            class="form-control"
            //id="exampleFormControlInput1"
            //placeholder={job.city} //"Eg. Vancouver"
          />
        </div>

        <div className="form-group">
          <label for="exampleFormControlInput1" />
          Address
          <input
            onChange={event => {
              inputHandler(event);
            }}
            name="address"
            value={state.address}
            type="text"
            class="form-control"
            //id="exampleFormControlInput1"
            //placeholder={job.address} //"Eg. British Columbia"
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1" />
          Description
          <textarea
            onChange={event => {
              inputHandler(event);
            }}
            id="w3mission"
            rows="4"
            cols="50"
            name="description"
            value={state.description}
            type="text"
            class="form-control"
            //id="exampleFormControlInput1"
            //placeholder={job.description} //"Eg. British Columbia"
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlSelect2">
            Skills Needed (Hold ctrl to select multiple)
          </label>
          <select multiple class="form-control" id="exampleFormControlSelect2">
            <option>Skill 1</option>
            <option>Skill 2</option>
            <option>Skill 3</option>
            <option>Skill 4</option>
            <option>Skill 5</option>
          </select>
        </div>
      </form>
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
