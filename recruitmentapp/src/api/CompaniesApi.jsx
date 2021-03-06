import { config } from "./config.json";
import axios from "axios";
//"BASE_API_URL": "https://recruitmentsystemapi.azurewebsites.net/api/"

export const getCompaniesList = ({ token, count, page, orderByTopRated }) => {
  const options = {
    url: `${config.BASE_API_URL}companies?count=${count || ""}&page=${
      page || ""
    }&orderByTopRated=${orderByTopRated || ""}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const getCompanyInfo = ({ token, companyId }) => {
  const options = {
    url: config.BASE_API_URL + "companies/" + companyId,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};
export const getCompanyJobs = ({ token, param }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/?" + param,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const postCompanyProfile = ({
  token,
  name,
  email,
  city,
  province,
  country,
  address,
  phone,
  is_active,
}) => {
  const options = {
    url: config.BASE_API_URL + "companies",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      name: name,
      city: city,
      PROVINCE: province,
      country: country,
      address: address,
      phone: phone,
      email: email,
      isActive: is_active,
    },
  };

  return axios(options);
};

export const putCompanies = ({
  token,
  prof_id,
  name,
  email,
  city,
  province,
  country,
  address,
  phone,
  is_active,
}) => {
  const options = {
    url: config.BASE_API_URL + "companies/" + prof_id,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: prof_id,
      name: name,
      city: city,
      PROVINCE: province,
      country: country,
      address: address,
      phone: phone,
      email: email,
      isActive: is_active,
    },
  };
  return axios(options);
};
