import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import { config } from "../api/config.json";
import Validation from "../components/Validation";

export default class CompanyProfile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
     companyname: " ",
     phone : "",
     Country: "",
     province: "",
     city: "",
     Address: "",
     email : "",
     isActive: false,
    
    }
   
  }

  componentDidMount () {
    this.fetchprofileInfo()
  }

  fetchprofileInfo = async () => {

    const PROF_ID = this.props.auth.profileId;
    // console.log(PROF_ID)
    const TOKEN = this.props.auth.JWToken;
    const COMPANY_URL = config.BASE_API_URL + "/companies/" + PROF_ID

  //  console.log(COMPANY_URL)
   await fetch(COMPANY_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
  })
  .then(res => res.json())
  .then(data => {
    this.setState({ 
      companyname : data.name,
      phone : data.phone,
      Country : data.Country,
      province : data.province,
      city : data.city,
      Address: data.address,
      email: data.email,
      isActive: data.isActive
    });
  }
 
  )
  .catch(error => {
    console.log(error);
  });
 
  }
  updateCompanyProfile = (event) =>{
     
    const TOKEN = this.props.auth.JWToken

    console.log("Company Profile : " + TOKEN)
    console.log("isActive :" + this.state.isActive )

    const URL = config.BASE_API_URL+"/companies"
      // "https://recruitmentsystemapi.azurewebsites.net/api/companies";
    fetch(URL, {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        name: this.state.companyname,
        email: this.state.email,
        City: this.state.city,
        province: this.state.province,
        Country: this.state.country,
        Address: this.state.address,
        Phone: this.state.phone,
        isActive: this.state.isActive 
      }),

    
    })
      .then((json) => {
        this.props.history.push("./company-jobs");
      
      })
      .catch(function (error) {
        // alert(error);
      });
    
  };

  render() {
    return (
    <Container>
          <Row>
            <Col className="p-5">
            <FormErrors formerrors={this.state.errors} />

              <form
                style={{ margin: "0 auto", width: "500px" }}
                className="text-center border border-light p-4"
                onSubmit = {this.updateCompanyProfile}
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
                  value={this.state.Address}
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
