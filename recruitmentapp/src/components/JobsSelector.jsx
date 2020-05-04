import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getJobsDDL } from "../api/JobsApi";

const JobsSelector = (props) => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobsDDL({ token: props.auth.JWToken, labourerId: props.labourerId })
      .then((response) => {
        if (response.data) {
          var array = Object.keys(response.data).map((item) => {
            return { id: item, label: response.data[item] };
          });
          setJobs(array);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.labourerId]);
  return (
    <Select
      style={{ borderRadius: "30px" }}
      className="form-control"
      clearable
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={jobs}
      placeholder={props.placeholder || "Jobs"}
    />
  );
};

export default JobsSelector;
