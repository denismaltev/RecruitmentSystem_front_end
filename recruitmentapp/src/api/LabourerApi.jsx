import { config } from "./config.json";
import axios from "axios";

//GET all labourers for dropdown list
export const getLabourersDDL = ({ token, jobId }) => {
  const options = {
    url: `${config.BASE_API_URL}labourers/getlabourersddl?jobId=${jobId || ""}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

//GET all labourers
export const getAllLabourers = ({ token, count, page, orderByTopRated }) => {
  const options = {
    url: `${config.BASE_API_URL}labourers?count=${count || ""}&page=${
      page || ""
    }&orderByTopRated=${orderByTopRated || ""}`,
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
    url: `${config.BASE_API_URL}labourers/${id}`,
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
