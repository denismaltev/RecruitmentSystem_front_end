import { config } from "./config.json";
import axios from "axios";

export const getJobRating = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "jobrating",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};
