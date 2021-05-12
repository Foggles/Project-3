import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Enemy(props) {

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
                    <h5>{props.message}</h5>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}