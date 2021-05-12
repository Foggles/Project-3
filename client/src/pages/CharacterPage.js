import React, { useRef, useState, useEffect } from "react";
import * as FCG from "fantasy-content-generator";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import CharacterTable from "../components/CharacterTable";

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
                    <Navbar.Brand href="/"><img src="https://res.cloudinary.com/denkxexyj/image/upload/v1620800654/Icon2_rsjawl.png"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} color={"white"} size={"2x"} /></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Row>
            <br />
            <br />
            <br />
            <Row>
                <Col></Col>
                <Col>
                    <h1>List of Champions</h1>
                </Col>
                <Col></Col>
            </Row>
            <CharacterTable />
        </Container>
    );
}
