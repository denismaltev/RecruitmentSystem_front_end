import React from "react";
import { Alert, Button } from "react-bootstrap";

export default class Logout extends React.Component {
  logout = () => {
    this.props.auth.setUserRole("");
    this.props.auth.authenticateUser("");
    this.props.auth.setToken("");
    this.props.auth.setProfileId(null);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="logout-conformation-message">
        <Alert variant="danger">
          <Alert.Heading>You are about to logout</Alert.Heading>
          <p>Please confirm your action.</p>
          <hr />
          <Button onClick={this.logout} variant="danger">
            Confirm
          </Button>
        </Alert>
      </div>
    );
  }
}
