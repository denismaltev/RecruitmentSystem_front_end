import React from "react";
import { Button, FormControl } from "react-bootstrap";
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

  changeEditable = status => {
    if (status === false) {
      // cancel all changes and come back to the initial state of component
      this.setState({ isEditable: status });
      this.setState({ skillName: this.props.skill.name });
      this.setState({ chargeAmount: this.props.skill.chargeAmount });
      this.setState({ payAmount: this.props.skill.payAmount });
      this.setState({ isActive: this.props.skill.isActive });
    }
    this.setState({ isEditable: status });
  };

  changeActiveStatus = () => {
    if (this.state.isActive) {
      this.setState({ isActive: false });
    } else {
      this.setState({ isActive: true });
    }
  };

  editSkill = async event => {
    const token = this.props.auth.JWToken;
    const id = this.props.skill.id;
    const skillName = this.state.skillName;
    const chargeAmount = this.state.chargeAmount;
    const payAmount = this.state.payAmount;
    const isActive = this.state.isActive;
    await putSkill({
      token,
      id,
      skillName,
      chargeAmount,
      payAmount,
      isActive
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({ isEditable: false });
          //alert("The skill was updated");
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
            <FormControl
              value={this.state.skillName}
              name={"skillName"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.name}
            ></FormControl>
          </td>
          <td>
            <FormControl
              value={this.state.chargeAmount}
              name={"chargeAmount"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.chargeAmount}
            ></FormControl>
          </td>
          <td>
            <FormControl
              value={this.state.payAmount}
              name={"payAmount"}
              onChange={this.onInputChange}
              placeholder={this.props.skill.payAmount}
            ></FormControl>
          </td>
          <td onClick={this.changeActiveStatus}>
            {this.state.isActive === true ? (
              <button className="btn btn-success btn-sm"> Active </button>
            ) : (
              <button className="btn btn-secondary btn-sm">Inactive</button>
            )}
          </td>
          <td>
            <Button className="btn btn-success btn-sm" onClick={this.editSkill}>
              Save
            </Button>{" "}
            <Button
              className="btn btn-danger btn-sm"
              onClick={() => {
                this.changeEditable(false);
              }}
            >
              Cancel
            </Button>
          </td>
        </>
      );
    } else {
      return (
        <>
          <td>{this.state.skillName}</td>
          <td style={{ textAlign: "center" }}>${this.state.chargeAmount}</td>
          <td style={{ textAlign: "center" }}>${this.state.payAmount}</td>
          <td>
            {this.state.isActive === true ? (
              <span class="status-badge badge badge-pill badge-success">
                Active
              </span>
            ) : (
              <span class="status-badge badge badge-pill badge-secondary">
                Inactive
              </span>
            )}
          </td>
          <td>
            <button
              className="edit-pencil-button"
              onClick={() => {
                this.changeEditable(true);
              }}
            >
              <FontAwesomeIcon icon="edit" color="#f96332" />
            </button>
          </td>
        </>
      );
    }
  }
}
