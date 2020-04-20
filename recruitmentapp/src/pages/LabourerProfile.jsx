import React from "react";
import StarRatings from "react-star-ratings";
import MultiSelect from "react-multi-select-component";
import { createProfile } from "../api/LabourerApi";
import { getLabourerInfo } from "../api/LabourerApi";
import { updateProile } from "../api/LabourerApi";
import Select from "react-dropdown-select";
import Weekdays from "../components/Weekdays";

export default class LabourerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      city: "",
      province: "",
      email: "",
      personalId: "",
      country: "",
      address: "",
      phone: "",
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
      newAvailability: [],
      availability: [],
      newSkill: [],
      skills: [],
      skillOptions: [
        { label: "Painting", value: "painting" },
        { label: "Welder", value: "welder" },
        { label: "Electrician", value: "electrician" },
        { label: "Carpentry", value: "carpentry" },
      ],
    };
  }

  componentDidMount() {
    console.log(this.state.skills);
    // console.log(this.props.auth.profileId);
    // this.showProfileInfo();
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  updateAvailability = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
    console.log(this.state.Monday);
    console.log(this.state.Tuesday);
    console.log(this.state.Wednesday);
    console.log(this.state.Thursday);
    console.log(this.state.Friday);
    console.log(this.state.Saturday);
    console.log(this.state.Sunday);
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

  initialCreate = (event) => {
    const TOKEN = this.props.auth.JWToken;
    var labourer = this.buildLabourerObject();
    console.log(JSON.stringify(labourer));
    // Data retrieved.
    // createProfile({ TOKEN, labourer })
    //   .then((response) => {
    //     const json = response.data;
    //     console.log(json);
    //     console.log(json["id"]);
    //     this.setState({ labourer: json });
    //     this.props.auth.setProfileId(json["id"]);
    //   })
    //   // Data not retrieved.
    //   .catch(function (error) {
    //     alert("Something went wrong! " + error.response.data.message);
    //   });
    // this.showProfileInfo();
  };

  showProfileInfo = async () => {
    const id = this.props.auth.profileId;
    console.log(id);
    const TOKEN = this.props.auth.JWToken;
    console.log(TOKEN);
    await getLabourerInfo({ TOKEN, id })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ labourer: data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  buildLabourerObject = () => {
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
      Sunday: this.state.Sunday,
      Monday: this.state.Monday,
      Tuesday: this.state.Tuesday,
      Wednesday: this.state.Wednesday,
      Thursday: this.state.Thursday,
      Friday: this.state.Friday,
      Saturday: this.state.Saturday,
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
                rating={this.state.SafetyRating}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="lab-profile-item">
              <h4>Quality Rating</h4>
              <StarRatings
                rating={this.state.QualityRating}
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
            <div className="lab-profile-item">
              <h4>Availabilty</h4>
              <div>
                <input
                  type="checkbox"
                  name="Monday"
                  checked={this.state.Monday}
                  onChange={this.updateAvailability}
                />
                <label>Monday</label>
                <br />
                <input
                  type="checkbox"
                  name="Tuesday"
                  checked={this.state.Tuesday}
                  onChange={this.updateAvailability}
                />
                <label>Tuesday</label>
                <br />
                <input
                  type="checkbox"
                  name="Wednesday"
                  checked={this.state.Wednesday}
                  onChange={this.updateAvailability}
                />
                <label>Wednesday</label>
                <br />
                <input
                  type="checkbox"
                  name="Thursday"
                  checked={this.state.Thursday}
                  onChange={this.updateAvailability}
                />
                <label>Thursday</label>
                <br />
                <input
                  type="checkbox"
                  name="Friday"
                  checked={this.state.Friday}
                  onChange={this.updateAvailability}
                />
                <label>Friday</label>
                <br />
                <input
                  type="checkbox"
                  name="Saturday"
                  checked={this.state.Saturday}
                  onChange={this.updateAvailability}
                />
                <label>Saturday</label>
                <br />
                <input
                  type="checkbox"
                  name="Sunday"
                  checked={this.state.Sunday}
                  onChange={this.updateAvailability}
                />
                <label>Sunday</label>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={this.initialCreate}>
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
                >
                  Save/Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
