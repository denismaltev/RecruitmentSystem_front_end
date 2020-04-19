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
      name: skillName,
      chargeAmount: chargeAmount,
      payAmount: payAmount,
      isActive: true
    }
  };
  return axios(options);
};

// PUT
export const putSkill = ({
  TOKEN,
  id,
  skillName,
  chargeAmount,
  payAmount,
  isActive
}) => {
  const options = {
    url: config.BASE_API_URL + "skills/" + id,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    },
    data: {
      id: id,
      name: skillName,
      chargeAmount: chargeAmount,
      payAmount: payAmount,
      isActive: isActive
    }
  };
  return axios(options);
};
