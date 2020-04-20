import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateCompany } from "../api/CompaniesApi";

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
            isActive: this.props.company.isActive,
        });
    }


    handleIsActiveButton = () => {
        if(this.state.isActive === true){
            this.setState({ isActive: false })
         } else {
            this.setState({ isActive: true })
        }
        this.updateCompanyToAPI();
    };

    updateCompanyToAPI = async (event) => {
    const TOKEN = this.props.auth.JWToken;
    const id = this.props.company.id;
    const companyName = this.state.companyName;
    const city = this.state.city;
    const province = this.state.province;
    const country = this.state.country;
    const address = this.state.address;
    const phone = this.state.phone;
    const email = this.state.email;
    const isActive = this.state.isActive;
    await updateCompany({
        TOKEN,
        id,
        companyName,
        city,
        province,
        country,
        address,
        phone,
        email,
        isActive,
    }).then((res) => {
        if (res.status === 200) {
        this.setState({ isEditable: false });
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
                activeClassName="active"
                style={{ color: "black" }}
              >
                {this.state.companyName}
              </Link>
            </td>
            <td>
              <Link
                to={`/recruiter-companies/${this.state.id}`}
                activeClassName="active"
                style={{ color: "black" }}
              >
                {this.state.email}
              </Link>
            </td>
            <td>
              <Link
                to={`/recruiter-companies/${this.state.id}`}
                activeClassName="active"
                style={{ color: "black" }}
              >
                {this.state.phone}
              </Link>
            </td>
            <td>
              {this.props.company.isActive === true ? (
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
