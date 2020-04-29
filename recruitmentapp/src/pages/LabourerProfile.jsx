import React from "react";
import StarRatings from "react-star-ratings";
import { getLabourerById, saveLabourer } from "../api/LabourerApi";
import SkillsSelector from "../components/SkillsSelector";
import Weekdays from "../components/Weekdays";
import FormErrors from "../components/FormError";
import ValidationLabourer from "../components/ValidationLabourer";

export default class LabourerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      labourer: {
        id: props.auth.profileId,
      },
      errors: {
        blankfield: false,
      },
    };
  }

  componentDidMount() {
    this.getLabourerById();
  }

  onInputChange = (event) => {
    this.setState({
      labourer: {
        ...this.state.labourer,
        [event.target.id]: event.target.value,
      },
    });
  };

  onDayCheck = (day) => {
    const newAvailability = !this.state.labourer[day];
    this.setState({
      labourer: { ...this.state.labourer, [day]: newAvailability },
    });
  };

  updateSkills = (selected) => {
    this.setState({
      labourer: {
        ...this.state.labourer,
        skills: selected,
      },
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.labourer);
    this.clearErrors();
    const error = ValidationLabourer(event, this.state.labourer);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    } else {
      saveLabourer({
        token: this.props.auth.JWToken,
        labourer: this.state.labourer,
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Profile successfully saved");
            if (response.data.id) {
              this.props.auth.setProfileId(response.data.id);
            }
          } else {
            alert("ERROR: Something went wrong! " + response.statusText);
          }
        })
        .catch((error) => {
          alert("Something went wrong! " + error.response.data.message);
        });
    }
  };

  getLabourerById = () => {
    if (this.state.labourer?.id) {
      getLabourerById({
        token: this.props.auth.JWToken,
        id: this.state.labourer.id,
      })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            this.setState({
              labourer: response.data,
              isLoading: false,
            });
          }
        })
        .catch(function (error) {
          alert("Something went wrong! " + error.response.data.message);
        });
    } else {
      this.setState({ isLoading: false });
    }
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
    if (this.state.isLoading) return <div>Loading...</div>;
    else {
      return (
        <div className="lab-profile page-content">
          <div className="lab-profile-col">
            <div className="lab-profile-item">
              <h4>Safety Rating</h4>
              <StarRatings
                rating={this.state.labourer.safetyRating || 0}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="lab-profile-item">
              <h4>Quality Rating</h4>
              <StarRatings
                rating={this.state.labourer.qualityRating || 0}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="lab-profile-item">
              <h4>Skills</h4>
              <SkillsSelector
                auth={this.props.auth}
                selected={this.state.labourer.skills || []}
                onChange={this.updateSkills}
                placeholder="Choose your skills"
              />
              <ul className="lab-profile-list">
                {this.state.labourer.skills &&
                  this.state.labourer.skills.map((item) => (
                    <li key={item.id}>
                      {item.isActive === true ? item.name : ""}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="lab-profile-item">
              <h4>Availability</h4>
              <Weekdays
                days={{
                  mon: this.state.labourer.monday || false,
                  tue: this.state.labourer.tuesday || false,
                  wed: this.state.labourer.wednesday || false,
                  thu: this.state.labourer.thursday || false,
                  fri: this.state.labourer.friday || false,
                  sat: this.state.labourer.saturday || false,
                  sun: this.state.labourer.sunday || false,
                }}
                onDayCheck={(day) => this.onDayCheck(day)}
              />
            </div>
          </div>
          <div className="lab-profile-col">
            <FormErrors formerrors={this.state.errors} />
            <form
              className="text-center border border-light p-5"
              onSubmit={this.onSubmit}
              method="post"
            >
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control mb-4"
                  value={this.state.labourer.firstName || ""}
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
                  value={this.state.labourer.lastName || ""}
                  name="FirstName"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control mb-4"
                  value={this.state.labourer.email || ""}
                  name="email"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Personal ID</label>
                <input
                  type="text"
                  id="personalId"
                  className="form-control  mb-4"
                  value={this.state.labourer.personalId || ""}
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
                  value={this.state.labourer.city || ""}
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
                  value={this.state.labourer.province || ""}
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
                  value={this.state.labourer.country || ""}
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
                  value={this.state.labourer.phone || ""}
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
                  value={this.state.labourer.address || ""}
                  name="Address"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                >
                  {this.state.labourer.id ? "Update" : " Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}
