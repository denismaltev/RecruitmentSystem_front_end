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

// POST ratings
export const postRatings = ({ token, param }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/UpdateJobRating?" + param,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};
