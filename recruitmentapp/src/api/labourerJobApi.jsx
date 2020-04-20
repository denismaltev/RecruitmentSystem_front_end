import { config } from "./config.json";
import axios from "axios";

// GET ALL
export const getAlljobs = ({ TOKEN }) => {
  const options = {
    url: config.BASE_API_URL + "labourers",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    }
  };
  return axios(options);
};