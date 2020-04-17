import React from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJqdGkiOiJiY2NkYWEzZi05NTIwLTRjYjEtYTM4Zi02MTRkZGEwY2IxMTQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA2ZjA1NDA2LWU4ODUtNDc4ZC1iYmFjLTZjNTgyZmFmY2YwYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNTg3MTY1OTg2LCJpc3MiOiJSZWNydWl0bWVudFN5c3RlbUFQSS5jYSIsImF1ZCI6IlJlY3J1aXRtZW50U3lzdGVtQVBJLmNhIn0.WBHkbWumcekr5_vkdGhR2_kDmowcybXnvcfAza72xgY";
const API_URL = "https://recruitmentsystemapi.azurewebsites.net/api/skills";

export default class RecruiterSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: []
    };
  }

  getSkillsFromAPI = async () => {
    //const TOKEN = this.props.auth.JWToken;
    await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ skills: data });
        //console.log(data);
      });
    //console.log(this.skills);
  };

  addSkill = async event => {
    var skillName = document.getElementById("skillName").value;
    var chargeAmount = document.getElementById("chargeAmount").value;
    var payAmount = document.getElementById("payAmount").value;
    //const TOKEN = this.props.auth.JWToken;
    await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        Name: skillName,
        ChargeAmount: chargeAmount,
        PayAmount: payAmount,
        IsActive: true
      })
    })
      .then(res => res.json())
      .then(data => {
        //this.setState({ skills: data });
        console.log(data);
      });
    //alert("Added" + skillName);
  };

  async componentDidMount() {
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
        </InputGroup>
        <Button onClick={this.addSkill}>Add Skill</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Charge Amount</th>
              <th>Pay Amount</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {typeof this.state.skills !== "undefined" &&
              this.state.skills.map(skill => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td> {skill.chargeAmount}</td>
                  <td> {skill.payAmount}</td>
                  <td>{skill.isActive === true ? "V" : "X"}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
