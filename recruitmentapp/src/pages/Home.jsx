import React from "react";
import Login from "./LogIn";

export default class Home extends React.Component {
  render() {
    return (
      <div className="content">
        <h1> Welcome !!</h1>
        <Login/>
      </div>
    );
  }
}
