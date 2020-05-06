import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getSkillsDDL } from "../api/SkillsApi";

const SkillsSelector = (props) => {
  const [skills, setSkills] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const setSelected = () => {
    if (props.selected) {
      setSelectedOption(props.selected);
    }
  };

  useEffect(() => {
    let mounted = true;
    getSkillsDDL({ token: props.auth.JWToken }).then((response) => {
      if (mounted) {
        setSkills(response.data);
        setSelected();
      }
    });
    return () => (mounted = false);
  }, [props.auth.JWToken]);

  return (
    <Select
      color="#46b3ff"
      style={{ borderRadius: "30px" }}
      className="form-control"
      values={selectedOption}
      multi
      labelField="name"
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={skills}
      placeholder={props.placeholder ?? "Skills"}
    />
  );
};

export default SkillsSelector;
