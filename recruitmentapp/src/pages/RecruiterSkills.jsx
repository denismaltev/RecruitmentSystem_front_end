import React from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = "https://recruitmentsystemapi.azurewebsites.net/api/skills";

export default class RecruiterSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: []
    };
  }

  getSkillsFromAPI = async () => {
    await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.JWToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ skills: data });
        //console.log("CALL!" + data);
      });
    //console.log(this.skills);
  };

  addSkill = async event => {
    var skillName = document.getElementById("skillName").value;
    var chargeAmount = document.getElementById("chargeAmount").value;
    var payAmount = document.getElementById("payAmount").value;
    await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.JWToken}`
      },
      body: JSON.stringify({
        Name: skillName,
        ChargeAmount: chargeAmount,
        PayAmount: payAmount,
        IsActive: true
      })
    }).then(res => {
      if (res.status === 200) {
        this.getSkillsFromAPI();
        alert("New skill was added");
      } else {
        //this.setState({ skills: [] });
        //this.getSkillsFromAPI();
        alert("ERROR: Something went wrong! " + res.statusText);
      }
    });
  };

  componentDidMount() {
    this.getSkillsFromAPI();
  }

  render() {
    return (
      <div>
        <h1> Recruiter Skills</h1>
        <InputGroup className="mb-3">
          <FormControl
            id="skillName"
            type="text"
            placeholder="Skill"
            aria-label="Skill"
            aria-describedby="basic-addon1"
          />
          <FormControl
            onChange={this.onInputChange}
            id="chargeAmount"
            placeholder="Charge Amount"
            aria-label="Charge Amount"
            aria-describedby="basic-addon1"
          />
          <FormControl
            onChange={this.onInputChange}
            id="payAmount"
            placeholder="Pay Amount"
            aria-label="Pay Amount"
            aria-describedby="basic-addon1"
          />
          <Button onClick={this.addSkill}>Add Skill</Button>
        </InputGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Charge Amount</th>
              <th>Pay Amount</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {typeof this.state.skills !== "undefined" &&
              this.state.skills.map(skill => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td> {skill.chargeAmount}</td>
                  <td> {skill.payAmount}</td>
                  <td>
                    {skill.isActive === true ? (
                      <FontAwesomeIcon icon="check-circle" color="blue" />
                    ) : (
                      "X"
                    )}
                  </td>
                  <td>
                    <Button>Edit</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
