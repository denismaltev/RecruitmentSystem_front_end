import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export default class LogIn extends React.Component {
    
    render(){
      return (
        <div>
          <h1> Sign in </h1>
          <br />
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <br/>
            <br/>
            <p>Don't have an account?</p>
            <Link to="/">Create Account</Link>
          </Form>
        </div>
      );
    }
}