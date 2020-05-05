import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getJobsDDL } from "../api/JobsApi";

const JobsSelector = (props) => {
  const [jobs, setJobs] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    getJobsDDL({ token: props.auth.JWToken })
      .then((response) => {
        if (response.data) {
          var array = Object.keys(response.data).map((item) => {
            return { id: item, label: response.data[item] };
          });
          setJobs(array);
          if (props.selected) {
            const job = array?.filter((item) => item.id == props.selected);
            if (job) {
              setSelectedOption(job);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.selected, props.auth.JWToken]);
  return (
    <Select
      values={selectedOption}
      required={props.required}
      style={{ borderRadius: "30px" }}
      clearable
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={jobs}
      placeholder={props.placeholder || "Jobs"}
    />
  );
};

export default JobsSelector;
