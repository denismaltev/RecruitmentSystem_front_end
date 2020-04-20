import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import { config } from "../api/config.json";
import {getCompanyInfo, postCompanyProfile,putCompanies } from "../api/CompaniesApi";

export default class CompanyProfile extends React.Component {

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
     isActive: false,
    }
  }

  componentDidMount () {
    this.fetchprofileInfo()
  }

  fetchprofileInfo = async () => {

      const PROF_ID = this.props.auth.profileId;
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
            isActive: res.data.isActive
          });
        }
      }
 
      )
      .catch(error => {
        console.log(error);
      });
  }


  AddCompanyProfile = async event =>{
     
    const TOKEN = this.props.auth.JWToken;
    const NAME = this.state.companyname;
    const EMAIL = this.state.email;
    const CITY = this.state.city;
    const PROVINCE = this.state.province;
    const COUNTRY = this.state.country;
    const ADDRESS = this.state.address;
    const PHONE = this.state.phone;
    const IS_ACTIVE = this.state.isActive;

    await postCompanyProfile({ 
      TOKEN,
      NAME,
      EMAIL,
      CITY,
      PROVINCE,
      COUNTRY,
      ADDRESS,
      PHONE,
      IS_ACTIVE
     })
      .then(res => {
        if (res.status === 200) {
          alert("Profile Successfully Updated ");
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("ERROR: Something went wrong! ");
      });
    
  };

  updateCompanyProfile = async event =>{

    const PROF_ID = this.props.auth.profileId;
    const TOKEN = this.props.auth.JWToken;
    const NAME = this.state.companyname;
    const EMAIL = this.state.email;
    const CITY = this.state.city;
    const PROVINCE = this.state.province;
    const COUNTRY = this.state.country;
    const ADDRESS = this.state.address;
    const PHONE = this.state.phone;
    const IS_ACTIVE = this.state.isActive;

    await putCompanies({
      TOKEN,
      PROF_ID,
      NAME,
      EMAIL,
      CITY,
      PROVINCE,
      COUNTRY,
      ADDRESS,
      PHONE,
      IS_ACTIVE
    })
      .then(res => {
        if (res.status === 200) {
          alert("The Profile has been updated");
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch(err => {
        console.log(err);
        alert("ERROR: Something went wrong!");
      });
    
  }

  render() {
    return (
    <Container>
          <Row>
            <Col className="p-5">
            <FormErrors formerrors={this.state.errors} />

              <form
                style={{ margin: "0 auto", width: "500px" }}
                className="text-center border border-light p-4"
                // onSubmit = {this.updateCompanyProfile}
              >
                <p className="h1 mb-4">Company Profile</p>

                <label htmlFor='companyname' className='font-weight-bold'>Company Name </label>

                <input
                  type="text"
                  id="companyname"                  
                  className="form-control mb-4"        
                  value={this.state.companyname}
                  placeholder="Company Name"
                  onChange={e => this.setState({ companyname: e.target.value })}
                />

              <label htmlFor='email' className='font-weight-bold'>Email </label>

              <input
                type="text"
                id="email"                  
                className="form-control mb-4"        
                value={this.state.email}
                placeholder="Email"
                onChange={e => this.setState({ email: e.target.value })}
              />

                <label htmlFor='phone' className='font-weight-bold'>Phone </label>

                <input
                  type="text"
                  id="phone"                  
                  className="form-control mb-4"
                  placeholder="Contact No."
                  value={this.state.phone}
                  onChange={e => this.setState({ phone: e.target.value })}
                />

                
                <label htmlFor='country' className='font-weight-bold'>Country </label>

                <input
                  type="text"
                  id="country"                  
                  className="form-control mb-4"
                  placeholder="Country"
                  value={this.state.country}
                  onChange={e => this.setState({ country: e.target.value })}
                />

                <label htmlFor='province' className='font-weight-bold'>Province</label>

                <input
                  type="text"
                  id="province"                  
                  className="form-control mb-4"
                  placeholder="province"
                  value={this.state.province}
                  onChange={e => this.setState({ province: e.target.value })}
                />

                <label htmlFor='city' className='font-weight-bold'>City </label>

                <input
                  type="text"
                  id="city"                  
                  className="form-control mb-4"
                  placeholder="City"
                  value={this.state.city}
                  onChange={e => this.setState({ city: e.target.value })}
                />

                <label htmlFor='address' className='font-weight-bold'>Address </label>

                <input
                  type="text"
                  id="address"                  
                  className="form-control mb-4"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value })}
                />

                <label htmlFor='isactive' className='font-weight-bold'> Currently Active : </label> &nbsp;
              
                <input
                    name="isActive"
                    type="checkbox"
                    id="isactive"
                    checked={this.state.isActive}
                    onChange={e => this.setState({ isActive: true })}
                />

                <button
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                  onClick = {this.AddCompanyProfile}
                >
                 Add Profile
                </button>

                <button
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                  onClick = {this.updateCompanyProfile}
                >
                 Update Profile
                </button>
                          
              </form>
            </Col>
          </Row>
        </Container>
    )
  }
}
