import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = "https://recruitmentsystemapi.azurewebsites.net/api/skills";

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

  editSkill = () => {
    alert("PUT-request");
    this.setState({ isEditable: false });
  };

  render() {
    if (this.state.isEditable) {
      return (
        <>
          <td>
            <input placeholder={this.props.skill.name}></input>
          </td>
          <td>
            <input placeholder={this.props.skill.chargeAmount}></input>
          </td>
          <td>
            <input placeholder={this.props.skill.payAmount}></input>
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
