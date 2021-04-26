import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function CharacterPage() {
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
                <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
                    <Navbar.Brand href="/">Varanus</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="/">HomePage</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Row>
            <br />
            <br />
            <Row>
                <Col>
                    <h1>Characters Page</h1>
                </Col>
            </Row>
        </Container>
    );
}
