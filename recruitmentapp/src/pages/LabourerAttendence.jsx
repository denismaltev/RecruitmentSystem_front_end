import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import Pagination from '../components/Pagination'
import {getJobInfoByCompany} from "../api/CompaniesApi";


export default class LabourerAttendence extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
         jobTitle: " ",
         jobSkill : "",
         jobs : [],
         firstName: "",
         lastName: "",
         qRating: ""
        }

        this.paginate = this.paginate.bind(this);
      
    }

    componentDidMount () {
        this.fetchJobInfo();
      //  this.fetchJobs();
      }

    fetchJobInfo = async () => {
        const TOKEN = this.props.auth.JWToken;
        
        await getJobInfoByCompany({ TOKEN })
        .then(res => {
        if(res.status === 200){
            this.setState({ 
                jobs: res.data
           });
           console.log ("Success !!")
        }
       
        }
    
        )
        .catch(error => {
        console.log(error);
        });
    }

    paginate = (number) => {
        this.setState({ page : number },
        () => {this.fetchJobs();} )
    }

    render() {
        return (
            <div>
                 <h1> Labourer Attendence By Company </h1>
                 <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th scope="col">Job Title</th>
                        <th scope="col">Job Skill</th>
                        <th scope="col">Labourer Name</th>
                        <th scope="col">Quality Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {this.state.jobs.map((item) => (
                        <tr key={item.id}>
                            <td> {item.title} </td>
                            <td> {item.jobSkills} </td>
                            <td> John Doe </td>
                           
                            <td>
                                <StarRatings
                                rating= {item.rating}
                                starRatedColor="blue"
                                numberOfStars={5}
                                name="rating"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                
                    </Table>
                
                <Pagination  paginate={this.paginate} />
            </div>
        )
        
       
      }

}