import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import Validation from "../components/Validation";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      isCompany: false,
      isLabourer: false,
      errors: {
        blankfield: false,
        matchedpassword: false,
      },
    };
  }

  RegisterCompany() {}
  RegisterLabourer() {}

  handleRegister = (event) => {
    console.log(this.state.email);
    this.clearErrors();
    const error = Validation(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    }
  };
  //fetch api
  //   const URL = "";
  //   fetch(URL, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       Email: this.state.email,
  //       Password: this.state.password,
  //     }),
  //   })
  //     .then((json) => {
  //       this.props.history.push("/login");
  //     })
  //     .catch(function (error) {
  //       alert(error);
  //     });
  // };

  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
        matchedpassword: false,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="p-5" id="registration">
            <div className="outerDiv">
              <FormErrors formerrors={this.state.errors} />
              <form
                onSubmit={this.handleRegister}
                style={{ margin: "0 auto", width: "500px" }}
                className="text-center border border-light p-5"
              >
                <h1 className="h1 mb-4">Register</h1>
                <div className="button-container">
                  <button
                    onClick={this.RegisterCompany}
                    className="btn btn-primary"
                    id="companyButton"
                  >
                    I'm a company
                  </button>
                  <button
                    onClick={this.RegisterLabourer}
                    className="btn btn-primary"
                    id="labourerButton"
                  >
                    I'm a labourer
                  </button>
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    className="form-control mb-4"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onInputChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    className="form-control mb-4"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onInputChange}
                  />
                </div>
                <div>
                  <input
                    className="input"
                    type="password"
                    className="form-control mb-4"
                    id="confirmpassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmpassword}
                    onChange={this.onInputChange}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-block my-4"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div>
                  <p>
                    Already have an account?
                    <a href="./#!/login"> Sign In</a>
                  </p>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Registration;
