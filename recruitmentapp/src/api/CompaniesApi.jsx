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

//get one company ( all roles )
export const getCompany = ({ TOKEN, id }) => {
  const options = {
    url: config.BASE_API_URL + "companies/" + { id },
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`
    },
  };
  return axios(options);
}

//update company (admin, company)
export const updateCompany = ({ TOKEN, id, profileId, companyName, city, province, country, address, phone, email, isActive }) => {
    const options = {
      url: config.BASE_API_URL + `companies/ ${id}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        id: id,
        profileId: profileId,
        name: companyName,
        city: city,
        province: province,
        country: country,
        address: address,
        phone: phone,
        email: email,
        isActive: isActive,
      },
    };
     return axios(options);
}

// add company (company)
export const addCompany = ({
         TOKEN,
         companyName,
         email,
         phone,
         address,
         city,
         province,
         country,
         isActive,
       }) => {
         const options = {
           url: config.BASE_API_URL + "companies/",
           method: "POST",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json;charset=UTF-8",
             Authorization: `Bearer ${TOKEN}`,
           },
           data: {
             name: companyName,
             email: email,
             phone: phone,
             address: address,
             city: city,
             province: province,
             country: country,
             isActive: isActive,
           },
         };
         return axios(options);
       };

