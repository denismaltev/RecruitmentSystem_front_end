import React from "react";
import { Table } from "react-bootstrap";
import {getCompanyInfo } from "../api/CompaniesApi";
import Job from "../components/Job";

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
         jobs : []
        }
    }

    componentDidMount () {
        this.fetchprofileInfo()
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
                    {/* {typeof this.state.companies !== "undefined" &&
                    this.state.companies.map((company) => (
                        <tr key={company.id}>
                        <Job {...this.props} company={company} />
                        </tr>
                    ))} */}

                    <Job />
                </tbody>
                </Table>

           </div>

        )
    }
}