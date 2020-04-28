import React, { useState, useEffect }from "react";
import { Table } from "react-bootstrap";
import { getAllLabourerJobs } from "../api/labourerJobApi";


export default class companyjoblabourers extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
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