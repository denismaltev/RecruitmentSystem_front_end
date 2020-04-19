import React from "react";

export default class LogOut extends React.Component {
  componentDidMount() {
    this.logout();
  }
  logout = () => {
    console.log("LOGOUT");
  };
  render() {
    return (
      <div>
        <h1>hey</h1>
      </div>
    );
  }
}
