import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function LoginPage() {
  const [error, setError] = useState("");

  function handleLogout() {
    fetch("/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) {
          throw resp.statusText;
        }
        window.location = "/login";
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Home Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" type="submit" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
