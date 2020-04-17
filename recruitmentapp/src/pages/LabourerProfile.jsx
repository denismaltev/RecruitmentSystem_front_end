import React from "react";
import StarRatings from "react-star-ratings";
import { MDBSelect } from "mdbreact";
import MultiSelect from "react-multi-select-component";

export default class LabourerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      Email: "",
      City: "",
      Province: "",
      SafetyRating: 0,
      QualityRating: 0,
      Availability: [],
      items: [],
      skills: [],
      options: [
        { label: "Painting", value: "painting" },
        { label: "Welder", value: "welder" },
        { label: "Electrician", value: "electrician" },
        { label: "Carpentry", value: "carpentry" },
      ],
    };
  }

  componentDidMount() {
    //HARD CODED DATA!
    // get request to api to retrive ratings, rating, availability and personal data
    this.setState({ SafetyRating: 2 });
    this.setState({ QualityRating: 4.5 });
    this.setState({ FirstName: "John" });
    this.setState({ LastName: "Doe" });
    this.setState({ Email: "test@test.com" });
    this.setState({ City: "Vancouver" });
    this.setState({ Province: "BC" });
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  updateInputValue = (event) => {
    //HARD CODED DATA!
    // post request to api to update availabiliy,skills and and personal data
  };

  addSkill = (value) => {
    this.setState({
      items: value,
    });
    var x = [];
    for (var i = 0; i < value.length; i++) {
      if (value[i].label != value.indexOf(value[i].label)) {
        x.push(value[i].label);
      }
    }
    this.setState({
      skills: x,
    });
    console.log(this.state.skills);
  };

  render() {
    return (
      <div>
        <h1> Labourer Profile</h1>
        <div>
          <div>
            <h3>Safety Rating</h3>
            <StarRatings
              rating={this.state.SafetyRating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
            />
          </div>
          <div>
            <h3>Quality Rating</h3>
            <StarRatings
              rating={this.state.QualityRating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
            />
          </div>
          <div>
            <h3>Availability</h3>
          </div>
          <div>
            <h3>Skills</h3>
            <MultiSelect
              options={this.state.options}
              value={this.state.items}
              onChange={this.addSkill}
            />
            {/* <MDBSelect
              color="primary"
              multiple
              options={this.state.options}
              selected="Choose your option"
              label="Example label"
            /> */}
          </div>
          <div>
            <form onSubmit={this.updateInputValue}>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  id="FirstName"
                  className="form-control"
                  value={this.state.FirstName}
                  name="FirstName"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  id="LastName"
                  className="form-control"
                  value={this.state.LastName}
                  name="FirstName"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  id="Email"
                  className="form-control"
                  value={this.state.Email}
                  name="Email"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  id="City"
                  className="form-control"
                  value={this.state.City}
                  name="City"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Province</label>
                <input
                  type="text"
                  id="Province"
                  className="form-control"
                  value={this.state.Province}
                  name="Province"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                >
                  Update/Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
