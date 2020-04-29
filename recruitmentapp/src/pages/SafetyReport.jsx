import React, { useState, useEffect } from "react";
import { getLabourerJobs } from "../api/labourerJobApi";
import { Table } from "react-bootstrap";
import SafetyReportItem from "../components/SafetyReportItem";
import StarRatings from "react-star-ratings";

const SafetyReport = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(100);

  useEffect(() => {
    getLabourerJobs({
      token: props.auth.JWToken,
      count: 20,
      page: page,
      fromDate: "",
      toDate: "",
    })
      .then((response) => {
        setData(response.data.result);
        setTotalRows(response.data.totalRows);
      })
      .catch((error) => {
        alert("Something went wrong! " + error.response.data.message);
      });
  }, [page, props.auth.JWToken]);

  return (
    <div className="page-content">
      <Table striped bordered hover>
        <thead className="table-secondary">
          <tr>
            <th>Labourer full name</th>
            <th>Labourer phone</th>
            <th>Job title</th>
            <th>Job skill</th>
            <th>Date</th>
            <th>Safety rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <SafetyReportItem key={index} {...props} item={item} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SafetyReport;
