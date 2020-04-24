import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { putCompanies } from "../api/CompaniesApi";

export default class RecruiterCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      companyName: "",
      city: "",
      province: "",
      country: "",
      address: "",
      phone: "",
      email: "",
      isActive: false,
      errorMessage: ""
    };
  }

    handleIsActiveButton = () => {
    
        if(this.state.isActive === true){
            this.setState({ isActive: false }, () => {this.updateCompanyToAPI()})
         } else {
            this.setState({ isActive: true }, () => {
              this.updateCompanyToAPI();
            });
        }
        console.log(this.state.isActive)
        // this.updateCompanyToAPI();
    };

  componentDidMount() {
    this.setState({
      id: this.props.company.id,
      companyName: this.props.company.name,
      city: this.props.company.city,
      province: this.props.company.province,
      country: this.props.company.country,
      address: this.props.company.address,
      phone: this.props.company.phone,
      email: this.props.company.email,
      isActive: this.props.company.isActive
    });
  }

  updateCompanyToAPI = event => {
    const TOKEN = this.props.auth.JWToken;
    const PROF_ID = this.props.company.id;
    const NAME = this.state.companyName;
    const CITY = this.state.city;
    const PROVINCE = this.state.province;
    const COUNTRY = this.state.country;
    const ADDRESS = this.state.address;
    const PHONE = this.state.phone;
    const EMAIL = this.state.email;
    const IS_ACTIVE = this.state.isActive;
     putCompanies({
      TOKEN,
      PROF_ID,
      NAME,
      CITY,
      PROVINCE,
      COUNTRY,
      ADDRESS,
      PHONE,
      EMAIL,
      IS_ACTIVE
    }).then(res => {
      if (res.status === 200) {
        this.setState({ isEditable: false });
        console.log(this.state.isActive)
      } else {
        this.setState({ isEditable: false });
        // alert(
        //     "Error: Something went wrong, please try again" +
        //     res.statusText
        // );
      }
    });
  };

    render() {
        return (
          <>
            <td>
              <Link
                to={`/recruiter-companies/${this.state.id}`}
                style={{ color: "black" }}
              >
                {this.state.companyName}
              </Link>
            </td>
            <td>
              <Link
                to={`/recruiter-companies/${this.state.id}`}
                style={{ color: "black" }}
              >
                {this.state.email}
              </Link>
            </td>
            <td>
              <Link
                to={`/recruiter-companies/${this.state.id}`}
                style={{ color: "black" }}
              >
                {this.state.phone}
              </Link>
            </td>
            <td>
              {this.state.isActive === true ? (
                <button
                  className="isActiveCheckboxButton-true"
                  onClick={this.handleIsActiveButton}
                >
                  <FontAwesomeIcon icon="check-circle" color="blue" />
                </button>
              ) : (
                <button
                  className="isActiveCheckboxButton-false"
                  onClick={this.handleIsActiveButton}
                >
                  X
                </button>
              )}
            </td>
          </>
        );
    }
}
