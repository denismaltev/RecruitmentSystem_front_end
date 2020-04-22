import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { getAllSkills } from "../api/SkillsApi";

const SkillsSelector = (props) => {
  const [skills, setSkills] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const loadSkils = () => {
    getAllSkills({ TOKEN: props.auth.JWToken }).then((response) => {
      const skillOptions = response.data.map((skill) => {
        return { value: skill.id, label: skill.name };
      });
      setSkills(skillOptions);
      setSelected();
    });
  };

  const setSelected = () => {
    if (props.selected) {
      const items = props.selected.map((skill) => {
        return { value: skill.id, label: skill.name };
      });
      setSelectedOption(items);
    }
  };

  useEffect(() => {
    loadSkils();
  }, []);

  return (
    <Select
      values={selectedOption}
      multi
      onChange={(selected) => props.onChange(selected)}
      options={skills}
      placeholder={props.placeholder ?? "Skills"}
    />
  );
};

export default SkillsSelector;
