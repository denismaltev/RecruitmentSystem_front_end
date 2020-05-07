import { config } from "./config.json";
import axios from "axios";

//GET all jobs only for admin
export const getAllCompanyJobs = ({ token, count, page }) => {
  const options = {
    url: `${config.BASE_API_URL}jobs/all?count=${count || ""}&page=${
      page || ""
    }`,
    method: "GET",
    headers: {
      Accept: "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

//Get all jobs for company role
export const getCompanyJobs = ({ token, count, page }) => {
  const options = {
    url: `${config.BASE_API_URL}jobs?count=${count || ""}&page=${page || ""}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

//GET by ID
export const getJobById = ({ token, id }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/" + id,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

//POST
export const postJob = ({ token, job }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    data: job,
  };
  return axios(options);
};

//PUT
export const putJob = ({ token, id, job }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/" + id,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    data: job,
  };
  return axios(options);
};

export const getJobsDDL = ({ token }) => {
  const options = {
    url: `${config.BASE_API_URL}jobs/getjobsddl`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

//GET all ratings
export const getAllCompanyJobsRatings = ({ token, count, page, companyId }) => {
  const options = {
    url: `${config.BASE_API_URL}jobs/allRatings?count=${count || ""}&page=${
      page || ""
    }&companyId=${companyId || ""}`,
    method: "GET",
    headers: {
      Accept: "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};
