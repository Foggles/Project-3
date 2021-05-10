import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as FCG from "fantasy-content-generator";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Enemy() {

    const [error, setError] = useState("");
    const [currentEnemy, setCurrentEnemy] = useState(null);
    const [enemyAbilities, setEnemyAbilities] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        fetch("/api/enemies", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                const enemy = data[0];
                setCurrentEnemy(enemy);
            })
    }, []);

    useEffect(() => {
        fetch("/api/enemy-abilities/" + id, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                setEnemyAbilities(data);
            })
            .catch((error) => {
                setError(error);
            })
    }, [id]);

    if (currentEnemy == null) {
        return (
            <div> Loading... </div>
        )
    };

    return (
        <Container>
            <Row className="text-center">
                <Col></Col>
                <Col><Table variant="dark" size="sm" borderless hover className="text-center">
                    <thead>
                        <tr>
                            <th><ProgressBar variant="danger" animated now={currentEnemy.health} label={`${currentEnemy.health}`} /></th>
                        </tr>
                    </thead>
                </Table></Col>
                <Col></Col>
            </Row>
            <Row className="text-center">
                <Col></Col>
                <Col><h3>{currentEnemy.name}</h3>
                    <h6>{currentEnemy.type}</h6></Col>
                <Col></Col>
            </Row>
        </Container>
    )
}