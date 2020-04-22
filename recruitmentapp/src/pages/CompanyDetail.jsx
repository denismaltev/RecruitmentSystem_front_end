import React from "react";
import { Table } from "react-bootstrap";
import {getCompanyInfo } from "../api/CompaniesApi";

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
         email : ""
        }
    }

    componentDidMount () {
        this.fetchprofileInfo()
      }
    
    fetchprofileInfo = async () => {

        // const PROF_ID = this.props.auth.profileId;
        const PROF_ID = 1;
        // console.log(PROF_ID)
        const TOKEN = this.props.auth.JWToken;
        console.log(TOKEN)
        
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

        console.log("Company Name :" + this.props)
        }
    
        )
        .catch(error => {
        console.log(error);
        });
    }

    render() {
        return (
           <div>
                {/* <h1>Company details</h1> */}
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <th> Company name : </th>
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
                        <td> {this.state.address}, {this.state.city}, {this.state.province}
                        {this.state.country} </td>
                    </tr>
                    
                    </tbody>
                </Table>
           </div>

        )
    }
}