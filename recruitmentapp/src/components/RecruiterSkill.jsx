import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = "https://recruitmentsystemapi.azurewebsites.net/api/";

export default class RecruiterSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false
    };
  }

  changeEditable = () => {
    this.setState({ isEditable: true });
  };

  editSkill = async event => {
    console.log(this.props.auth.JWToken);
    let skill_id = this.props.skill.id;
    let isActive = this.props.skill.isActive;
    let skillName = document.getElementById(skill_id + "skill-name").value;
    let chargeAmount = document.getElementById(skill_id + "charge-amount")
      .value;
    let payAmount = document.getElementById(skill_id + "pay-amount").value;
    await fetch(API_URL + "skills/" + skill_id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.JWToken}`
      },
      body: JSON.stringify({
        id: skill_id,
        name: skillName,
        chargeAmount: chargeAmount,
        payAmount: payAmount,
        isActive: isActive
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
    //console.log(skillName + chargeAmount + payAmount);
    //console.log();
    //alert("PUT-request");
    //this.setState({ isEditable: false });
  };

  render() {
    if (this.state.isEditable) {
      return (
        <>
          <td>
            <input
              id={this.props.skill.id + "skill-name"}
              placeholder={this.props.skill.name}
            ></input>
          </td>
          <td>
            <input
              id={this.props.skill.id + "charge-amount"}
              placeholder={this.props.skill.chargeAmount}
            ></input>
          </td>
          <td>
            <input
              id={this.props.skill.id + "pay-amount"}
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
          <td>{this.props.skill.name}</td>
          <td> {this.props.skill.chargeAmount}</td>
          <td> {this.props.skill.payAmount}</td>
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
