import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getLabourersDDL } from "../api/LabourerApi";

const LabourersSelector = (props) => {
  const [labourers, setLabourers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    let mounted = true;
    getLabourersDDL({ token: props.auth.JWToken, jobId: props.jobId }).then(
      (response) => {
        if (mounted) {
          setLabourers(response.data);
          if (props.selected && props.selected.length > 0) {
            const selectedLabourers = props.selected.map((item) => {
              return { id: item.labourerId, fullName: item.labourerFullName };
            });
            if (selectedLabourers) {
              setSelectedOption(selectedLabourers);
            }
          }
        }
      }
    );
    return () => (mounted = false);
  }, [props.jobId, props.selected, props.auth.JWToken]);

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
