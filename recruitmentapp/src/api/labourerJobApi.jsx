import { config } from "./config.json";
import axios from "axios";

// GET labourersjobs
export const getAllLabourerjobs = ({ TOKEN, PARAM }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs?" + PARAM,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axios(options);
};

export const getLabourerJobs = ({ token, count, page, fromDate, toDate }) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs?count=${count}&page=${page}&fromDate=${fromDate}&toDate=${toDate}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
export const postRatings = ({ TOKEN, Id }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs?" + Id,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axios(options);
};
