import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import Validation from "../components/Validation";
import { signUp } from "../api/AuthApi";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      registerError: "",
      role: "",
      companyClassName: "btn-register-active",
      labourerClassName: "btn-register",
      errors: {
        blankfield: false,
        matchedpassword: false
      },
      setRoleError: false
    };
  }

  handleRegister = event => {
    event.preventDefault();
    if (this.state.role === "") {
      this.setState({ setRoleError: true });
    } else {
      this.setState({ setRoleError: false });
      this.clearErrors();
      const error = Validation(event, this.state);
      if (error) {
        this.setState({
          errors: { ...this.state.errors, ...error }
        });
      } else {
        signUp({
          email: this.state.email,
          password: this.state.password,
          role: this.state.role
        })
          .then(response => {
            if (response.status === 200) {
              this.props.history.push("/");
            } else {
              this.setState({
                registerError: "An error occured at login. Please try again."
              });
            }
          })
          // Data not retrieved.
          .catch(function(error) {
            alert("Something went wrong! " + error.response.data.message);
          });
      }
    }
  };

  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
        matchedpassword: false
      }
    });
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleRoleSelection = event => {
    //     if labourer clicked
    if (event.target.value === "labourer") {
      //  check states
      //   if labourer is active, do nothing
      if (this.state.labourerClassName === "btn-register-active") {
        this.setState({ companyClassName: "btn-register" });
      } else {
        //   if labourer not active, set labourer active & set company inactive
        this.setState({
          labourerClassName: "btn-register-active",
          companyClassName: "btn-register"
        });
      }
    } else {
      //company button clicked
      if (this.state.companyClassName === "btn-register-active") {
        this.setState({ labourerClassName: "btn-register" });
      } else {
        // company button clicked and company not active
        this.setState({
          companyClassName: "btn-register-active",
          labourerClassName: "btn-register"
        });
      }
    }
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="p-5" id="registration">
            <div className="register-container">
              <h2>{this.state.registerError}</h2>
              <h1 className="h1 mb-4 register-title">Register</h1>
              <h3>
                {this.state.setRoleError
                  ? "Please register as company or labourer"
                  : ""}
              </h3>
              <div className="button-container">
                <button
                  className={this.state.companyClassName}
                  id="role"
                  value="company"
                  onClick={this.handleRoleSelection}
                >
                  I'm a company
                </button>
                <button
                  className={this.state.labourerClassName}
                  id="role"
                  value="labourer"
                  onClick={this.handleRoleSelection}
                >
                  I'm a labourer
                </button>
              </div>
              <FormErrors formerrors={this.state.errors} />
              <form
                onSubmit={this.handleRegister}
                style={{ margin: "0 auto", width: "500px" }}
                className="text-center border border-light p-5"
                id="registration-form"
              >
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
                    <a href="/"> Sign In</a>
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
