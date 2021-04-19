import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SignupPage() {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
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
        window.location = "/";
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Signup</h1>
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
          <Link to="/login">Login</Link>
        </Col>
      </Row>
    </Container>
  );
}
