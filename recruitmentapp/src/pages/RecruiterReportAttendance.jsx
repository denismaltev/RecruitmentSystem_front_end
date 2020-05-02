// import React from "react";
// import { Table } from "react-bootstrap";
// import LabourersSelector from "../components/LabourersSelector";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
// import { getLabourerJobs } from "../api/labourerJobApi";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Pagination from "../components/Pagination";
// import { config } from "../api/config.json";

// var count = 5;
// export default class RecruiterReportAttendance extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       idToSearch: 0,
//       searchClicked: false,
//       result: [],
//       fromDate: new Date(),
//       toDate: new Date(),
//       totalLabourer: 0,
//       page: 1,
//       filterByDate: false,
//     };
//     this.paginate = this.paginate.bind(this);
//   }

//   selectLabourer = (selected) => {
//     this.setState({ idToSearch: selected[0].id });
//   };

//   componentDidMount() {
//     this.showAllLabourers();
//   }

//   showAllLabourers = async () => {
//     const token = this.props.auth.JWToken;
//     var page = this.state.page;
//     var today = new Date();
//     var toDate = today.toISOString().split("T")[0];
//     var fromDate = new Date();
//     fromDate.setDate(today.getDate() - 7);
//     console.log(toDate);
//     console.log(fromDate);
//     await getLabourerJobs({
//       token,
//       count,
//       page,
//       fromDate,
//       toDate,
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           this.setState({
//             result: res.data.result,
//             totalLabourer: res.data.totalRows,
//           });
//           this.paginate = this.paginate.bind(this);
//         } else {
//           alert("ERROR: Something went wrong! " + res.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert("Something went wrong! " + error.response.data.message);
//       });
//   };

//   search = (event) => {
//     const token = this.props.auth.JWToken;
//     var page = this.state.page;
//     if (this.state.idToSearch) {
//       var labourerId = this.state.idToSearch;
//     } else {
//       var labourerId = "";
//     }
//     if (this.state.filterByDate) {
//       var fromDate = this.state.fromDate.toISOString().split("T")[0];
//       var toDate = this.state.toDate.toISOString().split("T")[0];
//     } else {
//       var fromDate = "";
//       var toDate = "";
//     }

//     getLabourerJobs({
//       token,
//       count,
//       page,
//       fromDate,
//       toDate,
//       labourerId,
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           this.setState({
//             result: res.data.result,
//             totalLabourer: res.data.totalRows,
//           });
//           this.paginate = this.paginate.bind(this);
//         } else {
//           alert("ERROR: Something went wrong! " + res.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert("Something went wrong! " + error.response.data.message);
//       });
//     this.setState({ searchClicked: true });
//   };

//   handleChange(date, flag) {
//     if (flag === 1) {
//       this.setState({
//         fromDate: date,
//       });
//     }
//     if (flag === 2) {
//       this.setState({
//         toDate: date,
//       });
//     }
//   }

//   showDate = (event) => {
//     this.setState({
//       filterByDate: true,
//     });
//   };

//   paginate = async (number) => {
//     await this.setState({
//       page: number,
//     });
//     if (this.state.searchClicked) {
//       this.search();
//     } else {
//       this.showAllLabourers();
//     }
//   };

//   displayTableData() {
//     return this.state.result.map((item) => {
//       return (
//         <tr key={item.id}>
//           <td>{item.labourerFullName}</td>
//           <td>{item.jobs}</td>
//           <td>{item.totalAmount}</td>
//         </tr>
//       );
//     });
//   }

//   render() {
//     return (
//       <div className="page-content">
//         <div className="search-filter">
//           <button className="search-button" onClick={this.showDate}>
//             Filter by Date
//           </button>
//           {this.state.filterByDate && (
//             <div className="date-picker">
//               <DatePicker
//                 name="fromDate"
//                 selected={this.state.fromDate}
//                 onSelect={this.handleSelect}
//                 onChange={(date) => this.handleChange(date, 1)}
//               />
//               <DatePicker
//                 name="toDate"
//                 selected={this.state.toDate}
//                 onSelect={this.handleSelect}
//                 onChange={(date) => this.handleChange(date, 2)}
//               />
//             </div>
//           )}
//           <LabourersSelector
//             auth={this.props.auth}
//             selected={this.state.labourerId || 0}
//             placeholder="Choose the labourer"
//             onChange={this.selectLabourer}
//           />
//         </div>
//         <div>
//           <div>
//             <Table striped bordered hover>
//               <thead className="table-secondary">
//                 <tr>
//                   <th>Labourer Name</th>
//                   <th>Jobs</th>
//                   <th>Total Amount</th>
//                 </tr>
//               </thead>
//               <tbody>{this.displayTableData()}</tbody>
//             </Table>
//             <Pagination
//               itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
//               totalItem={this.state.totalLabourer}
//               paginate={this.paginate}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

import React from "react";
import { Table } from "react-bootstrap";
import LabourersSelector from "../components/LabourersSelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";

export default class RecruiterReportAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idToSearch: 0,
      searchClicked: false,
      result: [],
      fromDate: new Date(),
      toDate: new Date(),
      totalLabourer: 0,
      page: 1,
    };
    this.paginate = this.paginate.bind(this);
  }

  selectLabourer = (selected) => {
    this.setState({ idToSearch: selected[0].id });
  };

  componentDidMount() {
    //this.showAllLabourers();
  }

  // showAllLabourers = async () => {
  //   const token = this.props.auth.JWToken;
  //   var page = this.state.page;
  //   var today = new Date();
  //   var toDate = today.toISOString().split("T")[0];
  //   var fromDate = new Date();
  //   fromDate.setDate(today.getDate() - 7);
  //   console.log(toDate);
  //   console.log(fromDate);
  //   await getLabourerJobs({
  //     token,
  //     count,
  //     page,
  //     fromDate,
  //     toDate,
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         this.setState({
  //           result: res.data.result,
  //           totalLabourer: res.data.totalRows,
  //         });
  //         this.paginate = this.paginate.bind(this);
  //       } else {
  //         alert("ERROR: Something went wrong! " + res.statusText);
  //       }
  //     })
  //     .catch(function (error) {
  //       alert("Something went wrong! " + error.response.data.message);
  //     });
  // };

  // search = (event) => {
  //   const token = this.props.auth.JWToken;
  //   var page = this.state.page;
  //   if (this.state.idToSearch) {
  //     var labourerId = this.state.idToSearch;
  //   } else {
  //     var labourerId = "";
  //   }
  //   if (this.state.filterByDate) {
  //     var fromDate = this.state.fromDate.toISOString().split("T")[0];
  //     var toDate = this.state.toDate.toISOString().split("T")[0];
  //   } else {
  //     var fromDate = "";
  //     var toDate = "";
  //   }

  //   getLabourerJobs({
  //     token,
  //     count,
  //     page,
  //     fromDate,
  //     toDate,
  //     labourerId,
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         this.setState({
  //           result: res.data.result,
  //           totalLabourer: res.data.totalRows,
  //         });
  //         this.paginate = this.paginate.bind(this);
  //       } else {
  //         alert("ERROR: Something went wrong! " + res.statusText);
  //       }
  //     })
  //     .catch(function (error) {
  //       alert("Something went wrong! " + error.response.data.message);
  //     });
  //   this.setState({ searchClicked: true });
  // };

  handleChange(date, flag) {
    if (flag === 1) {
      this.setState({
        fromDate: date,
      });
    }
    if (flag === 2) {
      this.setState({
        toDate: date,
      });
    }
  }

  paginate = async (number) => {
    await this.setState({
      page: number,
    });
    if (this.state.searchClicked) {
      this.search();
    } else {
      this.showAllLabourers();
    }
  };

  displayTableData() {
    const hardCodedResult = [
      {
        id: 1,
        labourerFullName: "labourer labourer",
        jobs: [
          {
            jobId: 1,
            jobTitle: "Job",
            date: "2020-04-06T00:00:00",
            wageAmount: 20.0,
          },
          {
            jobId: 1,
            jobTitle: "Job",
            date: "2020-04-06T00:00:00",
            wageAmount: 17.0,
          },
          {
            jobId: 2,
            jobTitle: "Doctor",
            date: "2020-01-02T00:00:00",
            wageAmount: 17.0,
          },
        ],
      },
      {
        id: 2,
        labourerFullName: "sara",
        jobs: [
          {
            jobId: 1,
            jobTitle: "Job",
            date: "2020-04-06T00:00:00",
            wageAmount: 20.0,
          },
          {
            jobId: 2,
            jobTitle: "Job",
            date: "2020-04-06T00:00:00",
            wageAmount: 40.0,
          },
          {
            jobId: 3,
            jobTitle: "Doctor",
            date: "2020-01-02T00:00:00",
            wageAmount: 17.0,
          },
        ],
      },
    ];

    return hardCodedResult.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.labourerFullName}</td>
          <td>
            <ul>
              {item.jobs.map((x) => (
                <li>{x.jobTitle}</li>
              ))}
            </ul>
          </td>
          <td>
            {8 * item.jobs.reduce((prev, next) => prev + next.wageAmount, 0)}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="page-content">
        <div className="search-filter">
          <div className="date-picker">
            <DatePicker
              isClearable
              name="fromDate"
              selected={this.state.fromDate}
              onSelect={this.handleSelect}
              onChange={(date) => this.handleChange(date, 1)}
            />
            <DatePicker
              isClearable
              name="toDate"
              selected={this.state.toDate}
              onSelect={this.handleSelect}
              onChange={(date) => this.handleChange(date, 2)}
            />
          </div>
          <LabourersSelector
            auth={this.props.auth}
            selected={this.state.labourerId || 0}
            placeholder="Choose the labourer"
            onChange={this.selectLabourer}
          />
        </div>
        <div>
          <div>
            <Table striped bordered hover>
              <thead className="table-secondary">
                <tr>
                  <th>Labourer Name</th>
                  <th>Jobs</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>{this.displayTableData()}</tbody>
            </Table>
            <Pagination
              itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
              totalItem={this.state.totalLabourer}
              paginate={this.paginate}
            />
          </div>
        </div>
      </div>
    );
  }
}
