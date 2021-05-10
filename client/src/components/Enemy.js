import React, { useRef, useState, useEffect } from "react";
import { DiceRoll } from 'rpg-dice-roller';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Enemy(props) {

    function chooseAbility() {
        let potentialAbilities = props.propsEnemyAbilities;
        let randomAbility = potentialAbilities[Math.floor(potentialAbilities.length * Math.random())];
        console.log(randomAbility);
        let damageRoll = new DiceRoll(randomAbility.effect);
        console.log(damageRoll.total);
    }

    if (props.propsTurn == 2) {
        chooseAbility();
    }

    return (
        <Container>
            <Row className="text-center">
                <Col></Col>
                <Col><Table variant="dark" size="sm" borderless hover className="text-center">
                    <thead>
                        <tr>
                            <th><ProgressBar variant="danger" animated now={props.propsEnemyHealth} label={`${props.propsEnemyHealth}`} /></th>
                        </tr>
                    </thead>
                </Table></Col>
                <Col></Col>
            </Row>
            <Row className="text-center">
                <Col></Col>
                <Col>
                    <h3>{props.propsCurrentEnemy.name}</h3>
                    <h6>{props.propsCurrentEnemy.type}</h6>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}