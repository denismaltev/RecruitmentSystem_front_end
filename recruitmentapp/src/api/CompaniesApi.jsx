import { config } from "./config.json";
import axios from "axios";
//"BASE_API_URL": "https://recruitmentsystemapi.azurewebsites.net/api/"

export const getCompaniesList = ({ token, PARAM }) => {
  const options = {
    url: config.BASE_API_URL + "companies/?" + PARAM,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

export const getCompanyInfo = ({ token, PROF_ID }) => {
  const options = {
    url: config.BASE_API_URL + "companies/" + PROF_ID,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  return axios(options);
};
export const getCompanyJobs = ({ token, PARAM }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/?" + PARAM,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  return axios(options);
};

export const getCompaniesDDL = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "companies/getcompaniesddL",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

export const postCompanyProfile = ({
  token,
  NAME,
  CITY,
  PROVINCE,
  COUNTRY,
  ADDRESS,
  PHONE,
  EMAIL,
  IS_ACTIVE
}) => {
  const options = {
    url: config.BASE_API_URL + "companies",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: {
      name: NAME,
      city: CITY,
      PROVINCE: PROVINCE,
      country: COUNTRY,
      address: ADDRESS,
      phone: PHONE,
      email: EMAIL,
      isActive: IS_ACTIVE
    }
  };

  return axios(options);
};

export const putCompanies = ({
  token,
  PROF_ID,
  NAME,
  CITY,
  PROVINCE,
  COUNTRY,
  ADDRESS,
  PHONE,
  EMAIL,
  IS_ACTIVE
}) => {
  const options = {
    url: config.BASE_API_URL + "companies/" + PROF_ID,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    data: {
      id: PROF_ID,
      name: NAME,
      city: CITY,
      PROVINCE: PROVINCE,
      country: COUNTRY,
      address: ADDRESS,
      phone: PHONE,
      email: EMAIL,
      isActive: IS_ACTIVE
    }
  };
  return axios(options);
};
