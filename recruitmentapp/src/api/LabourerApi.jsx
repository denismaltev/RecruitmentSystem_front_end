import { config } from "./config.json";
import axios from "axios";

//GET labourer info
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

//GET skills
export const showSkills = ({ TOKEN }) => {
  const options = {
    url: config.BASE_API_URL + "skills/",
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
    data: labourer,
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
    data: labourer,
  };
  return axios(options);
};

// export const editProfile = ({
//   TOKEN,
//   ID,
//   FIRSTNAME,
//   LASTNAME,
//   CITY,
//   PROVINCE,
//   COUNTRY,
//   ADDRESS,
//   PHONE,
//   EMAIL,
//   IS_ACTIVE
// }) => {
//   const options = {
//     url: config.BASE_API_URL + "labourers/" + ID,
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${TOKEN}`
//    },
//     data: {
//       id: ID,
//       firstName: FIRSTNAME,
//       lastName: LASTNAME,
//       city: CITY,
//       PROVINCE: PROVINCE,
//       country : COUNTRY,
//       address : ADDRESS,
//       phone : PHONE,
//       email : EMAIL,
//       isActive: IS_ACTIVE
//     }
//   };

//   return axios(options);
// };
