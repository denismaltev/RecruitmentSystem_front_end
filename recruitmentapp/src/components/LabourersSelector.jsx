import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { selectAllLabourers } from "../api/LabourerApi";

const LabourersSelector = (props) => {
  const [labourers, setLabourers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const loadLabourers = () => {
    selectAllLabourers({ token: props.auth.JWToken }).then((response) => {
      var array = response.data.result.map((item) => ({
        labourer: item.firstName + " " + item.lastName + " " + item.phone,
        id: item.id,
      }));
      setLabourers(array);
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
      labelField="labourer"
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={labourers}
      placeholder={props.placeholder ?? "Labourers"}
    />
  );
};

export default LabourersSelector;
