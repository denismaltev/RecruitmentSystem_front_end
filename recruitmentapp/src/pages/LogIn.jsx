import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import Validation from "../components/Validation";

// const BASE_URL        = 'https://localhost:44362/api/';

const AUTH_TOKEN = "auth_token";

export default class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token:"",
      loginMessage : "",
      errors: {
        blankfield: false,
      },
    };
    this.login         = this.login.bind(this);
  }

  // Called when constructor is finished building component.
  componentDidMount() {  
    if(sessionStorage.getItem(AUTH_TOKEN)!=null) {
      this.setState({ 
        token:sessionStorage.getItem(AUTH_TOKEN)});
    }
  }


  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
      }
    });
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  login(e)  {
    // console.log(this.state.email);
    const email      = this.email.value;
    const password   = this.password.value;
  
    //Prevent page reload
    e.preventDefault();
  
    //Form validation
    this.clearErrors();

    const error = Validation(e, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    }else{
      const URL =
      "https://recruitmentsystemapi.azurewebsites.net/api/auth/login";
      fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Email:      email, 
            Password:   password
        })
    })
    // Response received.
    .then(response => response.json())
        // Data retrieved.
        .then(json => {
            // Store token with session data.
            if(json["status"]==="OK") {
              sessionStorage.setItem(AUTH_TOKEN, json["token"]);
             
              this.token   = json["token"];
              console.log(this.token);
              this.setState({loginMessage:"The user has been logged in.",
              token: json["token"] }); 
            }
            else {
              this.setState({loginMessage:
                "An error occured at login. Try again." }); 
            }
        })
        // Data not retrieved.
        .catch(function (error) {
            if(sessionStorage[""])
            alert(error);
        }) 

    }
  };

    
    render(){
      return (
        <Container>
          <Row>
            <Col className="p-5">
            <FormErrors formerrors={this.state.errors} />
              <form
                style={{ margin: "0 auto", width: "500px" }}
                className="text-center border border-light p-5"
                // action="#!"
                onSubmit={this.handleLogin}
              >
                <p className="h1 mb-4">Sign in</p>

                <input
                  type="email"
                  id="email"                  
                  className="form-control mb-4"
                  placeholder="E-mail"
                  value={this.state.email}
                  onChange={this.onInputChange}
                  ref={(emailInput)=> this.email = emailInput}
                />

                <input
                  type="password"
                  id="password"
                  className="form-control mb-4"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                  ref={(passwordInput)=> this.password = passwordInput}
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