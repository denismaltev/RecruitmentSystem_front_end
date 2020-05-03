import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import { getCompaniesDDL } from "../api/CompaniesApi";

const CompaniesSelector = (props) => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    getCompaniesDDL({ token: props.auth.JWToken })
      .then((response) => {
        if (response.data) {
          var array = Object.keys(response.data).map((item) => {
            return { id: item, label: response.data[item] };
          });
          setCompanies(array);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Select
      style={{ borderRadius: "30px" }}
      className="form-control"
      clearable
      valueField="id"
      onChange={(selected) => props.onChange(selected)}
      options={companies}
      placeholder={props.placeholder || "Company"}
    />
  );
};

export default CompaniesSelector;
