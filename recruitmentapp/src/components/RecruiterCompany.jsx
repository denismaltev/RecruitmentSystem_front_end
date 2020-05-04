import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      isActive: this.props.company.isActive
    });
  }

  render() {
    return (
      <>
        <td>
          <Link
            to={`/company-detail/${this.state.id}`}
            // onClick={() =>

            //  }
            style={{ color: "black" }}
          >
            {/* <Link to={{
              pathname: `/company-detail/${this.state.id}`,
              style : {color:black},
              state: { 
                companyID : this.state.id
              }
            }}> */}
            {this.state.companyName}
          </Link>
        </td>
        <td>
          <Link
            to={`/company-detail/${this.state.id}`}
            style={{ color: "black" }}
          >
            {this.state.email}
          </Link>
        </td>
        <td>
          <Link
            to={`/company-detail/${this.state.id}`}
            style={{ color: "black" }}
          >
            {this.state.phone}
          </Link>
        </td>
      </>
    );
  }
}
