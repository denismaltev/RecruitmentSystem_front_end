import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getAllLabourers } from "../api/LabourerApi";

const LabourersSelector = (props) => {
  const [labourers, setLabourers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const loadLabourers = () => {
    getAllLabourers({ token: props.auth.JWToken }).then((response) => {
      var array = response.data.map((item) => ({
        labourer:
          "first name: " +
          item.firstName +
          " - last name: " +
          item.lastName +
          " - phone: " +
          item.phone,
        id: item.id,
      }));
      setLabourers(array);
      console.log(response.data);
      console.log(array);
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
      labelField="labourer"
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={labourers}
      placeholder={props.placeholder ?? "Labourers"}
    />
  );
};

export default LabourersSelector;
