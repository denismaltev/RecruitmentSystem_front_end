import React, { useState, useEffect }from "react";
import { Table } from "react-bootstrap";
import { getLabourerJobs } from "../api/labourerJobApi";

const JobLabourer = (props) => {
  const token = props.auth.JWToken;
  const id = props.match.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [labourer, setLabourer] = useState({
    skillName: "",
    labourerFullName: "",
    labourerPhone: ""
  });
}


export default class companyjoblabourers extends React.Component {
    render() {
        return  (
          <div className="page-content">
            <h1>Job Title Placeholder Labourers List</h1>
            <Table striped bordered hover>
              <thead className="table-secondary">
                <tr>
                  <th scope="col">Skill Name</th>
                  <th scope="col">Labourer Full Name</th>
                  <th scope="col">Labourer Phone Number</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Placeholder - Painter</td>
                      <td>Placeholder - John Smith</td>
                      <td>Placeholder - 777-888-9999</td>
                  </tr>
              </tbody>
            </Table>
          </div>
        );
    }
}