import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getAllLabourers } from "../api/LabourerApi";

const LabourersSelector = (props) => {
  const [labourers, setLabourers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const loadLabourers = () => {
    getAllLabourers({ token: props.auth.JWToken }).then((response) => {
      setLabourers(response.data);
      console.log(response.data);
      console.log(labourers);
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
      values={selectedOption}
      multi
      labelField="fullNameAndPhone"
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={labourers}
      placeholder={props.placeholder ?? "Labourers"}
    />
  );
};

export default LabourersSelector;
