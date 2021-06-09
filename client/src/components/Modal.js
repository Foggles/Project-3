import React, { useRef, useState, useEffect } from "react";
import * as FCG from "fantasy-content-generator";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function MyVerticallyCenteredModal(props) {
    const [error, setError] = useState("");
    const charRaceRef = useRef(null);
    const charGenderRef = useRef();
    const charFactionRef = useRef();
    const charClassRef = useRef();

    function handleCreateChar() {
        // ! There's an error in the API. The character after being regenerated is different.
        function lowerFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        }

        // console.log("Selected Race = " + charRaceRef.current.value);
        const generatedCharacter = FCG.Names.generate({ race: lowerFirstLetter(charRaceRef.current.value), gender: lowerFirstLetter(charGenderRef.current.value) });
        // console.log(generatedCharacter);
        // const testChar = FCG.Names.generate({ seed: generatedCharacter.seed });
        // console.log(testChar);

        function convertClass(value) {
            if (value === "Warrior") {
                return (1);
            } else if (value === "Wizard") {
                return (2);
            }
        }


        fetch("/api/user_data", {
            method: "GET"
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                // console.log(data);
                let userId = data.id;
                // console.log(userId);

                const newCharacter = {
                    seed: generatedCharacter.seed,
                    faction: charFactionRef.current.value,
                    level: 1,
                    health: 100,
                    mana: 100,
                    ClassId: convertClass(charClassRef.current.value),
                    UserId: userId
                };

                // console.log(newCharacter);

                fetch("/api/characters", {
                    method: "POST",
                    body: JSON.stringify(newCharacter),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then((resp) => {
                        if (resp.status !== 200) {
                            throw resp.statusText;
                        }
                        return resp.json();
                    })
                    .then((data) => {
                        // console.log(data);
                        props.onClose(data);
                    })
                    .catch((error) => {
                        setError(error);
                    });
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
                            <option>Dragonborn</option>
                            <option>Dwarf</option>
                            <option>Elf</option>
                            <option>Gnome</option>
                            <option>Human</option>
                            <option>HalfOrc</option>
                            <option>HalfElf</option>
                            <option>Tiefling</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formCharacterGender">
                        <Form.Label>Character Gender</Form.Label>
                        <Form.Control as="select" custom ref={charGenderRef}>
                            <option>Male</option>
                            <option>Female</option>
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
                    Create
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}