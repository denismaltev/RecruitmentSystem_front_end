import React from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import RecruiterSkill from "../components/RecruiterSkill";
import { getAllSkills, postSkill } from "../api/SkillsApi";

export default class RecruiterSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: []
    };
  }

  getSkillsFromAPI = async () => {
    const TOKEN = this.props.auth.JWToken;
    await getAllSkills({ TOKEN }).then(res => {
      if (res.status === 200) {
        this.setState({ skills: res.data });
      }
    });
  };

  addSkill = async event => {
    var skillName = document.getElementById("skill-name").value;
    var chargeAmount = document.getElementById("charge-amount").value;
    var payAmount = document.getElementById("pay-amount").value;
    const TOKEN = this.props.auth.JWToken;
    await postSkill({ TOKEN, skillName, chargeAmount, payAmount }).then(res => {
      if (res.status === 200) {
        this.getSkillsFromAPI();
        alert("New skill was added");
      } else {
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
            id="skill-name"
            type="text"
            placeholder="Skill"
            aria-label="Skill"
            aria-describedby="basic-addon1"
          />
          <FormControl
            onChange={this.onInputChange}
            id="charge-amount"
            placeholder="Charge Amount"
            aria-label="Charge Amount"
            aria-describedby="basic-addon1"
          />
          <FormControl
            onChange={this.onInputChange}
            id="pay-amount"
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
                  <RecruiterSkill {...this.props} skill={skill} />
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
