import { config } from "./config.json";
import axios from "axios";

export const getCompaniesList = ({ TOKEN }) => {
    const options = {
      url: config.BASE_API_URL + "companies/",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${TOKEN}`,
      }
    };
    return axios(options);
};

export const getCompanyInfo = ({ TOKEN , PROF_ID}) => {
  const options = {
    url: config.BASE_API_URL + "companies/" + PROF_ID,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    }
  };

  return axios(options);
};
  // https://recruitmentsystemapi.azurewebsites.net/api/jobs/?companyId=1&count=20&page=1&fromDate=2020 - 04 - 21T00: 00:00&toDate=2020 - 04 - 27T00: 00:00
export const getCompanyJobs = ({  TOKEN , PARAM}) => {
  // const URL = config.BASE_API_URL + "jobs/"+"?companyId="+COMP_ID+"&count="+count+"&page="+ page + "&fromDate="+fromDate+"&toDate="+toDate;
  console.log(PARAM);

  const options = {
  
    url: config.BASE_API_URL + "jobs?"+ PARAM,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    },
   
  };

  return axios(options);
};

export const postCompanyProfile = ({  
  TOKEN,
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
      Authorization: `Bearer ${TOKEN}`
    },
    data: {
      name: NAME,
      city: CITY,
      PROVINCE: PROVINCE,
      country : COUNTRY,
      address : ADDRESS,
      phone : PHONE,
      email : EMAIL,
      isActive: IS_ACTIVE
    }
  };

  return axios(options);
};

export const putCompanies = ({
    TOKEN,
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
        Authorization: `Bearer ${TOKEN}`
     },
      data: {
        id: PROF_ID,
        name: NAME,
        city: CITY,
        PROVINCE: PROVINCE,
        country : COUNTRY,
        address : ADDRESS,
        phone : PHONE,
        email : EMAIL,
        isActive: IS_ACTIVE
      }
    };

    return axios(options);
  };
