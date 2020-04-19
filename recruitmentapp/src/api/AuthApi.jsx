import { config } from "./config.json";
import axios from "axios";

export const signIn = ({ email, password }) => {
  const options = {
    url: config.BASE_API_URL + "auth/login",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      email: email,
      password: password,
    },
  };
  return axios(options);
};

export const signUp = ({ email, password, role }) => {
  const options = {
    url: config.BASE_API_URL + "auth/register",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      email: email,
      password: password,
      rolename: role,
    },
  };
  return axios(options);
};
