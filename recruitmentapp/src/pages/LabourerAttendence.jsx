import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import Pagination from '../components/Pagination'
import {getJobInfoByCompany, postJobRatingsByCompany} from "../api/labourerJobApi";


export default class LabourerAttendence extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
         jobs : [],
         totalJobs : 1,
         page : 1,
         message: "",
         rowToUpdate: {},
        }

        this.paginate = this.paginate.bind(this);
        this.fetchJobInfo = this.fetchJobInfo.bind(this);
    }

    componentDidMount () {
        this.fetchJobInfo();
      }

      // componentDidUpdate() {
      //   setTimeout(() => this.setState({ message: "" }), 7000);
      // }

    fetchJobInfo = async () => {
        const TOKEN = this.props.auth.JWToken;
        
        await getJobInfoByCompany({ TOKEN })
        .then(res => {
        if(res.status === 200){
            this.setState({ 
                jobs: res.data.result,
                totalJobs : res.data.totalRows
           });
           //console.log ("Success !!" + this.state.totalJobs)
        }
       
        }
    
        )
        .catch(error => {
        console.log(error);
        });
    }

    changeRating = (item, labourerjobId, newRating) => {
        const array = this.state.jobs;
        array[array.indexOf(item)].qualityRating = newRating;
        console.log("ID : "+ labourerjobId + " Item id :" + item )
        this.setState({
          jobs: array,
        });
        const token = this.props.auth.JWToken;
        const param = `qualityRating=${newRating}`;
        postJobRatingsByCompany({ token, param , labourerjobId})
          .then((res) => {
            if (res.status === 200) {
            console.log("Success !!")
              this.setState({
                message: "The rating has been added",
              });
            } else {
              this.setState({
                message: `ERROR: Something went wrong! + ${res.statusText}`,
              });
            }
          })
          .catch(function (error) {
            this.setState({
              message: `ERROR: Something went wrong! + ${error.response.data.message}`,
            });
          });
      };
    

    paginate = (number) => {
        this.setState({ page : number },
        () => {this.fetchJobsInfo();} )
    }

    displayTableData = () => {
        return this.state.jobs.map((item) => {
          return (
            <tr key={item.id + 1}>
            <td> {item.jobTitle } </td>
            <td> {item.skillName } </td>
            <td> {item.labourerFullName }</td>
            <td> {item.labourerPhone }</td>
              {item.qualityRating ? (
                <td>
                  <StarRatings
                    rating={item.qualityRating}
                    starRatedColor="blue"
                    numberOfStars={5}
                  />
                </td>
              ) : (
                <td>
                  <StarRatings
                    rating={item.qualityRating || 0}
                    starRatedColor="blue"
                    numberOfStars={5}
                    name="rating"
                    changeRating={(newRating) => this.changeRating(item, item.id, newRating)}
                  />
                </td>
              )}
            </tr>
          );
        });
      };

    render() {
        let itemsPerPage = 20;
        return (
            <div className="page-content">
                 <h1> Labourer Attendence By Company </h1>
                 <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th scope="col">Job Title</th>
                        <th scope="col">Job Skill</th>
                        <th scope="col">Labourer Name</th>
                        <th scope="col">Labourer Phone</th>
                        <th scope="col">Quality Rating</th>
                        </tr>
                    </thead>
                      <tbody>{this.displayTableData()}</tbody>
                
                    </Table>
                
                    <Pagination itemsPerPage={itemsPerPage} totalItem={this.state.totalJobs} paginate={this.paginate} />
            </div>
        )
        
       
      }

}