import { config } from "./config.json";
import axios from "axios";

//GET all labourers
export const getAllLabourers = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "labourers",
    method: "GET",
    headers: {
      Accept: "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

export const selectAllLabourers = ({ token }) => {
  const options = {
    url: `${config.BASE_API_URL}labourers`,
    method: "GET",
    headers: {
      Accept: "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

//GET labourer info
export const getLabourerById = ({ token, id }) => {
  const options = {
    url: config.BASE_API_URL + "labourers/" + id,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const saveLabourer = ({ token, labourer }) => {
  const options = {
    url: config.BASE_API_URL + "labourers/" + (labourer.id ?? ""),
    method: labourer.id ? "PUT" : "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    data: labourer,
  };
  return axios(options);
};
