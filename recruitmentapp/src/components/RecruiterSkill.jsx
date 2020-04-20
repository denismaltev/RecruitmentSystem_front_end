import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { putSkill } from "../api/SkillsApi";

export default class RecruiterSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      skillName: "",
      chargeAmount: "",
      payAmount: "",
      isActive: false
    };
  }

  componentDidMount() {
    this.setState({ skillName: this.props.skill.name });
    this.setState({ chargeAmount: this.props.skill.chargeAmount });
    this.setState({ payAmount: this.props.skill.payAmount });
    this.setState({ isActive: this.props.skill.isActive });
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeEditable = () => {
    this.setState({ isEditable: true });
  };

  changeActiveStatus = () => {
    if (this.state.isActive) {
      this.setState({ isActive: false });
    } else {
      this.setState({ isActive: true });
    }
  };

  editSkill = async event => {
    const TOKEN = this.props.auth.JWToken;
    const id = this.props.skill.id;
    const skillName = this.state.skillName;
    const chargeAmount = this.state.chargeAmount;
    const payAmount = this.state.payAmount;
    const isActive = this.state.isActive;
    await putSkill({
      TOKEN,
      id,
      skillName,
      chargeAmount,
      payAmount,
      isActive
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({ isEditable: false });
          alert("The skill was updated");
        } else {
          this.setState({ isEditable: false });
          alert("ERROR: Something went wrong! " + res.statusText);
        }
      })
      .catch(err => {
        console.log(err);
        alert("ERROR: Something went wrong!");
      });
  };

  render() {
    if (this.state.isEditable) {
      return (
        <>
          <td>
            <input
              value={this.state.skillName}
              name={"skillName"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.name}
            ></input>
          </td>
          <td>
            <input
              value={this.state.chargeAmount}
              name={"chargeAmount"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.chargeAmount}
            ></input>
          </td>
          <td>
            <input
              value={this.state.payAmount}
              name={"payAmount"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.payAmount}
            ></input>
          </td>
          <td>
            {this.state.isActive === true ? (
              <FontAwesomeIcon
                onClick={this.changeActiveStatus}
                icon="check-circle"
                color="blue"
              />
            ) : (
              <div onClick={this.changeActiveStatus}>X</div>
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
            {this.state.isActive === true ? (
              <FontAwesomeIcon icon="check-circle" color="blue" />
            ) : (
              <div>X</div>
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
