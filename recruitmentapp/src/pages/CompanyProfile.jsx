import React from "react";
import StarRatings from "react-star-ratings";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import FormErrors from "../components/FormError";
import PanelHeader from "../components/PanelHeader";
import {
  getCompanyInfo,
  postCompanyProfile,
  putCompanies,
} from "../api/CompaniesApi";

export default class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyname: " ",
      phone: "",
      country: "",
      province: "",
      city: "",
      address: "",
      email: "",
      isActive: false,
      rating: 0.0,
      hasProfile: false,
    };
  }

  componentDidMount() {
    this.fetchprofileInfo();
  }

  fetchprofileInfo = async () => {
    const PROF_ID = this.props.auth.profileId;
    const token = this.props.auth.JWToken;

    await getCompanyInfo({ token, PROF_ID })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            companyname: res.data.name,
            phone: res.data.phone,
            country: res.data.country,
            province: res.data.province,
            city: res.data.city,
            address: res.data.address,
            email: res.data.email,
            rating: res.data.rating,
            hasProfile: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  AddCompanyProfile = async (event) => {
    const token = this.props.auth.JWToken;
    const name = this.state.companyname;
    const email = this.state.email;
    const city = this.state.city;
    const province = this.state.province;
    const country = this.state.country;
    const address = this.state.address;
    const phone = this.state.phone;
    const is_active = true;

    await postCompanyProfile({
      token,
      name,
      email,
      city,
      province,
      country,
      address,
      phone,
      is_active,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Profile Successfully Updated ");
          this.setState({ hasProfile: true });
          //update profileID
          this.props.auth.setProfileId(res.data.id);
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch(function (error) {
        // console.log(error);
        alert("ERROR: Something went wrong! ");
      });
  };

  updateCompanyProfile = async (event) => {
    const prof_id = this.props.auth.profileId;
    const token = this.props.auth.JWToken;
    const name = this.state.companyname;
    const email = this.state.email;
    const city = this.state.city;
    const province = this.state.province;
    const country = this.state.country;
    const address = this.state.address;
    const phone = this.state.phone;
    const is_active = true;

    await putCompanies({
      token,
      prof_id,
      name,
      email,
      city,
      province,
      country,
      address,
      phone,
      is_active,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("The Profile has been updated");
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch((err) => {
        // console.log(err);
        alert("ERROR: Something went wrong!");
      });
  };

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <h5 className="card-category">
                    <FormErrors formerrors={this.state.errors} />
                  </h5>
                </CardHeader>
                <CardBody>
                  <div
                    style={{ margin: "0 auto", width: "500px" }}
                    className="text-center border border-light p-4"
                  >
                    <label htmlFor="companyname" className="font-weight-bold">
                      Company Name{" "}
                    </label>

                    <input
                      type="text"
                      id="companyname"
                      className="form-control mb-4"
                      value={this.state.companyname}
                      placeholder="Company Name"
                      onChange={(e) =>
                        this.setState({ companyname: e.target.value })
                      }
                    />

                    <label htmlFor="email" className="font-weight-bold">
                      Email{" "}
                    </label>

                    <input
                      type="text"
                      id="email"
                      className="form-control mb-4"
                      value={this.state.email}
                      placeholder="Email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />

                    <label htmlFor="phone" className="font-weight-bold">
                      Phone{" "}
                    </label>

                    <input
                      type="text"
                      id="phone"
                      className="form-control mb-4"
                      placeholder="Contact No."
                      value={this.state.phone}
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />

                    <label htmlFor="country" className="font-weight-bold">
                      Country{" "}
                    </label>

                    <input
                      type="text"
                      id="country"
                      className="form-control mb-4"
                      placeholder="Country"
                      value={this.state.country}
                      onChange={(e) =>
                        this.setState({ country: e.target.value })
                      }
                    />

                    <label htmlFor="province" className="font-weight-bold">
                      Province
                    </label>

                    <input
                      type="text"
                      id="province"
                      className="form-control mb-4"
                      placeholder="province"
                      value={this.state.province}
                      onChange={(e) =>
                        this.setState({ province: e.target.value })
                      }
                    />

                    <label htmlFor="city" className="font-weight-bold">
                      City{" "}
                    </label>

                    <input
                      type="text"
                      id="city"
                      className="form-control mb-4"
                      placeholder="City"
                      value={this.state.city}
                      onChange={(e) => this.setState({ city: e.target.value })}
                    />

                    <label htmlFor="address" className="font-weight-bold">
                      Address{" "}
                    </label>

                    <input
                      type="text"
                      id="address"
                      className="form-control mb-4"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                    />

                    <label htmlFor="rating" className="font-weight-bold">
                      Quality Rating{" "}
                    </label>
                    <div className="lab-profile-item">
                      <StarRatings
                        id="rating"
                        rating={this.state.rating || 0}
                        starRatedColor="blue"
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-block my-4"
                      type="submit"
                      onClick={async () => {
                        if (this.state.hasProfile) {
                          this.updateCompanyProfile();
                        } else {
                          this.AddCompanyProfile();
                        }
                      }}
                    >
                      {this.state.hasProfile
                        ? "Update Profile"
                        : " Add Profile"}
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                      <CardHeader>{this.state.companyname}</CardHeader>
                <CardBody>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
