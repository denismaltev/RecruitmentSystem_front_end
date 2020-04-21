import React from "react";
import StarRatings from "react-star-ratings";
import MultiSelect from "react-multi-select-component";
import { addProfile } from "../api/LabourerApi";
import { showProfile } from "../api/LabourerApi";
import { editProfile } from "../api/LabourerApi";
import Select from "react-dropdown-select";
import Weekdays from "../components/Weekdays";

export default class LabourerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileIsActive: "",
      firstName: "",
      lastName: "",
      city: "",
      province: "",
      email: "",
      personalId: "",
      country: "",
      address: "",
      phone: "",
      safetyRating: 0,
      qualityRating: 0,
      newAvailability: [],
      newSkill: [],
      skills: [],
      availability: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      skillOptions: [
        { label: "Painting", value: "painting" },
        { label: "Welder", value: "welder" },
        { label: "Electrician", value: "electrician" },
        { label: "Carpentry", value: "carpentry" },
      ],
    };
  }

  componentDidMount() {
    console.log(this.props.auth.profileId);
    this.showProfileInfo();
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onDayCheck = (day) => {
    this.state.availability[day] = !this.state.availability[day];
    this.setState({ availability: this.state.availability });
  };

  updateSkills = async (option) => {
    this.setState({
      newSkill: option,
    });
    var d = [];
    for (var i = 0; i < option.length; i++) {
      d.push(option[i].label);
    }
    this.setState({
      skills: d,
    });
    console.log(this.state.skills);
  };

  createProfile = (event) => {
    const TOKEN = this.props.auth.JWToken;
    var labourer = this.buildLabourerObjectWithoutId();
    console.log(JSON.stringify(labourer));
    addProfile({ TOKEN, labourer })
      .then((response) => {
        const json = response.data;
        console.log(json);
        console.log(json["id"]);
        this.props.auth.setProfileId(json["id"]);
      })
      .catch(function (error) {
        alert("Something went wrong! " + error.response.data.message);
      });
    this.showProfileInfo();
  };

  updateProfile = (event) => {
    const TOKEN = this.props.auth.JWToken;
    const labourer = this.buildLabourerObjectWithId();
    const id = this.props.auth.profileId;
    console.log(id);
    const JsonLabourer = JSON.stringify(labourer);
    console.log(JsonLabourer);
    editProfile({ TOKEN, JsonLabourer, id })
      .then((res) => {
        if (res.status === 200) {
          alert("The Profile has been updated");
        } else {
          alert("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch(function (error) {
        alert("Something went wrong! " + error.response.data.message);
      });
  };
  showProfileInfo = async () => {
    const id = this.props.auth.profileId;
    console.log(id);
    const TOKEN = this.props.auth.JWToken;
    console.log(TOKEN);
    console.log(TOKEN);
    await showProfile({ TOKEN, id })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            city: response.data.city,
            province: response.data.province,
            personalId: response.data.personalId,
            country: response.data.country,
            address: response.data.address,
            phone: response.data.phone,
            isActive: true,
            profileIsActive: true,
          });
        }
      })
      .catch(function (error) {
        alert("Something went wrong! " + error.response.data.message);
      });
  };

  buildLabourerObjectWithoutId = () => {
    var labourer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      city: this.state.city,
      province: this.state.province,
      personalId: this.state.personalId,
      country: this.state.country,
      address: this.state.address,
      phone: this.state.phone,
      isActive: true,
      // skills: this.state.skills,
      // sunday: this.state.availability.sunday,
      // monday: this.state.availability.monday,
      // tuesday: this.state.availability.tuesday,
      // wednesday: this.state.availability.wednesday,
      // thursday: this.state.availability.thursday,
      // friday: this.state.availability.friday,
      // saturday: this.state.availability.saturday,
    };
    return labourer;
  };

  buildLabourerObjectWithId = () => {
    var labourer = {
      id: this.props.auth.profileId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      city: this.state.city,
      province: this.state.province,
      personalId: this.state.personalId,
      country: this.state.country,
      address: this.state.address,
      phone: this.state.phone,
      isActive: true,
      // skills: this.state.skills,
      // sunday: this.state.availability.sunday,
      // monday: this.state.availability.monday,
      // tuesday: this.state.availability.tuesday,
      // wednesday: this.state.availability.wednesday,
      // thursday: this.state.availability.thursday,
      // friday: this.state.availability.friday,
      // saturday: this.state.availability.saturday,
    };
    return labourer;
  };

  render() {
    return (
      <div>
        <h1> Labourer Profile</h1>
        <div className="lab-profile">
          <div>
            <div className="lab-profile-item">
              <h4>Safety Rating</h4>
              <StarRatings
                rating={this.state.safetyRating}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="lab-profile-item">
              <h4>Quality Rating</h4>
              <StarRatings
                rating={this.state.qualityRating}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="lab-profile-item">
              <h4>Skills</h4>
              <Select
                value={this.state.newSkill}
                options={this.state.skillOptions}
                onChange={this.updateSkills}
                multi
              />
            </div>
            <div className="lab-profile-item">
              <h4>my Skills</h4>
              <ul className="lab-profile-list">
                {this.state.skills.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
            <Weekdays
              days={{
                mon: this.state.availability.monday,
                tue: this.state.availability.tuesday,
                wed: this.state.availability.wednesday,
                thu: this.state.availability.thursday,
                fri: this.state.availability.friday,
                sat: this.state.availability.saturday,
                sun: this.state.availability.sunday,
              }}
              onDayCheck={(day) => this.onDayCheck(day)}
            />
          </div>

          <div>
            <form>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  value={this.state.firstName}
                  name="FirstName"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  value={this.state.lastName}
                  name="FirstName"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={this.state.email}
                  name="email"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>personal Id</label>
                <input
                  type="text"
                  id="personalId"
                  className="form-control"
                  value={this.state.personalId}
                  name="PersonalId"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  value={this.state.city}
                  name="City"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Province</label>
                <input
                  type="text"
                  id="province"
                  className="form-control"
                  value={this.state.province}
                  name="Province"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Country</label>
                <input
                  type="text"
                  id="country"
                  className="form-control"
                  value={this.state.country}
                  name="Country"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  value={this.state.phone}
                  name="Phone"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={this.state.address}
                  name="Address"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                  onClick={async () => {
                    if (this.state.profileIsActive) {
                      this.updateProfile();
                    } else {
                      this.createProfile();
                    }
                  }}
                >
                  {this.state.profileIsActive ? "Update" : " Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
