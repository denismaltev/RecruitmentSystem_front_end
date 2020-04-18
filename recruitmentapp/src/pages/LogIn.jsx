import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import Validation from "../components/Validation";
import { Redirect, Route, BrowserHistory } from "react-router";

// const AUTH_TOKEN = "auth_token";
//const USER_ROLE = "";
export default class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginMessage: "",
      isAdmin: false,
      isCompany: false,
      isLabourer: false,
      errors: {
        blankfield: false,
      },
    };
    this.login = this.login.bind(this);
  }

  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
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
    // console.log(this.state.email);
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
      const URL =
        "https://recruitmentsystemapi.azurewebsites.net/api/auth/login";
      fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      })
        // Response received.
        .then((response) => response.json())
        // Data retrieved.
        .then((json) => {
          if (json["status"] === "OK") {

            // sessionStorage.setItem(AUTH_TOKEN, json["token"]);

            this.setState({loginMessage:"The user has been logged in."})
            this.props.auth.setUserRole(json["role"]);
            this.props.auth.authenticateUser(true);
            this.props.auth.setToken(json["token"]);

            if(json["role"] === "admin"){
              this.setState({
                isAdmin:true
              })
            }
            console.log("Login status" + this.state.isAdmin)

            if(json["role"] === "company"){
              this.setState({
                isCompany:true
              })
            }
            console.log("Login status" + this.state.isCompany)

            if(json["role"] === "labourer"){
              this.setState({
                isLabourer:true
              })
            }
            console.log("Login status" + this.state.isLabourer)

          } else {
            this.setState({
              loginMessage: "An error occured at login. Try again.",
            });
          }
        })
        // Data not retrieved.
        .catch(function (error) {
          if (sessionStorage[""]) alert(error);
        });
    }
  }

  render() {
    if (this.state.isAdmin === true) {
      return <Redirect to='/recruiter-skills' />
    }else if(this.state.isCompany === true){
      return <Redirect to='/company-profile' />
    }else if(this.state.isLabourer){
      return <Redirect to='/labourer-profile' />
    }
    else{
    return (
      <Container>
        <Row>
          <Col className="p-5">
            <FormErrors formerrors={this.state.errors} />
            <form
              style={{ margin: "0 auto", width: "500px" }}
              className="text-center border border-light p-5"
              // action="#!"
              onSubmit={this.login}
            >
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
                onClick={this.login}
                className="btn btn-primary btn-block my-4"
                type="submit"
              >
                Login
              </button>
              <h1>{this.state.loginMessage}</h1>
              {/* <br/>{this.state.token}<br/><br/> */}
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
    }
  }
}
