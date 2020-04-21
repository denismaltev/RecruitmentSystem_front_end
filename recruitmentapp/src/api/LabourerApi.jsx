import { config } from "./config.json";
import axios from "axios";

//GET
export const showProfile = ({ TOKEN, id }) => {
  const options = {
    url: config.BASE_API_URL + "labourers/" + id,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axios(options);
};

//POST
export const addProfile = ({ TOKEN, labourer }) => {
  const options = {
    url: config.BASE_API_URL + "labourers",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: { labourer },
  };
  return axios(options);
};

//PUT
export const editProfile = ({ TOKEN, labourer, id }) => {
  const options = {
    url: config.BASE_API_URL + "labourers/" + id,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: { labourer },
  };
  return axios(options);
};
