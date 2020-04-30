import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import CompaniesSelector from "../components/CompaniesSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getLabourerJobs } from "../api/labourerJobApi";
import { Table } from "react-bootstrap";
import { config } from "../api/config.json";
import Pagination from "../components/Pagination";

const RecruiterReportInvoices = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [filter, setFilter] = useState({
    fromDate: null,
    toDate: null,
    companyId: null,
  });

  useEffect(() => {
    search();
  }, [page]);

  const search = () => {
    getLabourerJobs({
      token: props.auth.JWToken,
      count: config.NUMBER_OF_ROWS_PER_PAGE,
      page: page,
      fromDate: filter.fromDate,
      toDate: filter.toDate,
      companyId: filter.companyId,
    })
      .then((response) => {
        if (response?.data?.result) {
          setData(response.data.result);
          setTotalRows(response.data.totalRows);
        } else {
          setData([]);
          setTotalRows(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (selected) => {
    setFilter({
      ...filter,
      companyId: selected.length > 0 ? selected[0].id : null,
    });
  };

  return (
    <div className="page-content">
      <div>
        <DatePicker
          isClearable
          name="fromDate"
          selected={filter.fromDate}
          onChange={(selected) => setFilter({ ...filter, fromDate: selected })}
          maxDate={filter.toDate || null}
        />
        <DatePicker
          isClearable
          name="toDate"
          selected={filter.toDate}
          onChange={(selected) => setFilter({ ...filter, toDate: selected })}
          minDate={filter.fromDate || null}
        />
        <CompaniesSelector auth={props.auth} onChange={onChange} />
        <button className="search-button" onClick={search}>
          <FontAwesomeIcon icon={faSearch} color="blue" />
        </button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Date</th>
              <th>Company name</th>
              <th>Job title</th>
              <th>Skill</th>
              <th>Labourer name</th>
              <th>Charge amount</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.companyName}</td>
                <td>{item.jobTitle}</td>
                <td>{item.skillName}</td>
                <td>{item.labourerFullName}</td>
                <td>{item.chargeAmount}</td>
                <td>
                  {item.qualityRating ? (
                    <FontAwesomeIcon icon={faCheck} color="green" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} color="red" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
          totalItem={totalRows}
          paginate={(pageNumber) => setPage(pageNumber)}
        />
      </div>
    </div>
  );
};

export default RecruiterReportInvoices;
