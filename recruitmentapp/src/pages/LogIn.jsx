import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import FormErrors from "../components/FormError";
import Validation from "../components/Validation";

export default class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
     
      errors: {
        blankfield: false,
      },
    };
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

  handleLogin= async event => {
    console.log(this.state.email);

    //Prevent page reload
    event.preventDefault();
  
    //Form validation
    this.clearErrors();

    const error = Validation(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
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
                <p className="h4 mb-4">Sign in</p>

                <input
                  type="email"
                  id="email"                  
                  className="form-control mb-4"
                  placeholder="E-mail"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />

                <input
                  type="password"
                  id="password"
                  className="form-control mb-4"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <button
                  // onClick=""
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                >
                  Login
                </button>

                <p className="control">
                    <a href="/">Forgot password?</a>
                </p>

                <p>
                  Not yet registered?
                  <a href="/register"> Create an account</a>
                </p>
              </form>
            </Col>
          </Row>
        </Container>
      );
    }
}