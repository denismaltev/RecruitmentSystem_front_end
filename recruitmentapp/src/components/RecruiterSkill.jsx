import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = "https://recruitmentsystemapi.azurewebsites.net/api/";

export default class RecruiterSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      skillName: "",
      chargeAmount: "",
      payAmount: ""
    };
  }

  componentDidMount() {
    this.setState({ skillName: this.props.skill.name });
    this.setState({ chargeAmount: this.props.skill.chargeAmount });
    this.setState({ payAmount: this.props.skill.payAmount });
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeEditable = () => {
    this.setState({ isEditable: true });
  };

  editSkill = async event => {
    await fetch(API_URL + "skills/" + this.props.skill.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.JWToken}`
      },
      body: JSON.stringify({
        id: this.props.skill.id,
        name: this.state.skillName,
        chargeAmount: this.state.chargeAmount,
        payAmount: this.state.payAmount,
        isActive: this.props.skill.isActive
      })
    }).then(res => {
      if (res.status === 200) {
        this.setState({ isEditable: false });
        alert("The skill was updated");
      } else {
        this.setState({ isEditable: false });
        alert("ERROR: Something went wrong! " + res.statusText);
      }
    });
  };

  render() {
    if (this.state.isEditable) {
      return (
        <>
          <td>
            <input
              id={this.props.skill.id + "skill-name"}
              value={this.state.skillName}
              name={"skillName"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.name}
            ></input>
          </td>
          <td>
            <input
              id={this.props.skill.id + "charge-amount"}
              value={this.state.chargeAmount}
              name={"chargeAmount"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.chargeAmount}
            ></input>
          </td>
          <td>
            <input
              id={this.props.skill.id + "pay-amount"}
              value={this.state.payAmount}
              name={"payAmount"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.payAmount}
            ></input>
          </td>
          <td>
            {this.props.skill.isActive === true ? (
              <FontAwesomeIcon icon="check-circle" color="blue" />
            ) : (
              "X"
            )}
          </td>
          <td>
            <Button onClick={this.editSkill}>Update</Button>
          </td>
        </>
      );
    } else {
      return (
        <>
          <td>{this.state.skillName}</td>
          <td> {this.state.chargeAmount}</td>
          <td> {this.state.payAmount}</td>
          <td>
            {this.props.skill.isActive === true ? (
              <FontAwesomeIcon icon="check-circle" color="blue" />
            ) : (
              "X"
            )}
          </td>
          <td>
            <Button onClick={this.changeEditable}>Edit</Button>
          </td>
        </>
      );
    }
  }
}
