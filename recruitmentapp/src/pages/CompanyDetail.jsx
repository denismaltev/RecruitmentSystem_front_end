import React from "react";
import { Table } from "react-bootstrap";
import {getCompanyInfo, getCompanyJobs } from "../api/CompaniesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings";
import ReactPaginate from 'react-paginate';


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
         hasjob : false
        }
    }

    componentDidMount () {
        this.fetchprofileInfo();
        this.fetchJobs();
      }
    
    fetchprofileInfo = async () => {

        const PROF_ID = this.props.location.state.companyID
        // console.log("company ID" + this.props.location.state.companyID)
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
        // console.log("company ID" + this.props.location.state.companyID)
        const TOKEN = this.props.auth.JWToken;
        // const fromDate = "2020-04-21T00:00:00"
        var today = new Date();
        var fromDate = today.toISOString().split("T")[0];
        var currentDay = new Date();
        currentDay.setDate(today.getDate() + 14);
        var toDate = currentDay.toISOString().split("T")[0];
        // const toDate = "2020-04-27T00:00:00"
        const count = 20
        const page = 1

        const PARAM = `companyId=${COMP_ID}&count=${count}&page=${page}&fromDate=${fromDate}&toDate=${toDate}`;
        
        await getCompanyJobs({ TOKEN ,PARAM})
        .then(res => {
        if(res.status === 200){
           
            this.setState({ 
                jobs: res.data,
            });

            if(this.state.jobs.length > 0){
                this.setState({hasjob : true})
            }
           
        }
        }
    
        )
        .catch(error => {
        console.log(error);
        this.setState({ hasjob : false})
        });
    }

    render() {
        return (
           <div>
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
               <div>
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
                        <td> {item.startDate} </td>
                        <td> {item.endDate} </td>
                        <td>
                            <StarRatings
                            rating= {item.rating}
                            starRatedColor="blue"
                            numberOfStars={5}
                            name="rating"
                            />
                        </td>
                        <td>
                        {item.isActive ? <FontAwesomeIcon icon="check-circle" color="blue" /> : <FontAwesomeIcon icon="fal fa-times-square" color="blue" /> }
                            
                        </td>
                        </tr>
                    ))}

                    </tbody>
                
                    </Table>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
    }
             
           </div>

        )
    }
}