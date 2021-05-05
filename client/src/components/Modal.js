import React, { useRef, useState, useEffect } from "react";
import * as FCG from "fantasy-content-generator";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function MyVerticallyCenteredModal(props) {
    const [error, setError] = useState("");
    const charRaceRef = useRef();
    const charGenderRef = useRef();
    const charFactionRef = useRef();
    const charClassRef = useRef();

    function handleCreateChar() {
        const generatedCharacter = FCG.Names.generate({ race: charRaceRef.current.value, gender: charGenderRef.current.value });
        console.log(generatedCharacter);

        fetch("/api/user_data", {
            method: "GET"
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                let userId = data.id;
                console.log(userId);

                const newCharacter = {
                    seed: generatedCharacter.seed,
                    faction: charFactionRef.current.value,
                    level: 1,
                    health: 100,
                    mana: 100,
                    ClassId: charClassRef.current.value,
                    UserId: userId
                };

                console.log(newCharacter);

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
                        console.log(data);
                        props.onClose(data);
                    })
                    .catch((error) => {
                        setError(error);
                    });
            });


        // const newCharacter = {
        //     seed: generatedCharacter.seed,
        //     faction: charFactionRef.current.value,
        //     level: 1,
        //     health: 100,
        //     mana: 100,
        //     ClassId: charClassRef.current.value
        // };

        // console.log(newCharacter);

        // fetch("/api/characters", {
        //     method: "POST",
        //     body: JSON.stringify(newCharacter),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then((resp) => {
        //         if (resp.status !== 200) {
        //             throw resp.statusText;
        //         }
        //         return resp.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        //         props.onClose(data);
        //     })
        //     .catch((error) => {
        //         setError(error);
        //     });
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
                            <option>1</option>
                            <option>2</option>
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