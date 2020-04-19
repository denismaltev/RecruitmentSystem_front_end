import { config } from "./config.json";
import axios from "axios";

export const getCompaniesList = ({ role }) => {
    const options = {
      url: config.BASE_API_URL + "companies/",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${this.props.auth.JWToken}`,
      },
      data: {},
    };
    return axios(options);
};

//get one company

// update company (admin, company)
export const updateCompany = ({ company }) => {
    const options = {
      url: config.BASE_API_URL + `companies/ ${id}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${this.props.auth.JWToken}`,
      },
      data: {
        id: id,
        name: name,
        city: city,
        province: province,
        country: country,
        address: address,
        phone: phone,
        isActive: isActive,
      },
    };
     return axios(options);
}

// add company (company)
export const addCompany = ({ role }) => {
  const options = {
    url: config.BASE_API_URL + "companies/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${this.props.auth.JWToken}`,
    },
    data: {
      name: name,
      city: city,
      province: province,
      country: country,
      address: address,
      phone: phone,
      isActive: isActive,
    },
  };
   return axios(options);
};

