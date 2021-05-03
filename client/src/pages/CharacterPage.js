import React, { useRef, useState } from "react";
import * as FCG from "fantasy-content-generator";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

function MyVerticallyCenteredModal(props) {
    const [error, setError] = useState("");
    const charRaceRef = useRef();
    const charGenderRef = useRef();
    const charFactionRef = useRef();
    const charClassRef = useRef();


    function handleCreateChar() {
        const generatedCharacter = FCG.Names.generate({ race: charRaceRef.current.value, gender: charGenderRef.current.value });
        console.log(generatedCharacter);

        const newCharacter = {
            seed: generatedCharacter.seed,
            faction: charFactionRef.current.value,
            level: 1,
            health: 100,
            mana: 100
        };

        console.log(newCharacter);

        debugger;

        fetch("/api/characters", {
            method: "POST",
            body: JSON.stringify(newCharacter),
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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Character
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCharacterRace">
                        <Form.Label>Character Race</Form.Label>
                        <Form.Control as="select" custom ref={charRaceRef}>
                            <option>dragonborn</option>
                            <option>dwarf</option>
                            <option>elf</option>
                            <option>gnome</option>
                            <option>human</option>
                            <option>halfOrc</option>
                            <option>halfElf</option>
                            <option>tiefling</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formCharacterGender">
                        <Form.Label>Character Gender</Form.Label>
                        <Form.Control as="select" custom ref={charGenderRef}>
                            <option>male</option>
                            <option>female</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formCharacterClass">
                        <Form.Label>Character Class</Form.Label>
                        <Form.Control as="select" custom ref={charClassRef}>
                            <option>Warrior</option>
                            <option>Wizard</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formCharacterFaction">
                        <Form.Label>Character Faction</Form.Label>
                        <Form.Control as="select" custom ref={charFactionRef}>
                            <option>Blue Faction</option>
                            <option>Red Faction</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={handleCreateChar}>
                    Submit
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function CharacterPage() {
    const [error, setError] = useState("");
    const [modalShow, setModalShow] = React.useState(false);

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
                                <Nav.Link onClick={() => handleLogout}>Logout</Nav.Link>
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
                                <th><Button onClick={() => setModalShow(true)}>Create New Character</Button></th>
                            </tr>
                            <tr>
                                <th>Character Name</th>
                                <th>Class</th>
                                <th>Level</th>
                                <th>Faction</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Test Man</td>
                                <td>Warrior</td>
                                <td>1</td>
                                <td>Blue Faction</td>
                            </tr>
                            <tr>

                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
}
