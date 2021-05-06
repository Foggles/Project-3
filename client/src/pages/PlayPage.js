import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import Playscreen from "../components/Playscreen";

export default function PlayPage() {
    const [error, setError] = useState("");
    const [characterData, setCharacterData] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        fetch("/api/characters/" + id, {
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
            .then((data) => {
                console.log(data);
                setCharacterData(data);
            })
            .catch((error) => {
                setError(error);
            });
    }, [id])

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
    console.log(characterData);
    return (
        <Container>
            <Row>
                <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
                    <Navbar.Brand href="/">Varanus</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="/characters">Back to Characters</Nav.Link>
                            </Nav.Item>
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

            {characterData && <Playscreen propsCharacterData={characterData} />}

        </Container>
    );
}
