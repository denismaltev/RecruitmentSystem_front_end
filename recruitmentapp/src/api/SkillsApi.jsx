import { config } from "./config.json";
import axios from "axios";

export const getAllSkills = ({ TOKEN }) => {
  const options = {
    url: config.BASE_API_URL + "skills",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    }
  };
  return axios(options);
};

// await fetch(API_URL, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${this.props.auth.JWToken}`
//     }
//   })
