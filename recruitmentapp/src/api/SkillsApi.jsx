import { config } from "./config.json";
import axios from "axios";

// GET ALL
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

// POST
export const postSkill = ({ TOKEN, skillName, chargeAmount, payAmount }) => {
  const options = {
    url: config.BASE_API_URL + "skills",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    },
    data: {
      Name: skillName,
      ChargeAmount: chargeAmount,
      PayAmount: payAmount,
      IsActive: true
    }
  };
  return axios(options);
};
