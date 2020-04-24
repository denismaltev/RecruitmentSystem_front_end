import React from "react";
import StarRatings from "react-star-ratings";
import {
  addProfile,
  showProfile,
  editProfile,
  showSkills,
} from "../api/LabourerApi";
import SkillsSelector from "../components/SkillsSelector";
import Weekdays from "../components/Weekdays";
import FormErrors from "../components/FormError";
import ValidationLabourer from "../components/ValidationLabourer";

const weekDay = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export default class LabourerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileIsActive: false,
      firstName: "",
      lastName: "",
      city: "",
      province: "",
      email: "",
      personalId: "",
      country: "",
      address: "",
      phone: "",
      skillsUpdated: false,
      safetyRating: 0,
      qualityRating: 0,
      currentAvailability: [],
      errors: {
        blankfield: false,
      },
      // newSkill: [],
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
      newArray: [],
    };
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
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
    var dayArray = Object.values(this.state.availability);
    var array = [];
    for (var i = 0; i < 7; i++) {
      if (dayArray[i] === true) {
        array.push(weekDay[i]);
      }
    }
    this.setState({ currentAvailability: array });
  };

  updateSkills = (selected) => {
    this.setState({
      skills: selected,
      skillsUpdated: true,
    });
  };

  createProfile = async (event) => {
    event.preventDefault();
    const TOKEN = this.props.auth.JWToken;
    var labourer = this.buildLabourerObjectWithoutId();
    this.clearErrors();
    const error = ValidationLabourer(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    } else {
      await addProfile({ TOKEN, labourer })
        .then((res) => {
          if (res.status === 200) {
            alert("Profile Successfully Updated ");
            this.setState({ profileIsActive: true });
            console.log(res.data.id);
            this.props.auth.setProfileId(res.data.id);
          } else {
            alert("ERROR: Something went wrong! " + res.statusText);
          }
        })
        .catch(function (error) {
          alert("Something went wrong! " + error.response.data.message);
        });
    }
  };

  updateProfile = async (event) => {
    event.preventDefault();
    const TOKEN = this.props.auth.JWToken;
    const labourer = this.buildLabourerObjectWithId();
    const id = this.props.auth.profileId;
    console.log(labourer);
    this.clearErrors();
    const error = ValidationLabourer(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    } else {
      await editProfile({ TOKEN, labourer, id })
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
    }
  };

  showProfileInfo = async () => {
    const id = this.props.auth.profileId;
    if (id > 0) {
      const TOKEN = this.props.auth.JWToken;
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
              skills: response.data.skills,
              newArray: [
                response.data.monday,
                response.data.tuesday,
                response.data.wednesday,
                response.data.thursday,
                response.data.friday,
                response.data.saturday,
                response.data.sunday,
              ],
            });
          }
          var d = this.state.newArray;
          var array = [];
          for (var i = 0; i < 7; i++) {
            if (d[i] === true) {
              array.push(weekDay[i]);
            }
          }
          this.setState({ currentAvailability: array });
        })
        .catch(function (error) {
          alert("Something went wrong! " + error.response.data.message);
        });
    }
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
      skills: this.state.skills,
      sunday: this.state.availability.sunday,
      monday: this.state.availability.monday,
      tuesday: this.state.availability.tuesday,
      wednesday: this.state.availability.wednesday,
      thursday: this.state.availability.thursday,
      friday: this.state.availability.friday,
      saturday: this.state.availability.saturday,
    };
    return labourer;
  };

  buildLabourerObjectWithId = () => {
    if (this.state.skillsUpdated) {
      var newKey = "isActive";
      var newVal = true;
      this.state.skills[newKey] = newVal;
      console.log(this.state.skills);
    }
    console.log(this.state.skillsUpdated);
    console.log(this.state.skills);
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
      skills: this.state.skills,
      sunday: this.state.availability.sunday,
      monday: this.state.availability.monday,
      tuesday: this.state.availability.tuesday,
      wednesday: this.state.availability.wednesday,
      thursday: this.state.availability.thursday,
      friday: this.state.availability.friday,
      saturday: this.state.availability.saturday,
    };
    return labourer;
  };

  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
        matchedpassword: false,
      },
    });
  };

  render() {
    return (
      <div className="lab-profile">
        <div className="lab-profile-col">
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
            <SkillsSelector
              auth={this.props.auth}
              selected={this.state.skills}
              onChange={this.updateSkills}
              placeholder="Choose your skills"
            />
            <ul className="lab-profile-list">
              {this.state.skills.map((item) => (
                <li>{item.isActive === true ? item.name : ""}</li>
              ))}
            </ul>
          </div>
          <div className="lab-profile-item">
            <h4>Availability</h4>
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
            <ul className="lab-profile-list">
              {this.state.currentAvailability.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lab-profile-col">
          <FormErrors formerrors={this.state.errors} />
          <form
            className="text-center border border-light p-5"
            onSubmit={
              this.state.profileIsActive
                ? this.updateProfile
                : this.createProfile
            }
          >
            <div>
              <label>First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control mb-4"
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
                className="form-control mb-4"
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
                className="form-control mb-4"
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
                className="form-control  mb-4"
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
                className="form-control  mb-4"
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
                className="form-control  mb-4"
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
                className="form-control  mb-4"
                value={this.state.country}
                name="Country"
                onChange={this.onInputChange}
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="text"
                pattern="[0-9]*"
                id="phone"
                className="form-control  mb-4"
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
                className="form-control  mb-4"
                value={this.state.address}
                name="Address"
                onChange={this.onInputChange}
              />
            </div>
            <div>
              <button className="btn btn-primary btn-block my-4" type="submit">
                {this.state.profileIsActive ? "Update" : " Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
