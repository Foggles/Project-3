import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
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

    function handleCreateChar() {
        
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
                <Col></Col>
                <Col>
                    <h1>Characters Page</h1>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th><Button>Create New Character</Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
