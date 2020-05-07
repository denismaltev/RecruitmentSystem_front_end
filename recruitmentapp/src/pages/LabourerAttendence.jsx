import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import Pagination from "../components/Pagination";
import PanelHeader from "../components/PanelHeader";
import { config } from "../api/config.json";
import { Row, Col, Card, CardBody, CardHeader, InputGroup, FormGroup} from "reactstrap";
import ReactTooltip from "react-tooltip";
import DatePicker from "react-datepicker";
import LabourersSelector from "../components/LabourersSelector";
import {
  getJobInfoByCompany,
  postJobRatingsByCompany,
} from "../api/labourerJobApi";

const LabourerAttendence = (props) => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(1)
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState("")
  const [rowToUpdate, setRowToUpdate] = useState({})
  const [filter, setFilter] = useState({
    fromDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 14
    ),
    toDate: new Date(),
    labourerId: null,
  });

  useEffect(() => {
    let mounted = true;
    const token = props.auth.JWToken;
    const PAGE = page;
    const fromDate = "2020-04-22T00:00:00";
    const toDate = "2020-04-30T00:00:00";
    const labourerId = filter.labourerId;
    console.log("labourer : " + labourerId)
    console.log("From" + fromDate)
    console.log("From" + toDate)
    if(labourerId === null){
      var param = `count=${config.NUMBER_OF_ROWS_PER_PAGE}&page=${PAGE}`
    }else{
      var param = `count=${config.NUMBER_OF_ROWS_PER_PAGE}&page=${PAGE}&labourerId=${labourerId}&fromDate=${fromDate}&toDate=${toDate}`;
    }
    
    getJobInfoByCompany({ token, param })
      .then((response) => {
        if (mounted) {
          if (response?.data?.result) {
            setJobs(response.data.result);
            setTotalJobs(response.data.totalRows);
          } else {
            setJobs([]);
            setTotalJobs(0);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, [page, filter, props.auth.JWToken]);

  const changeRating = (item,labourerjobId, newRating) =>{
    const array = jobs;
    array[array.indexOf(item)].qualityRating = newRating;
    setJobs(array)
    const token = props.auth.JWToken;
    const param = `qualityRating=${newRating}`;

    postJobRatingsByCompany({ token, param, labourerjobId })
      .then((res) => {
        if (res.status === 200) {
         setMessage("The rating has been added" + res.statusText)
        } else {
          setMessage("Something went wrong !!")
        }
      })
      .catch(function (error) {
        setMessage("Something went wrong !!" + error.response.data.message)
      });
  }

  var today = new Date();
  var fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5 className="card-category">
                  {/* Labourer Attendence */}
                  <Row>
                    <Col md={12} lg={4}>
                      <FormGroup>
                        <label>Labourer</label>
                        <InputGroup>
                          <LabourersSelector
                            auth={props.auth}
                            // selected={this.state.labourerId || 0}
                            placeholder="Select Labourer"
                            onChange={(selected) =>
                              setFilter({
                                ...filter,
                                labourerId:
                                  selected && selected.length > 0
                                    ? selected[0].id
                                    : null,
                              })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={12} lg={4}>
                      <FormGroup>
                        <label>From date</label>
                        <InputGroup>
                          <DatePicker
                            className="form-control"
                            name="fromDate"
                            selected={filter.fromDate}
                            onChange={(selected) =>
                              setFilter({ ...filter, fromDate: selected })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={12} lg={4}>
                      <FormGroup>
                        <label>To date</label>
                        <InputGroup>
                          <DatePicker
                            className="form-control"
                            name="toDate"
                            placeholderText=" To Date"
                            selected={filter.toDate}
                            maxDate={new Date()}
                            onChange={(selected) =>
                              setFilter({ ...filter, toDate: selected })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </h5>
              </CardHeader>
              <CardBody>
              
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th scope="col">Job Title</th>
                      <th scope="col">Labourer Name</th>
                      <th scope="col">Job Skill</th>
                      <th scope="col">Labourer Phone</th>
                      <th scope="col">Date</th>
                      <th scope="col">Quality Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((item, index) => (
                        <tr key={item.id + 1}>
                        <td> {item.jobTitle} </td>
                        <td> {item.labourerFullName}</td>
                        <td> {item.skillName} </td>
                        <td> {item.labourerPhone}</td>
                         <td> {item.date.toString().slice(0, 10)}</td>
                         {new Date(item.date.toString()) < fourteenDaysAgo ||
                          new Date(item.date.toString()) > today ? (
                            <td>
                              <span data-tip="You are not allowed to rate the job after 2 weeks or before it is done">
                                <StarRatings
                                  rating={item.qualityRating || 0}
                                  starRatedColor="#2CA8FF"
                                  numberOfStars={5}
                                  starDimension="25px"
                                  starSpacing="1px"
                                />
                              </span>
                              <ReactTooltip />
                            </td>
                          ) : (
                            <td>
                              <StarRatings
                                rating={item.qualityRating || 0}
                                starRatedColor="#2CA8FF"
                                numberOfStars={5}
                                name="rating"
                                starDimension="25px"
                                starSpacing="1px"
                                changeRating = {(newRating) => changeRating(item,item.id, newRating)}
                              />
                            </td>
                          )}
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Pagination
                  itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
                  totalItem={totalJobs}
                  paginate={(page) => setPage(page)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default LabourerAttendence
// export default class LabourerAttendence extends React.Component {
//   _isMounted = false;
//   constructor(props) {
//     super(props);
//     this.state = {
//       jobs: [],
//       totalJobs: 1,
//       page: 1,
//       message: "",
//       rowToUpdate: {},
//       PassedDays: null,
//     };

//     this.paginate = this.paginate.bind(this);
//     this.fetchJobInfo = this.fetchJobInfo.bind(this);
//   }

//   componentDidMount() {
//     this._isMounted = true;
//     this.fetchJobInfo();
//   }

//   componentWillUnmount() {
//     this._isMounted = false;
//   }

//   fetchJobInfo = async () => {
//     const token = this.props.auth.JWToken;
//     const PAGE = this.state.page;
//     const param = `count=${config.NUMBER_OF_ROWS_PER_PAGE}&page=${PAGE}`;
//     await getJobInfoByCompany({ token, param })
//       .then((res) => {
//         if (this._isMounted) {
//           if (res.status === 200) {
//             this.setState({
//               jobs: res.data.result,
//               totalJobs: res.data.totalRows,
//             });
//           }
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   changeRating = (item, labourerjobId, newRating) => {
//     const array = this.state.jobs;
//     array[array.indexOf(item)].qualityRating = newRating;
//     this.setState({
//       jobs: array,
//     });
//     const token = this.props.auth.JWToken;
//     const param = `qualityRating=${newRating}`;
//     postJobRatingsByCompany({ token, param, labourerjobId })
//       .then((res) => {
//         if (res.status === 200) {
//           this.setState({
//             message: "The rating has been added",
//           });
//         } else {
//           this.setState({
//             message: `ERROR: Something went wrong! + ${res.statusText}`,
//           });
//         }
//       })
//       .catch(function (error) {
//         this.setState({
//           message: `ERROR: Something went wrong! + ${error.response.data.message}`,
//         });
//       });
//   };

//   paginate = (number) => {
//     this.setState({ page: number }, () => {
//       this.fetchJobInfo();
//     });
//   };

//   displayTableData = () => {
//     var today = new Date();
//     var fourteenDaysAgo = new Date();
//     fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

//     return this.state.jobs.map((item) => {
//       return (
//         <tr key={item.id + 1}>
//           <td> {item.jobTitle} </td>
//           <td> {item.labourerFullName}</td>
//           <td> {item.skillName} </td>
//           <td> {item.labourerPhone}</td>
//           <td> {item.date.toString().slice(0, 10)}</td>
//           {new Date(item.date.toString()) < fourteenDaysAgo ||
//           new Date(item.date.toString()) > today ? (
//             <td>
//               <span data-tip="You are not allowed to rate the job after 2 weeks or before it is done">
//                 <StarRatings
//                   rating={item.qualityRating || 0}
//                   starRatedColor="#2CA8FF"
//                   numberOfStars={5}
//                   starDimension="25px"
//                   starSpacing="1px"
//                 />
//               </span>
//               <ReactTooltip />
//             </td>
//           ) : (
//             <td>
//               <StarRatings
//                 rating={item.qualityRating || 0}
//                 starRatedColor="#2CA8FF"
//                 numberOfStars={5}
//                 name="rating"
//                 starDimension="25px"
//                 starSpacing="1px"
//                 changeRating={(newRating) =>
//                   this.changeRating(item, item.id, newRating)
//                 }
//               />
//             </td>
//           )}
//         </tr>
//       );
//     });
//   };

//   render() {
//     return (
//       <>
//         <PanelHeader size="sm" />
//         <div className="content">
//           <Row>
//             <Col>
//               <Card>
//                 <CardHeader>
//                   <h5 className="card-category">Labourer Attendence</h5>
//                 </CardHeader>
//                 <CardBody>
//                   <Table responsive>
//                     <thead className="text-primary">
//                       <tr>
//                         <th scope="col">Job Title</th>
//                         <th scope="col">Labourer Name</th>
//                         <th scope="col">Job Skill</th>
//                         <th scope="col">Labourer Phone</th>
//                         <th scope="col">Date</th>
//                         <th scope="col">Quality Rating</th>
//                       </tr>
//                     </thead>
//                     <tbody>{this.displayTableData()}</tbody>
//                   </Table>

//                   <Pagination
//                     itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
//                     totalItem={this.state.totalJobs}
//                     paginate={this.paginate}
//                   />
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </>
//     );
//   }
// }
