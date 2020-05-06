import { config } from "./config.json";
import axios from "axios";

export const getAnnualProfitReport = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "admin/annualprofitreport",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const getCurrentMonthExpenses = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "admin/currentmonthexpenses",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const getCurrentMonthIncome = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "admin/currentmonthincome",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};
