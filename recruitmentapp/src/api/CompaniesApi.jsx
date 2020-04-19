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

//get one company

//updatec company (admin, company)
export const updateCompany = ({ TOKEN, id, companyName, city, province, country, address, phone, email, isActive }) => {
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
        name: companyName,
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
// export const addCompany = ({ role }) => {
//   const options = {
//     url: config.BASE_API_URL + "companies/",
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//       Authorization: `Bearer ${this.props.auth.JWToken}`,
//     },
//     data: {
//       name: name,
//       city: city,
//       province: province,
//       country: country,
//       address: address,
//       phone: phone,
//       isActive: isActive,
//     },
//   };
//    return axios(options);
// };

