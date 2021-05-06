import React, { useRef, useState, useEffect } from "react";
import * as FCG from "fantasy-content-generator";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Playbar(props) {
    const [error, setError] = useState("");
    const [characterData, setCharacterData] = useState([]);

    console.log(props.propsCharacterData);

    return (
        <Container>
            <Row>
                <h5>{characterData.seed}</h5>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
        </Container>


    )
};