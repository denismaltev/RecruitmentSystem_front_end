import React, { useState, useEffect }from "react";
import { Table } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { getAllLabourerjobs } from "../api/labourerJobApi";


export default class CompanyJobLabourers extends React.Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     isLoading: false,
                     job: {
                       id: props.jobId,
                     },
                     labourers: [],
                   };
                 }

                 componentDidMount() {
                   this.getLabourersListFromAPI();
                 }

                 getLabourersListFromAPI = async () => {
                   const token = this.props.auth.JWToken;
                   var count = 10;
                   var pageNumber = this.state.page;
                   var jobId = this.state.job.jobId;
                   var today = new Date();
                   var fromDate = today.toISOString().split("T")[0];
                   var toDate = today.toISOString().split("T")[0];

                   const param = `count=${count}&page=${pageNumber}&jobId=${jobId}&fromDate=${fromDate}&toDate=${toDate}`;
                   await getAllLabourerjobs({ token, param }).then((res) => {
                     if (res.state === 200) {
                       this.setState({ labourers: res.data.result });
                     } else {
                     }
                     this.paginate = this.paginate.bind(this);
                   });
                 };

                 paginate = (number) => {
                   this.setState({ page: number }, () => {
                     this.showJobList();
                   });
                 };

                 render() {
                   return (
                     <div className="page-content">
                       <h1>Job Title Placeholder Labourers List</h1>
                       <Table striped bordered hover>
                         <thead className="table-secondary">
                           {this.state.labourers.map}
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