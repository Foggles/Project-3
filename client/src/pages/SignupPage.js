import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function SignupPage() {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) {
          throw resp.statusText;
        }
        return resp.json();
      })
      .then(() => {
        window.location = "/characters";
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <Container>
      <Row>
        <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
          <Navbar.Brand href="/"><img src="https://res.cloudinary.com/denkxexyj/image/upload/v1620800654/Icon2_rsjawl.png"></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Item>
                <Nav.Link href="#"><FontAwesomeIcon icon={faUserPlus} color={"white"} size={"2x"} /></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login"><FontAwesomeIcon icon={faSignInAlt} color={"white"} size={"2x"} /></Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <Card bg="dark" text="white" style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: '18rem'
      }}>
        <Card.Body>
          <Row>
            <Col>
              <h1 className="text-center">Signup</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    ref={nameRef}
                    type="string"
                    placeholder="Enter Username"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    ref={emailRef}
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                {error && <Form.Text className="text-muted">{error}</Form.Text>}
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
            </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

    </Container>
  );
}
