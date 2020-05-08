import React from "react";
import StarRatings from "react-star-ratings";
import {
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import FormErrors from "../components/FormError";
import PanelHeader from "../components/PanelHeader";
import {
  getCompanyInfo,
  postCompanyProfile,
  putCompanies,
} from "../api/CompaniesApi";

export default class CompanyProfile extends React.Component {
  _isMounted = false;
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
      isActive: true,
      rating: 0.0,
      hasProfile: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchprofileInfo();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchprofileInfo = async () => {
    const token = this.props.auth.JWToken;
    if (this.props.auth.profileId > 0) {
      await getCompanyInfo({ token, companyId: this.props.auth.profileId })
        .then((res) => {
          if (res.status === 200) {
            if (this._isMounted) {
              this.setState({
                companyname: res.data.name,
                phone: res.data.phone,
                country: res.data.country,
                province: res.data.province,
                city: res.data.city,
                address: res.data.address,
                email: res.data.email,
                rating: res.data.rating,
                isActive: res.data.active,
                hasProfile: true,
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  addCompanyProfile = async (event) => {
    event.preventDefault();
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
          console.log("Profile Successfully Updated ");
          this.setState({ hasProfile: true });
          //update profileID
          this.props.auth.setProfileId(res.data.id);
          this.props.auth.setUsername(res.data.name);
        } else {
          console.log("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch(function (error) {
        // console.log(error);
        console.log("ERROR: Something went wrong! ");
      });
  };

  updateCompanyProfile = async (event) => {
    event.preventDefault();
    const prof_id = this.props.auth.profileId;
    const token = this.props.auth.JWToken;
    const name = this.state.companyname;
    const email = this.state.email;
    const city = this.state.city;
    const province = this.state.province;
    const country = this.state.country;
    const address = this.state.address;
    const phone = this.state.phone;
    const is_active = this.state.isActive;

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
          console.log("The Profile has been updated");
          this.props.auth.setUsername(name);
        } else {
          console.log("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch((err) => {
        // console.log(err);
        console.log("ERROR: Something went wrong!");
      });
  };

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12} md={7}>
              <Card>
                <CardHeader>
                  <h5 className="card-category">
                    <FormErrors formerrors={this.state.errors} />
                  </h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Company Name</label>
                          <Input
                            type="text"
                            id="companyname"
                            placeholder="Company Name"
                            name="companyname"
                            value={this.state.companyname}
                            onChange={(e) =>
                              this.setState({ companyname: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="p1-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            type="text"
                            id="companyemail"
                            placeholder="Email"
                            name="companyemail"
                            value={this.state.email}
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="3">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            type="text"
                            id="companyphone"
                            placeholder="Phone"
                            name="companyphone"
                            value={this.state.phone}
                            onChange={(e) =>
                              this.setState({ phone: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="p1-1" md="9">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            type="text"
                            id="companyaddress"
                            placeholder="Address"
                            name="companyaddress"
                            value={this.state.address}
                            onChange={(e) =>
                              this.setState({ address: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            type="text"
                            id="companycity"
                            placeholder="City"
                            name="companycity"
                            value={this.state.city}
                            onChange={(e) =>
                              this.setState({ city: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="p1-1" md="4">
                        <FormGroup>
                          <label>Province</label>
                          <Input
                            type="text"
                            id="companyprovince"
                            placeholder="Province"
                            name="companyprovince"
                            value={this.state.province}
                            onChange={(e) =>
                              this.setState({ province: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="p1-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            type="text"
                            id="companycountry"
                            placeholder="Country"
                            name="companycountry"
                            value={this.state.country}
                            onChange={(e) =>
                              this.setState({ country: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={(event) => {
                            if (this.state.hasProfile) {
                              this.updateCompanyProfile(event);
                            } else {
                              this.addCompanyProfile(event);
                            }
                          }}
                        >
                          {this.state.hasProfile
                            ? "Update Profile"
                            : " Add Profile"}
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={5}>
              <Card className="card-user">
                <CardBody>
                  <div
                    className="author"
                    style={{ opacity: this.state.isActive ? "1" : "0.4" }}
                  >
                    {this.state.isActive ? (
                      <h5 className="title" style={{ margin: 0 }}>
                        {this.state.companyname}
                      </h5>
                    ) : (
                      <h5
                        className="title"
                        style={{ margin: 0, color: "grey" }}
                      >
                        {this.state.companyname}
                      </h5>
                    )}
                    <p className="description"></p>
                    <div className="description">
                      Average Rating
                      <StarRatings
                        rating={this.state.rating}
                        starRatedColor="#ffb236"
                        starDimension="25px"
                        starSpacing="1px"
                        numberOfStars={5}
                        name="rating"
                      />
                      <p className="description"></p>
                      <p>Email: {this.state.email}</p>
                      <p>Phone: {this.state.phone}</p>
                      <p>
                        Address: {this.state.address} {this.state.city},{" "}
                        {this.state.province}, {this.state.country}
                      </p>
                      {this.state.isActive ? (
                        <Button
                          size="sm"
                          width="10px"
                          className="btn btn-success btn-sm"
                          style={{ borderRadius: "20px" }}
                        >
                          Active
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="btn btn-secondary btn-sm"
                          style={{ borderRadius: "20px" }}
                        >
                          Inactive
                        </Button>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
