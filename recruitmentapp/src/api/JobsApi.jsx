import { config } from "./config.json";
import axios from "axios";

export const getCompanyJobs = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "jobs",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

//GET by ID
export const getJobById = ({ TOKEN, id }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/" + id,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`
    }
  };
  return axios(options);
};

//PUT
export const puJob = ({
  TOKEN,
  id,
  name,
  description,
  city,
  province,
  country,
  address,
  startDate,
  endDate,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  isActive
}) => {
  const options = {
    url: config.BASE_API_URL + "jobs/" + id,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`
    },
    data: {
      id: id,
      name: name,
      description: description,
      city: city,
      province: province,
      country: country,
      address: address,
      startDate: startDate,
      endDate: endDate,
      sunday: sunday,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      isActive: isActive
    }
  };
  return axios(options);
};
