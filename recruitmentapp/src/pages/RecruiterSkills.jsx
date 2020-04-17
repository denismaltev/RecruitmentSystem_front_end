import React from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

export default class RecruiterSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillName: "",
      chargeAmount: "",
      payAmount: "",
      skills: []
    };
  }

  getSkillsFromAPI = async () => {
    var API_URL = "https://recruitmentsystemapi.azurewebsites.net/api/skills";
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
        //console.log(data);
      });
    //console.log(this.skills);
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
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
            onChange={this.onInputChange}
            value={this.state.skillName}
            placeholder="Skill"
            aria-label="Skill"
            aria-describedby="basic-addon1"
          />
          <FormControl
            placeholder="Charge Amount"
            aria-label="Charge Amount"
            aria-describedby="basic-addon1"
          />
          <FormControl
            placeholder="Pay Amount"
            aria-label="Pay Amount"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button>Add Skill</Button>
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
