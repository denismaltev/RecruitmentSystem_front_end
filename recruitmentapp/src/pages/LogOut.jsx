import React from "react";
import { Alert, Button } from "react-bootstrap";

export default class Logout extends React.Component {
  logout = () => {
    console.log("LOGOUT");
  };

  componentDidMount() {
    this.logout();
  }

  render() {
    return (
      <div className="logout-conformation-message">
        <Alert variant="danger">
          <Alert.Heading>You are about to logout</Alert.Heading>
          <p>Please confirm your action.</p>
          <hr />
          <Button variant="danger">Confirm</Button>
        </Alert>
      </div>
    );
  }
}
