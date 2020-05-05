import { config } from "./config.json";
import axios from "axios";

export const getIncidentReports = ({
  token,
  count,
  page,
  companyId,
  fromDate,
  toDate,
}) => {
  const options = {
    url: `${config.BASE_API_URL}incidentreports?
        count=${count || ""}&page=${page || ""}&companyId=${companyId || ""}
        &fromDate=${fromDate ? new Date(fromDate).toISOString() : ""}
        &toDate=${toDate ? new Date(toDate).toISOString() : ""}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const getIncidentReportDetails = ({ token, id }) => {
  const options = {
    url: `${config.BASE_API_URL}incidentreports/${id}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

export const saveIncidentReport = ({ token, report }) => {
  const options = {
    url: `${config.BASE_API_URL}incidentreports/${report.id || ""}`,
    method: report.id > 0 ? "PUT" : "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    data: report,
  };
  return axios(options);
};
