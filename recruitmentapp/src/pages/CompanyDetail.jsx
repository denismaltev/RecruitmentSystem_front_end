import React from "react";
import { Table } from "react-bootstrap";
import {getCompanyInfo, getCompanyJobs } from "../api/CompaniesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings";
import Pagination from '../components/Pagination'

export default class CompanyDetail extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
         companyname: " ",
         phone : "",
         country: "",
         province: "",
         city: "",
         address: "",
         email : "",
         jobs : [],
         hasjob : false,
         page : 1,
         totalJobs : 1
        }
        this.paginate = this.paginate.bind(this);
    }

    componentDidMount () {
        this.fetchprofileInfo();
        this.fetchJobs();
      }
    
    fetchprofileInfo = async () => {

        const PROF_ID = this.props.location.state.companyID
        const TOKEN = this.props.auth.JWToken;
        
        await getCompanyInfo({ TOKEN , PROF_ID})
        .then(res => {
        if(res.status === 200){
            this.setState({ 
            companyname : res.data.name,
            phone : res.data.phone,
            country : res.data.country,
            province : res.data.province,
            city : res.data.city,
            address: res.data.address,
            email: res.data.email,
            });
        }
        
        }
    
        )
        .catch(error => {
        console.log(error);
        });
    }

    fetchJobs = async () => {

        const COMP_ID = this.props.location.state.companyID    
        const TOKEN = this.props.auth.JWToken;      
        var today = new Date();
        var fromDate = today.toISOString().split("T")[0];
        var currentDay = new Date();
        currentDay.setDate(today.getDate() - 14);
        var toDate = currentDay.toISOString().split("T")[0];

        const count = 5
        const PAGE = this.state.page
        const PARAM = `companyId=${COMP_ID}&count=${count}&page=${PAGE}`
        // const PARAM = `companyId=${COMP_ID}&count=${count}&page=${PAGE}&fromDate=${fromDate}&toDate=${toDate}`;
        await getCompanyJobs({ TOKEN ,PARAM})
        .then(res => {
        if(res.status === 200){
           console.log("Success !!")
            this.setState({ 
                jobs: res.data.result,
                totalJobs : res.data.totalRows
            });

            if(this.state.totalJobs > 0){
                this.setState({hasjob : true})
            }

            console.log("Total Jobs " + this.state.totalJobs)
        
        }
        }
    
        )
        .catch(error => {
        console.log(error);
        this.setState({ hasjob : false})
        });
    }

    paginate = (number) => {
        this.setState({ page : number },
        () => {this.fetchJobs();} )
    }

    render() {
        let itemsPerPage = 5;
        // const indexOfLastItem = this.state.page * itemsPerPage;
        // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        // let currentJobs = [];
        // let totalitem = this.state.totalJobs;
       
    
        // if (this.state.hasjob) {
        //     totalitem = this.state.jobs.length;
        //     if (totalitem> 5) {
        //         currentJobs = this.state.jobs.slice(indexOfFirstItem, indexOfLastItem);
        //        // console.log(currentItems)
        //     } else {
        //         currentJobs = this.state.jobs;
        //        // console.log(currentItems)
        //     }
        // }
        return (
           <div className="page-content">
                <h2>Details of {this.state.companyname}</h2>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <th> Company name: </th>
                        <td>  {this.state.companyname} </td>
                    </tr>

                    <tr>
                        <th> Email: </th>
                        <td> {this.state.email} </td>
                    </tr>

                    <tr>
                        <th> Phone: </th>
                    <td>  {this.state.phone} </td>
                    </tr>

                    <tr>
                        <th> Address: </th>
                        <td> {this.state.address}, {this.state.city}, {this.state.province}, 
                        {this.state.country} </td>
                    </tr>
                    
                    </tbody>
                </Table>

               {!this.state.hasjob ?  <h2> {this.state.companyname} have not posted any job yet .</h2> :
               <div className="page-content">
                   <h2> All Jobs of {this.state.companyname}</h2>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th scope="col">Job Title</th>
                        <th scope="col">Address</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {this.state.jobs.map((item) => (
                        <tr key={item.id}>
                        <td> {item.title} </td>
                        <td> {item.address} </td>
                        <td>
                            {item.startDate.toString().slice(0, 10)} 
                        </td>
                        <td> {item.endDate.toString().slice(0, 10)} </td>
                        <td>
                            <StarRatings
                            rating= {item.rating}
                            starRatedColor="blue"
                            numberOfStars={5}
                            name="rating"
                            />
                        </td>
                        <td>
                        {item.isActive ? <FontAwesomeIcon icon="check-circle" color="blue" /> : "X" }
                            
                        </td>
                        </tr>
                    ))}
                    </tbody>
                
                    </Table>
                
                    <Pagination itemsPerPage={itemsPerPage} totalItem={this.state.totalJobs} paginate={this.paginate} />
                </div>
                }
             
           </div>

        )
    }
}