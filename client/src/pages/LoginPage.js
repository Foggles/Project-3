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
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("/api/login", {
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
        window.location = "/";
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <Container>
      <Row>
        <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
          <Navbar.Brand href="/">Varanus</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Item>
                <Nav.Link href="/signup"><FontAwesomeIcon icon={faUserPlus} color={"white"} size={"2x"} /></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#"><FontAwesomeIcon icon={faSignInAlt} color={"white"} size={"2x"} /></Nav.Link>
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
              <h1>Login</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
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
                  {error && <Form.Text className="text-muted">{error}</Form.Text>}
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
            </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/signup">Signup</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

    </Container >
  );
}
