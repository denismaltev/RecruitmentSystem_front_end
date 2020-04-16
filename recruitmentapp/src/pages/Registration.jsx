import React from "react";
import FormErrors from "../components/FormError";
import Validation from "../components/Validation";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      isComany: false,
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
      <div>
        <button onClick={this.RegisterCompany}>I'm a company</button>
        <button onClick={this.RegisterLabourer}>I'm a labourer</button>
        <FormErrors formerrors={this.state.errors} />
        <h1>Register</h1>
        <form onSubmit={this.handleRegister}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="password"
              id="confirmpassword"
              placeholder="Confirm Password"
              value={this.state.confirmpassword}
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
        <div>
          <p>Already have an account?</p>
          <a href="./#!/login">Sign In</a>
        </div>
      </div>
    );
  }
}
export default Registration;
