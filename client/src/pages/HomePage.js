import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
          <Navbar.Brand href="/"><img src="https://res.cloudinary.com/denkxexyj/image/upload/v1620800654/Icon2_rsjawl.png"></img></Navbar.Brand>
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
          <img src="https://res.cloudinary.com/denkxexyj/image/upload/v1620800654/Varanus2_wsgera.png"></img>
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
                When creating a character, the user can select numerous options - however only the class has any effect on gameplay.
              </Card.Text>
              <Card.Text>
                The two classes are the Warrior & the Wizard.
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
              </Card.Text>
              <Card.Text>
                The Player's abilities change depending on what Class the Player selected during character creation.
              </Card.Text>
              <Card.Text>
                Each ability will display a range of potential damage beneath it.
              </Card.Text>
              <Card.Text>
                Once either the Player's or Enemies health has reached zero, the game is over.
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
                There is currently only a single enemy in the game, the Ghoul.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row >
    </Container >
  );
}
