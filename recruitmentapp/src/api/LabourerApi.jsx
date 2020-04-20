import { config } from "./config.json";
import axios from "axios";

//POST

export const createProfile = ({ TOKEN, labourer }) => {
  const options = {
    url: config.BASE_API_URL + "labourers",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: {
      labourer: labourer,
    },
  };
  return axios(options);
};

//GET
export const getLabourerInfo = ({ TOKEN, id }) => {
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

// export const UpdateProfile = ({ email, password, role }) => {
//   const options = {
//     url: config.BASE_API_URL + "auth/register",
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     data: {
//       email: email,
//       password: password,
//       rolename: role,
//     },
//   };
//   return axios(options);
// };
