import React, { useRef, useState, useEffect } from "react";
import * as FCG from "fantasy-content-generator";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import CreateCharacterModal from "../components/Modal";

export default function CharacterTable() {
    const [error, setError] = useState("");
    const [tableData, setTableData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        fetch("/api/characters", {
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
                setTableData(data);
            })
            .catch((error) => {
                setError(error);
            });
    }, [])

    function handleClose(newCharacter) {
        setTableData([...tableData, newCharacter]);
        setModalShow(false);
    }

    return (
        <>
            <Row>
                <Col>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th><Button block onClick={() => setModalShow(true)}>Create New Character</Button></th>
                            </tr>
                            <tr>
                                <th>Character Name</th>
                                <th>Class</th>
                                <th>Level</th>
                                <th>Faction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data, index) => {
                                console.log(data.seed);
                                const character = FCG.Names.generate({ seed: data.seed });
                                console.log(data);
                                return <tr key={data.seed}>
                                    <td>{character.name}</td>
                                    <td>{data.Class.name}</td>
                                    <td>{data.level}</td>
                                    <td>{data.faction}</td>
                                    <td><Button href="/play" block>Play!</Button></td>
                                </tr>;
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <CreateCharacterModal
                show={modalShow}
                onClose={handleClose}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}