import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getLabourersDDL } from "../api/LabourerApi";

const LabourersSelector = (props) => {
  const [labourers, setLabourers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const loadLabourers = () => {
    getLabourersDDL({ token: props.auth.JWToken, jobId: props.jobId }).then(
      (response) => {
        setLabourers(response.data);
        setSelected();
      }
    );
  };

  const setSelected = () => {
    if (props.selected) {
      setSelectedOption(props.selected);
    }
  };

  useEffect(() => {
    loadLabourers();
  }, [props.jobId]);

  return (
    <Select
      style={{ borderRadius: "30px" }}
      className="form-control"
      clearable
      values={selectedOption}
      labelField="fullName"
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={labourers}
      placeholder={props.placeholder ?? "Labourers"}
    />
  );
};

export default LabourersSelector;
