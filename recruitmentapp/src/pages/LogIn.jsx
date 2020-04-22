import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import Validation from "../components/Validation";
import { signIn } from "../api/AuthApi";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginMessage: "",
      loginError : "",
      errors: {
        blankfield: false,
        invalidEmail: false
      },
    };
    this.login = this.login.bind(this);
   
  }

  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
        invalidEmail: false
      },
    });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  login(e) {
    const email = this.email.value;
    const password = this.password.value;

    //Prevent page reload
    e.preventDefault();

    //Form validation
    this.clearErrors();

    const error = Validation(e, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    } else {
      signIn({ email, password })
        .then((response) => {
          const json = response.data;
          if (json["status"] === "OK") {
            this.props.auth.setToken(json["token"]);
            this.props.auth.setProfileId(json["profileId"]);
            this.props.auth.setUserRole(json["role"]);
            this.props.auth.authenticateUser(true);
            this.props.history.push("/");
          }
          else {
          this.setState({
            loginMessage: "An error occured at login. Try again.",
          });

          }
        })
        // Data not retrieved.
        .catch((error) => {
          if (sessionStorage[""]) alert(error.response);
          else {
            if (error.response) {
                // Request made and server responded
                if(error.response.data.title === "Unauthorized"){
                      // alert("Username or Password is not found")
                    this.setState({
                      loginError : "Username or password is not found"
                    })
                }
          }
        }
        });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="p-5">
            <form
              style={{ margin: "0 auto", width: "500px" }}
              className="text-center border border-light p-5"
              onSubmit={this.login}>
            
              <div>
              <FormErrors formerrors={this.state.errors} />
              { this.state.loginError &&
                <p className="error"> { this.state.loginError } </p> }
              </div>

              <p className="h1 mb-4">Sign in</p>

              
              <input
                type="email"
                id="email"
                className="form-control mb-4"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.onInputChange}
                ref={(emailInput) => (this.email = emailInput)}
              />

              <input
                type="password"
                id="password"
                className="form-control mb-4"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onInputChange}
                ref={(passwordInput) => (this.password = passwordInput)}
              />
              <button
                className="btn btn-primary btn-block my-4"
                type="submit"
                onClick={(e) => this.login}
              >
                Login
              </button>
              <h1>
                {this.state.loginMessage}
              </h1>
              <p className="control">
                <a href="/">Forgot password?</a>
              </p>

              <p>
                Not yet registered?
                <a href="/#/registration"> Create an account</a>
              </p>
            </form>
          </Col>
        </Row>
      </Container>
    );
    // }
  }
}
