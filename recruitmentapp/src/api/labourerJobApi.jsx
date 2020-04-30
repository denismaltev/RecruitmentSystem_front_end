import { config } from "./config.json";
import axios from "axios";

//GET labourersjobs
export const getLabourerJobs = ({
  token,
  count,
  page,
  fromDate,
  toDate,
  jobId,
  labourerId,
}) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs?count=${count || ""}&page=${
      page || ""
    }&fromDate=${fromDate || ""}&toDate=${toDate || ""}&labourerId=${
      labourerId || ""
    }&jobId=${jobId || ""}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const getJobInfoByCompany = ({ TOKEN }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return axios(options);
};

export const updateLabourerJobRating = ({
  token,
  labourerJobId,
  qualityRating,
  safetyRating,
}) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs/${labourerJobId}?qualityRating=${
      qualityRating ?? ""
    }&safetyRating=${safetyRating ?? ""}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

// POST ratings
export const postRatings = ({ token, param }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/UpdateJobRating?" + param,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

// POST rating by company

export const postJobRatingsByCompany = ({ token, param, labourerjobId }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/" + labourerjobId + "?" + param,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};
