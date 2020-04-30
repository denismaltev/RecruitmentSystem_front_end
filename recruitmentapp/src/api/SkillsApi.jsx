import { config } from "./config.json";
import axios from "axios";

export const getSkillsDDL = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "skills/getskillsddl",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

// GET ALL
export const getAllSkills = ({ token, count, page }) => {
  const options = {
    url: `${config.BASE_API_URL}skills?count=${count || ""}&page=${
      page || ""
    }`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

// POST
export const postSkill = ({ token, skillName, chargeAmount, payAmount }) => {
  const options = {
    url: config.BASE_API_URL + "skills",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      name: skillName,
      chargeAmount: chargeAmount,
      payAmount: payAmount,
      isActive: true,
    },
  };
  return axios(options);
};

// PUT
export const putSkill = ({
  token,
  id,
  skillName,
  chargeAmount,
  payAmount,
  isActive,
}) => {
  const options = {
    url: config.BASE_API_URL + "skills/" + id,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: id,
      name: skillName,
      chargeAmount: chargeAmount,
      payAmount: payAmount,
      isActive: isActive,
    },
  };
  return axios(options);
};
