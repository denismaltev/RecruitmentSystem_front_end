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
          if (response.data) {
            var array = response.data.map((item) => {
              return { id: item.id, label: item.fullName };
            });
            setLabourers(array);
          }
          if (props.selected && props.selected.length > 0) {
            const selectedLabourers = props.selected.map((item) => {
              return { id: item.labourerId, label: item.labourerFullName };
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
      style={{ borderRadius: "20px", minWidth: "180px", height: "10px" }}
      className="form-control"
      clearable
      values={selectedOption}
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={labourers}
      placeholder={props.placeholder ?? "Labourers"}
      multi={props.multi}
    />
  );
};

export default LabourersSelector;
