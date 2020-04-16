import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <div className="navAndContent">
        <Navbar />
        <div className="content">
          <h1> Welcome !!</h1>
        </div>

        {/* <br />
        <Link to="/login"> Sign In</Link>
        <p>Don't have an account ?</p>
        <Link to="/registration"> Create account </Link> */}
      </div>
    );
  }
}
