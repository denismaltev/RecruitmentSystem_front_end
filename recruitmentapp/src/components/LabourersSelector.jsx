import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getLabourersDDL } from "../api/LabourerApi";

const LabourersSelector = (props) => {
  const [labourers, setLabourers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const loadLabourers = () => {
    getLabourersDDL({ token: props.auth.JWToken }).then((response) => {
      setLabourers(response.data);
      setSelected();
    });
  };

  const setSelected = () => {
    if (props.selected) {
      setSelectedOption(props.selected);
    }
  };

  useEffect(() => {
    loadLabourers();
  }, []);

  return (
    <Select
      className="dropdown"
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
