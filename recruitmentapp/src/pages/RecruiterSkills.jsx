import React from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import RecruiterSkill from "../components/RecruiterSkill";
import Pagination from "../components/Pagination";
import { getAllSkills, postSkill } from "../api/SkillsApi";
import { config } from "../api/config.json";
import PanelHeader from "../components/PanelHeader";
import { Row, Col, Card, CardBody } from "reactstrap";

var count = config.NUMBER_OF_ROWS_PER_PAGE;
export default class RecruiterSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      skillName: "",
      chargeAmount: "",
      payAmount: "",
      errorMessage: "",
      totalSkills: 0,
      page: 1
    };
  }

  componentDidMount() {
    this.getSkillsFromAPI();
  }

  onInputChange = event => {
    this.clearErrorMessage();
    this.setState({ [event.target.name]: event.target.value });
  };

  getSkillsFromAPI = async () => {
    const token = this.props.auth.JWToken;
    var page = this.state.page;
    await getAllSkills({ token, count, page })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            skills: res.data.result,
            totalSkills: res.data.totalRows
          });
          this.paginate.bind(this);
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

  // !!!!!! This block MUST BE replaced with Validation service
  isValid = (skillName, chargeAmount, payAmount) => {
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
  };

  addSkill = async event => {
    const token = this.props.auth.JWToken;
    const skillName = this.state.skillName.trim();
    const chargeAmount = parseFloat(this.state.chargeAmount);
    const payAmount = parseFloat(this.state.payAmount);

    if (this.isValid(skillName, chargeAmount, payAmount)) {
      await postSkill({ token, skillName, chargeAmount, payAmount })
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

  paginate = async number => {
    await this.setState({
      page: number
    });
    this.getSkillsFromAPI();
  };

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
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
                      className="add-skill-input"
                    />
                    <FormControl
                      onChange={this.onInputChange}
                      value={this.state.payAmount}
                      name={"payAmount"}
                      placeholder="Pay Amount"
                      aria-label="Pay Amount"
                      aria-describedby="basic-addon1"
                      className="skill-pay"
                    />
                    <Button onClick={this.addSkill}>Add Skill</Button>
                  </InputGroup>
                  <Table responsive>
                    <thead className="text-primary">
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
                        this.state.skills.map((skill) => (
                          <tr key={skill.id}>
                            <RecruiterSkill {...this.props} skill={skill} />
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination
                    itemsPerPage={count}
                    totalItem={this.state.totalSkills}
                    paginate={this.paginate}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
