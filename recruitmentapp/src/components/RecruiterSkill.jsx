import React from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = "https://recruitmentsystemapi.azurewebsites.net/api/skills";

export default class RecruiterSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: []
    };
  }
  render() {
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
          <Button>Edit</Button>
        </td>
      </>
    );
  }
}
