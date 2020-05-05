import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getLabourersDDL } from "../api/LabourerApi";

const LabourersSelector = (props) => {
  const [labourers, setLabourers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const setSelected = () => {
    if (props.selected) {
      setSelectedOption(props.selected);
    } else {
      setSelectedOption([]);
    }
  };

  useEffect(() => {
    let mounted = true;
    getLabourersDDL({ token: props.auth.JWToken, jobId: props.jobId }).then(
      (response) => {
        if (mounted) {
          setLabourers(response.data);
          setSelected();
        }
      }
    );
    return () => (mounted = false);
  }, [props.jobId]);

  return (
    <Select
      disabled={props.disabled}
      style={{ borderRadius: "30px" }}
      className="dropdown"
      clearable
      values={selectedOption}
      labelField="fullName"
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={labourers}
      placeholder={props.placeholder ?? "Labourers"}
      multi={props.multi}
    />
  );
};

export default LabourersSelector;
