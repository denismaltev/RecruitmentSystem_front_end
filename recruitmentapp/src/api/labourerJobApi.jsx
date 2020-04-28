import { config } from "./config.json";
import axios from "axios";

// GET labourersjobs
export const getAllLabourerjobs = ({ token, param }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs?" + param,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const getJobInfoByCompany = ({  TOKEN }) => {
  
  const options = {
  
    url: config.BASE_API_URL + "labourerjobs/",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
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
