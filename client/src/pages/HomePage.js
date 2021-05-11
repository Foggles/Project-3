import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/user_data", {
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
      .then((respUser) => {
        setLoggedIn(respUser.email != null);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);


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
        <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
          <Navbar.Brand href="/">Varanus</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              {!isLoggedIn ? <><Nav.Item>
                <Nav.Link href="/signup"><FontAwesomeIcon icon={faUserPlus} color={"white"} size={"2x"} /></Nav.Link>
              </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login"><FontAwesomeIcon icon={faSignInAlt} color={"white"} size={"2x"} /></Nav.Link>
                </Nav.Item></> :
                <><Nav.Item>
                  <Nav.Link href="/characters"><FontAwesomeIcon icon={faUserAlt} color={"white"} size={"2x"} /></Nav.Link>
                </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} color={"white"} size={"2x"} /></Nav.Link>
                  </Nav.Item></>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <br />
      <br />
      <br />
      <Jumbotron fluid>
        <Container className="text-center">
          <h1>Varanus</h1>
        </Container>
      </Jumbotron>
      <Row style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Character Creation</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Short Guide</Card.Subtitle>
              <Card.Text>
                Currently, only the Class that the Player selects has any effect on the game.
                <br />
                <br />
                For future development, the race & faction that the Player selects will have an effect on the game.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Combat</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Short Guide</Card.Subtitle>
              <Card.Text>
                Combat is turn-based, meaning you and the enemy take turns selecting an ability to use.
                <br />
                <br />
                The Player's abilities change depending on what Class the Player selected during character creation.
                <br />
                <br />
                Once either the Player's or Enemies health has reached zero, the game is over.
                <br />
                <br />
                For future development, abilities will have a use limit. Which will force the Player to "ration" their abilities.
            </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Enemies</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Short Guide</Card.Subtitle>
              <Card.Text>
                There is currently only a single enemy, a Zombie, in the game.
                <br />
                <br />
                When there are more, the game will randomly select an enemy for the player to play against.
            </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
