import { config } from "./config.json";
import axios from "axios";

export const getCompanyJobs = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "jobs",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

//GET by ID
export const getJobById = ({ TOKEN, id }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/" + id,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`
    }
  };
  return axios(options);
};

//POST
export const postJob = ({ TOKEN, job }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`
    },
    data: job
  };
  return axios(options);
};

//PUT
export const putJob = ({ TOKEN, id, job }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/" + id,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`
    },
    data: job
  };
  return axios(options);
};
