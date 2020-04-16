import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
export default class LogIn extends React.Component {
    
    render(){
      return (
        <Container>
          <Row>
            <Col className="p-5">
              <form
                style={{ margin: "0 auto", width: "500px" }}
                className="text-center border border-light p-5"
                action="#!"
              >
                <p className="h4 mb-4">Sign in</p>

                <input
                  type="email"
                  className="form-control mb-4"
                  placeholder="E-mail"
                />

                <input
                  type="password"
                  className="form-control mb-4"
                  placeholder="Password"
                />
                <button
                  onClick=""
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                >
                  Login
                </button>

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