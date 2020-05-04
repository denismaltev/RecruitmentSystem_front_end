import { config } from "./config.json";
import axios from "axios";

//GET labourersjobs
export const getLabourerJobs = ({
  token,
  count,
  page,
  fromDate,
  toDate,
  jobId,
  labourerId,
  companyId
}) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs?count=${count || ""}&page=${page ||
      ""}&fromDate=${fromDate ? new Date(fromDate).toISOString() : ""}&toDate=${
      toDate ? new Date(toDate).toISOString() : ""
    }&labourerId=${labourerId || ""}&jobId=${jobId ||
      ""}&companyId=${companyId || ""}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

// GET all labourerJobs for Admin
export const getLabourerJobsReport = ({
  token,
  count,
  page,
  fromDate,
  toDate,
  labourerId,
}) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs/LabourerJobReport?count=${
      count || ""
    }&page=${page || ""}&fromDate=${
      fromDate ? new Date(fromDate).toISOString() : ""
    }&toDate=${toDate ? new Date(toDate).toISOString() : ""}&labourerId=${
      labourerId || ""
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

export const getLabourerJobsDetailedReport = ({
  token,
  count,
  page,
  fromDate,
  toDate,
  detailPageId,
}) => {
  const options = {
    url: `${
      config.BASE_API_URL
    }labourerjobs/LabourerJobReport/${detailPageId}?count=${count || ""}&page=${
      page || ""
    }&fromDate=${fromDate ? new Date(fromDate).toISOString() : ""}&toDate=${
      toDate ? new Date(toDate).toISOString() : ""
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

export const getJobInfoByCompany = ({ TOKEN }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  return axios(options);
};

export const updateLabourerJobRating = ({
  token,
  labourerJobId,
  qualityRating,
  safetyRating
}) => {
  const options = {
    url: `${
      config.BASE_API_URL
    }labourerjobs/${labourerJobId}?qualityRating=${qualityRating ??
      ""}&safetyRating=${safetyRating ?? ""}`,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

// POST ratings
export const postRatings = ({ token, param }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/UpdateJobRating?" + param,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

// POST rating by company

export const postJobRatingsByCompany = ({ token, param, labourerjobId }) => {
  const options = {
    url: config.BASE_API_URL + "labourerjobs/" + labourerjobId + "?" + param,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

export const getInvoices = ({
  token,
  count,
  page,
  companyId,
  fromDate,
  toDate
}) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs/getinvoices?count=${count ||
      ""}&page=${page || ""}&companyId=${companyId || ""}&fromDate=${
      fromDate ? new Date(fromDate).toISOString() : ""
    }&toDate=${toDate ? new Date(toDate).toISOString() : ""}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};

export const getCompanyInvoiceDetails = ({
  token,
  count,
  page,
  companyId,
  fromDate,
  toDate
}) => {
  const options = {
    url: `${config.BASE_API_URL}labourerjobs/getinvoices/${companyId ||
      ""}?count=${count || ""}&page=${page || ""}&fromDate=${
      fromDate ? new Date(fromDate).toISOString() : ""
    }&toDate=${toDate ? new Date(toDate).toISOString() : ""}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return axios(options);
};
