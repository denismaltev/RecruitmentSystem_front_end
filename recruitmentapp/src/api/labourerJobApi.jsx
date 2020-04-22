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
