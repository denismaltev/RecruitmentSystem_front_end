import React from "react";
import StarRatings from "react-star-ratings";
import { MDBSelect } from "mdbreact";

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
      Skills: [],
      options: [
        {
          text: "Painting",
          value: "1",
        },
        {
          text: "Pluming",
          value: "2",
        },
        {
          text: "Electrician",
          value: "3",
        },
        {
          text: "Mechanic",
          value: "4",
        },
      ],
    };
  }

  componentDidMount() {
    // get request to api to retrive ratings and personal data, for now I will use the harcoded data
    this.setState({ SafetyRating: 2 });
    this.setState({ QualityRating: 4.5 });
    this.setState({ FirstName: "John" });
    this.setState({ LastName: "Doe" });
    this.setState({ Email: "test@test.com" });
    this.setState({ City: "Vancouver" });
    this.setState({ Province: "BC" });
  }

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
            {/* <MDBSelect
              color="primary"
              multiple
              options={this.state.options}
              selected="Choose your option"
              label="Example label"
            /> */}
          </div>
          <div>
            <form role="form">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.FirstName}
                  name="FirstName"
                  placeholder="First Name"
                  onChange={this.updateInputValue}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.LastName}
                  name="LastName"
                  placeholder="LastName"
                  onChange={this.updateInputValue}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.Email}
                  name="Email"
                  placeholder="Email"
                  onChange={this.updateInputValue}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.City}
                  name="City"
                  placeholder="City"
                  onChange={this.updateInputValue}
                />
              </div>
              <div className="form-group">
                <label>Province</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.Province}
                  name="Province"
                  placeholder="Province"
                  onChange={this.updateInputValue}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
