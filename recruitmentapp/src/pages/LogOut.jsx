import React from "react";
// import { Alert, Button } from "react-bootstrap";
import PanelHeader from "../components/PanelHeader";
import { Row, Col, Alert, Button } from "reactstrap";

export default class Logout extends React.Component {
  logout = () => {
    this.props.auth.setUserRole("");
    this.props.auth.authenticateUser("");
    this.props.auth.settoken("");
    this.props.auth.setProfileId(null);
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="logout-conformation-message">
          <Alert color="danger">
            <h5>You are about to logout</h5>
            <p>Please confirm your action.</p>
            <hr />
            <Button
              onClick={() => {
                window.history.back();
              }}
              variant="danger"
            >
              Cancel
            </Button>{" "}
            <Button onClick={this.logout} color="danger">
              Confirm
            </Button>
          </Alert>
        </div>
      </>
    );
  }
}
