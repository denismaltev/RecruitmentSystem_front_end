import React from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import RecruiterSkill from "../components/RecruiterSkill";
import { getAllSkills, postSkill } from "../api/SkillsApi";

export default class RecruiterSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      skillName: "",
      chargeAmount: "",
      payAmount: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.getSkillsFromAPI();
    //console.log("a".isNaN);
  }

  onInputChange = event => {
    this.clearErrorMessage();
    this.setState({ [event.target.name]: event.target.value });
  };

  getSkillsFromAPI = async () => {
    const TOKEN = this.props.auth.JWToken;
    await getAllSkills({ TOKEN })
      .then(res => {
        if (res.status === 200) {
          this.setState({ skills: res.data });
        }
      })
      .catch(err => {
        console.log(err);
        alert("ERROR: Something went wrong! ");
      });
  };

  clearForm = () => {
    this.setState({ skillName: "" });
    this.setState({ chargeAmount: "" });
    this.setState({ payAmount: "" });
    this.setState({ errorMessage: "" });
  };

  clearErrorMessage = () => {
    this.setState({ errorMessage: "" });
  };

  isValid = (skillName, chargeAmount, payAmount) => {
    // console.log(typeof skillName);
    // console.log(typeof chargeAmount);
    // console.log(typeof payAmount);
    // console.log(skillName);
    // console.log(chargeAmount);
    // console.log(payAmount);

    let errorMessage = "Error: ";
    let result = true;

    if (skillName.length === 0) {
      errorMessage = errorMessage + "Skill field is empty. ";
      result = false;
    }
    if (isNaN(chargeAmount)) {
      errorMessage = errorMessage + "Charge Amount is not a number. ";
      result = false;
    }
    if (isNaN(payAmount)) {
      errorMessage = errorMessage + "Pay Amount is not a number. ";
      result = false;
    }
    if (chargeAmount < 0) {
      errorMessage = errorMessage + "Charge Amount is negative. ";
      result = false;
    }
    if (payAmount < 0) {
      errorMessage = errorMessage + "Pay Amount is negative. ";
      result = false;
    }
    if (payAmount > chargeAmount) {
      errorMessage =
        errorMessage + "Pay Amount Must be less then charge amount ";
      result = false;
    }

    if (result === false) {
      this.setState({ errorMessage: errorMessage });
    } else {
      this.setState({ errorMessage: "" });
    }
    return result;
    // if (
    //   skillName !== "" &&
    //   chargeAmount !== "" &&
    //   payAmount !== "" &&
    //   typeof skillName === "string" &&
    //   typeof chargeAmount === "number" &&
    //   typeof payAmount === "number" &&
    //   chargeAmount > 0 &&
    //   payAmount > 0
    // ) {
    //   return result;
    // } else {
    //   return result;
    // }
  };

  addSkill = async event => {
    const TOKEN = this.props.auth.JWToken;
    const skillName = this.state.skillName.trim();
    const chargeAmount = parseFloat(this.state.chargeAmount);
    const payAmount = parseFloat(this.state.payAmount);

    if (this.isValid(skillName, chargeAmount, payAmount)) {
      await postSkill({ TOKEN, skillName, chargeAmount, payAmount })
        .then(res => {
          if (res.status === 200) {
            this.getSkillsFromAPI();
            alert("New skill was added");
            this.clearForm();
          } else {
            alert("ERROR: Something went wrong! " + res.statusText);
          }
        })
        .catch(err => {
          console.log(err);
          alert("ERROR: Something went wrong! ");
        });
    }
  };

  render() {
    return (
      <div>
        <div style={{ color: "red" }}>{this.state.errorMessage}</div>
        <h1> Recruiter Skills</h1>
        <InputGroup className="mb-3">
          <FormControl
            onChange={this.onInputChange}
            value={this.state.skillName}
            name={"skillName"}
            type="text"
            placeholder="Skill"
            aria-label="Skill"
            aria-describedby="basic-addon1"
          />
          <FormControl
            onChange={this.onInputChange}
            value={this.state.chargeAmount}
            name={"chargeAmount"}
            placeholder="Charge Amount"
            aria-label="Charge Amount"
            aria-describedby="basic-addon1"
          />
          <FormControl
            onChange={this.onInputChange}
            value={this.state.payAmount}
            name={"payAmount"}
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
