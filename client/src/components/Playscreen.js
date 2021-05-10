import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";

import Playbar from "./Playbar";
import Enemy from "./Enemy";

export default function Playscreen(props) {
    console.log(props.propsCharacterData);
    return (
        <>
            <Jumbotron>
                <Container>
                    <Row><Enemy /></Row>
                </Container>
            </Jumbotron>
            <Container>
                <Playbar propsCharacterData={props.propsCharacterData} />
            </Container>
        </>
    )
}