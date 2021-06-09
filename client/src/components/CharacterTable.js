import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as FCG from "fantasy-content-generator";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import CreateCharacterModal from "../components/Modal";

export default function CharacterTable() {

    let { id } = useParams();

    const [error, setError] = useState("");
    const [tableData, setTableData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        fetch("/api/user-characters", {
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

    function handleDelete(id) {
        fetch("/api/character/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                // console.log(data);
                setTableData(data);
            })
            .catch((error) => {
                setError(error);
            })
    }

    return (
        <>
            <Row>
                <Col>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th><Button block onClick={() => setModalShow(true)}><FontAwesomeIcon icon={faUserPlus} color={"white"} size={"2x"} /></Button></th>
                            </tr>
                            <tr>
                                <th>Character Name</th>
                                <th>Class</th>
                                <th>Level</th>
                                <th>Race</th>
                                <th>Faction</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data, index) => {
                                // console.log(data.seed);
                                const character = FCG.Names.generate({ seed: data.seed });
                                const characterRace = character.race;

                                function capitalizeFirstLetter(string) {
                                    return string.charAt(0).toUpperCase() + string.slice(1);
                                };

                                return <tr key={data.seed}>
                                    <td>{character.name}</td>
                                    <td>{data.Class.name}</td>
                                    <td>{data.level}</td>
                                    <td>{capitalizeFirstLetter(characterRace)}</td>
                                    <td>{data.faction}</td>
                                    <td><Button block><Link to={"/play/" + data.id}><FontAwesomeIcon icon={faAngleDoubleRight} color={"white"} /></Link></Button>
                                        <Button block onClick={() => handleDelete(data.id)}><FontAwesomeIcon icon={faTrashAlt} color={"red"} /></Button></td>
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